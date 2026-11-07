// Builds the site into dist/.
//
// Pages are plain HTML templates in src/templates. Blog posts are Markdown
// files in content/posts, each starting with a short front matter block:
//
//   ---
//   title: Hello, world
//   date: 2026-11-06
//   ---
//
// Add `draft: true` to keep a post out of the build.
//
// To give a post a featured image, put the file in content/posts/images and
// add `image: file-name.jpg` and `imageAlt: what the image shows`.
//
// Videos for posts go in content/posts/videos and are served from
// /blog/videos/, so a post can show one with
// <video src="/blog/videos/file-name.mp4" controls></video>.

import { existsSync } from 'node:fs';
import { cp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { marked } from 'marked';
import { drawSprite, FRAMES, ICONS } from '../src/assets/sprites.js';
import { OUTFITS } from '../src/assets/outfits.js';
import { BAT, BIRD, SCENE, SCENE_COLOURS } from '../src/assets/footer-scene.js';

const ROOT = path.resolve(import.meta.dirname, '..');
const TEMPLATES_DIR = path.join(ROOT, 'src', 'templates');
const ASSETS_DIR = path.join(ROOT, 'src', 'assets');
const POSTS_DIR = path.join(ROOT, 'content', 'posts');
const OUTPUT_DIR = path.join(ROOT, 'dist');

const SITE_NAME = 'Ramon';
const POSTS_ON_HOME_PAGE = 3;

await build();

async function build() {
	await rm(OUTPUT_DIR, { recursive: true, force: true });
	await cp(ASSETS_DIR, path.join(OUTPUT_DIR, 'assets'), { recursive: true });

	// The site icon: the avatar's head, from the top of his cap down to his
	// chin (the first 13 rows of the front frame). The icon can't read
	// styles.css, so it sets the hair colour itself: the dark theme's --hair.
	await writeFile(
		path.join(OUTPUT_DIR, 'favicon.svg'),
		`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -1 16 16" shape-rendering="crispEdges"><style>.px-hair { fill: #7a5233; }</style>${drawSprite(FRAMES.front.slice(0, 13))}</svg>\n`
	);

	// The footer scenery: the same scene in day colours with the lorikeet for
	// the light theme, and in night colours with the bat for the dark theme.
	for (const [file, colours, critter] of [
		['footer-day.svg', SCENE_COLOURS.day, BIRD],
		['footer-night.svg', SCENE_COLOURS.night, BAT],
	]) {
		await writeFile(
			path.join(OUTPUT_DIR, 'assets', file),
			`<svg xmlns="http://www.w3.org/2000/svg" width="64" height="18" viewBox="0 0 64 18" shape-rendering="crispEdges">${drawSprite(SCENE, colours)}<g transform="translate(${critter.x} ${critter.y})">${drawSprite(critter.rows, colours)}</g></svg>\n`
		);
	}

	// Featured images are served from /blog/images/, videos from /blog/videos/.
	for (const folder of ['images', 'videos']) {
		const source = path.join(POSTS_DIR, folder);
		if (existsSync(source)) {
			await cp(source, path.join(OUTPUT_DIR, 'blog', folder), {
				recursive: true,
			});
		}
	}

	const posts = await loadPosts();

	await writePage('index.html', {
		title: SITE_NAME,
		content: render(await loadTemplate('home'), {
			latestPosts: renderPostList(posts.slice(0, POSTS_ON_HOME_PAGE)),
			avatar: drawSprite(FRAMES.front),
			iconBook: drawSprite(ICONS.book),
			iconGuitar: drawSprite(ICONS.guitar),
			iconScales: drawSprite(ICONS.scales),
			iconPalette: drawSprite(ICONS.palette),
		}),
	});

	await writePage('about/index.html', {
		title: `About · ${SITE_NAME}`,
		content: render(await loadTemplate('about'), {
			rockstar: drawSprite(OUTFITS.rockstar),
			nerd: drawSprite(OUTFITS.nerd),
			surfer: drawSprite(OUTFITS.surfer),
		}),
	});

	await writePage('blog/index.html', {
		title: `Blog · ${SITE_NAME}`,
		content: render(await loadTemplate('blog'), {
			posts: renderPostList(posts),
		}),
	});

	const postTemplate = await loadTemplate('post');
	for (const post of posts) {
		await writePage(`blog/${post.slug}/index.html`, {
			title: `${escapeHtml(post.title)} · ${SITE_NAME}`,
			content: render(postTemplate, {
				title: escapeHtml(post.title),
				date: post.date,
				displayDate: formatDate(post.date),
				image: post.image
					? `<img class="post-image pixel-border" src="${escapeHtml(post.image)}" alt="${escapeHtml(post.imageAlt)}">`
					: '',
				body: post.html,
			}),
		});
	}

	console.log(`Built the site with ${posts.length} post(s) into dist/`);
}

// Posts

async function loadPosts() {
	const files = (await readdir(POSTS_DIR)).filter((file) =>
		file.endsWith('.md')
	);
	const posts = await Promise.all(files.map(loadPost));

	return posts
		.filter((post) => !post.draft)
		.sort((a, b) => b.date.localeCompare(a.date));
}

async function loadPost(file) {
	const source = await readFile(path.join(POSTS_DIR, file), 'utf8');
	const { meta, body } = parseFrontMatter(source);

	if (!meta.title || !meta.date) {
		throw new Error(`${file} needs a title and a date in its front matter.`);
	}

	return {
		slug: path.basename(file, '.md'),
		title: meta.title,
		date: meta.date,
		draft: meta.draft === 'true',
		image: meta.image ? `/blog/images/${meta.image}` : '',
		imageAlt: meta.imageAlt ?? '',
		html: marked.parse(body),
	};
}

// Reads the `key: value` lines between the opening and closing `---`.
function parseFrontMatter(source) {
	const text = source.replace(/\r\n/g, '\n');
	const match = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);

	if (!match) {
		return { meta: {}, body: text };
	}

	const [, frontMatter, body] = match;
	const meta = {};

	for (const line of frontMatter.split('\n')) {
		const separator = line.indexOf(':');
		if (separator === -1) {
			continue;
		}
		const key = line.slice(0, separator).trim();
		const value = line.slice(separator + 1).trim();
		meta[key] = value;
	}

	return { meta, body };
}

function renderPostList(posts) {
	if (posts.length === 0) {
		return '<p class="muted">No posts yet.</p>';
	}

	const items = posts.map((post) => {
		// The thumbnail links to the post too, for mouse and touch. Keyboards
		// and screen readers skip it, since the title next to it is already a
		// link to the same post.
		const thumbnail = post.image
			? `<a class="post-thumb-link" href="/blog/${post.slug}/" tabindex="-1" aria-hidden="true"><img class="post-thumb pixel-border" src="${escapeHtml(post.image)}" alt="" width="80" height="80" loading="lazy"></a>`
			: '';

		return `
			<li>
				${thumbnail}
				<div class="post-list-text">
					<a href="/blog/${post.slug}/">${escapeHtml(post.title)}</a>
					<time datetime="${post.date}">${formatDate(post.date)}</time>
				</div>
			</li>`;
	});

	return `<ul class="post-list">${items.join('')}\n</ul>`;
}

// Templates

async function loadTemplate(name) {
	return readFile(path.join(TEMPLATES_DIR, `${name}.html`), 'utf8');
}

// Fills each {{name}} in the template with values[name]. Values are inserted
// as they are, so escape anything that isn't meant to be HTML first.
function render(template, values) {
	return template.replace(/\{\{(\w+)\}\}/g, (placeholder, name) => {
		if (!(name in values)) {
			throw new Error(`No value given for ${placeholder}.`);
		}
		return values[name];
	});
}

async function writePage(outputPath, { title, content }) {
	const layout = await loadTemplate('layout');
	const fullPath = path.join(OUTPUT_DIR, outputPath);

	await mkdir(path.dirname(fullPath), { recursive: true });
	await writeFile(fullPath, render(layout, { title, content }));
}

// Helpers

function formatDate(isoDate) {
	return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString('en-AU', {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
		timeZone: 'UTC',
	});
}

function escapeHtml(text) {
	return text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}
