# ramonopoly

Ramon's personal site: a one-page portfolio and a simple blog.

Plain HTML, CSS and JavaScript, with a small Node script that turns Markdown posts into pages. The only dependency is [marked](https://marked.js.org/), for the Markdown.

## Getting started

Needs Node 20.11 or later.

```sh
npm install
npm run build     # writes the site to dist/
npm run preview   # builds, then serves dist/ locally
```

## Where things live

```
content/posts/     Blog posts, one Markdown file each
content/posts/images/  Featured images for posts
src/templates/     HTML templates: layout, home page, about page, blog index, post
src/assets/        styles.css, main.js, avatar-game.js (the hero's game) and sprites.js (its pixel art), copied as they are
scripts/build.js   The build
```

Templates use `{{name}}` placeholders, filled in by `scripts/build.js`. `layout.html` wraps every page.

## Writing a post

Add a Markdown file to `content/posts/`. The file name becomes the URL, so `hello-world.md` is published at `/blog/hello-world/`.

```md
---
title: Hello, world
date: 2026-11-06
---

The post, in Markdown.
```

Add `draft: true` to the front matter to leave a post out of the build. The home page shows the three newest posts.

To give a post a featured image, put the file in `content/posts/images/` and name it in the front matter, with a short description for people who can't see it:

```md
image: state-of-mind.jpg
imageAlt: What the image shows
```

The image appears at the top of the post and as a small square thumbnail in the post lists. The thumbnail is the same file shrunk by the browser, so keep image files small.

## Deploying

The site is hosted on [Spacefast](https://www.npmjs.com/package/spacefast). Build, then publish `dist/` with the Spacefast CLI:

```sh
npm run build
sf publish ./dist
```
