// The pixel art for the avatar and the four items in the hero, drawn as text
// grids: one character per pixel, '.' for an empty pixel. The build script
// uses this file to draw the starting art into the page, and the game uses it
// in the browser to swap frames, so it must not touch the page itself.

// What each character means. A colour that follows the light/dark theme is a
// class name, styled in styles.css. Any other colour is a plain fill.
const COLOURS = {
	// Avatar
	C: '#FFB547', // cap
	W: '#FFFFFF', // cap badge, eye whites
	b: '#B8721E', // cap brim
	h: 'px-hair',
	s: '#E8B48A', // skin
	m: '#B5524A', // mouth
	k: '#1A1A1A', // pupils that don't move, shut eyes
	K: '#565C6B', // headphone band
	R: '#E05A4F', // headphone cups
	g: 'px-shirt',
	G: 'px-sleeve',
	p: 'px-pants',
	P: 'px-pants-far',

	// Items
	y: 'px-gold',
	z: 'px-gold-shade',
	d: '#7D3530', // book spine
	e: '#ECEAE6', // book pages
	l: '#C8C2B4', // lines between pages
	n: '#7A5233', // guitar neck
	x: '#4A3020', // guitar headstock
	a: '#D9A066', // palette wood
	u: '#5B8DEF', // blue paint
	v: '#7CE38B', // green paint
};

// A pupil that follows the mouse. It is drawn as eye white, with the pupil
// itself added on top at the end, so moving it never leaves a hole.
const PUPIL = 'o';

// The avatar, 16 × 20. Side-on frames face right; facing left is the same
// frame mirrored.
export const FRAMES = {
	front: [
		'....KKKKKKKK....',
		'...KCCCWWCCCK...',
		'...KCCCCCCCCK...',
		'..bbbbbbbbbbbb..',
		'...hssssssssh...',
		'..RRWWWssWWWRR..',
		'..RRWoWssWoWRR..',
		'..RRWWWssWWWRR..',
		'..RRssssssssRR..',
		'...ssssssssss...',
		'...sssmmmmsss...',
		'....ssssssss....',
		'......ssss......',
		'...gggggggggg...',
		'..gggggggggggg..',
		'..sggggggggggs..',
		'...gggggggggg...',
		'....ppp..ppp....',
		'....ppp..ppp....',
		'....ppp..ppp....',
	],
	blink: [
		'....KKKKKKKK....',
		'...KCCCWWCCCK...',
		'...KCCCCCCCCK...',
		'..bbbbbbbbbbbb..',
		'...hssssssssh...',
		'..RRssssssssRR..',
		'..RRssssssssRR..',
		'..RRkkksskkkRR..',
		'..RRssssssssRR..',
		'...ssssssssss...',
		'...sssmmmmsss...',
		'....ssssssss....',
		'......ssss......',
		'...gggggggggg...',
		'..gggggggggggg..',
		'..sggggggggggs..',
		'...gggggggggg...',
		'....ppp..ppp....',
		'....ppp..ppp....',
		'....ppp..ppp....',
	],
	shrug: [
		'....KKKKKKKK....',
		'...KCCCWWCCCK...',
		'...KCCCCCCCCK...',
		'..bbbbbbbbbbbb..',
		'...hssssssssh...',
		'..RRWkWssWkWRR..',
		'..RRWWWssWWWRR..',
		'..RRWWWssWWWRR..',
		'..RRssssssssRR..',
		'...ssssssssss...',
		'...ssssmmssss...',
		'....ssssssss....',
		'......ssss......',
		'.s.gggggggggg.s.',
		'.gggggggggggggg.',
		'...gggggggggg...',
		'...gggggggggg...',
		'....ppp..ppp....',
		'....ppp..ppp....',
		'....ppp..ppp....',
	],
	walk1: [
		'.....CCKCCC.....',
		'....CCCKCCWC....',
		'....CCCKCCCC....',
		'....bbbbbbbbbbb.',
		'....hhsKsssss...',
		'....hhRRRsWWs...',
		'....hsRRRsWks...',
		'....hsRRRsWWs...',
		'....ssRRRsssss..',
		'....sssssssss...',
		'....sssssssmm...',
		'.....ssssssss...',
		'.......sss......',
		'......gGgggg....',
		'.....gGggggg....',
		'.....gGggggg....',
		'.....sgggggg....',
		'......PPpp......',
		'.....PP..pp.....',
		'.....PP...pp....',
	],
	walk2: [
		'.....CCKCCC.....',
		'....CCCKCCWC....',
		'....CCCKCCCC....',
		'....bbbbbbbbbbb.',
		'....hhsKsssss...',
		'....hhRRRsWWs...',
		'....hsRRRsWks...',
		'....hsRRRsWWs...',
		'....ssRRRsssss..',
		'....sssssssss...',
		'....sssssssmm...',
		'.....ssssssss...',
		'.......sss......',
		'......ggGggg....',
		'.....gggGggg....',
		'.....gggGggg....',
		'.....gggsggg....',
		'.......Ppp......',
		'.......Ppp......',
		'.......Ppp......',
	],
	walk3: [
		'.....CCKCCC.....',
		'....CCCKCCWC....',
		'....CCCKCCCC....',
		'....bbbbbbbbbbb.',
		'....hhsKsssss...',
		'....hhRRRsWWs...',
		'....hsRRRsWks...',
		'....hsRRRsWWs...',
		'....ssRRRsssss..',
		'....sssssssss...',
		'....sssssssmm...',
		'.....ssssssss...',
		'.......sss......',
		'......gggGgg....',
		'.....gggggGg....',
		'.....gggggGg....',
		'.....ggggggs....',
		'......ppPP......',
		'.....pp..PP.....',
		'.....pp...PP....',
	],
	walk4: [
		'.....CCKCCC.....',
		'....CCCKCCWC....',
		'....CCCKCCCC....',
		'....bbbbbbbbbbb.',
		'....hhsKsssss...',
		'....hhRRRsWWs...',
		'....hsRRRsWks...',
		'....hsRRRsWWs...',
		'....ssRRRsssss..',
		'....sssssssss...',
		'....sssssssmm...',
		'.....ssssssss...',
		'.......sss......',
		'......ggGggg....',
		'.....gggGggg....',
		'.....gggGggg....',
		'.....gggsggg....',
		'.......ppP......',
		'.......ppP......',
		'.......ppP......',
	],
	punch: [
		'.....CCKCCC.....',
		'....CCCKCCWC....',
		'....CCCKCCCC....',
		'....bbbbbbbbbbb.',
		'....hhsKsssss...',
		'....hhRRRsWWs...',
		'....hsRRRsWks...',
		'....hsRRRsWWs...',
		'....ssRRRsssss..',
		'....sssssssss...',
		'....sssssssmm...',
		'.....ssssssss...',
		'.......sss......',
		'......gggggg....',
		'.....gggggGGGss.',
		'.....ggggggg.ss.',
		'.....ggggggg....',
		'......PPpp......',
		'.....PP..pp.....',
		'.....PP...pp....',
	],
};

// The four items, 10 × 10, in the order he meets them.
export const ICONS = {
	book: [
		'dmmmmmmmm.',
		'dmmmmmmmme',
		'dmyyyyymme',
		'dmmmmmmmme',
		'dmmyyymmme',
		'dmmmmmmmme',
		'dmmmmmmmme',
		'dmmmmmmmme',
		'dmmmmmmmme',
		'.elelelele',
	],
	guitar: [
		'........xx',
		'.......nx.',
		'......n...',
		'....yyn...',
		'...yyyy...',
		'...yyyz...',
		'.yyyyz....',
		'yykyyyz...',
		'yyyyyz....',
		'.zzzz.....',
	],
	scales: [
		'....y.....',
		'yyyyyyyyy.',
		'.z..y..z..',
		'.z..y..z..',
		'zzz.y.zzz.',
		'.z..y..z..',
		'....y.....',
		'....y.....',
		'...yyy....',
		'..yyyyy...',
	],
	palette: [
		'..........',
		'...aaaaa..',
		'.aaaRaaaa.',
		'aauaaaaaaa',
		'aaaaaaa.aa',
		'aCaaaaaaaa',
		'aaaaaaaaa.',
		'.avaaaaa..',
		'..aaaa....',
		'..........',
	],
};

// Turns a grid into SVG <rect>s, one per run of same-coloured pixels on a
// row. Put the result inside an <svg> whose viewBox matches the grid's size.
export function drawSprite(rows) {
	const rects = [];
	const pupils = [];

	rows.forEach((row, y) => {
		const keys = [...row].map((key, x) => {
			if (key === PUPIL) {
				pupils.push(`<rect class="pupil" x="${x}" y="${y}" width="1" height="1" fill="${COLOURS.k}" />`);
				return 'W';
			}
			return key;
		});

		let start = 0;
		while (start < keys.length) {
			let end = start + 1;
			while (keys[end] === keys[start]) {
				end++;
			}
			if (keys[start] !== '.') {
				const colour = COLOURS[keys[start]];
				if (!colour) {
					throw new Error(`No colour for "${keys[start]}" in sprites.js.`);
				}
				const paint = colour.startsWith('#') ? `fill="${colour}"` : `class="${colour}"`;
				rects.push(`<rect x="${start}" y="${y}" width="${end - start}" height="1" ${paint} />`);
			}
			start = end;
		}
	});

	return [...rects, ...pupils].join('');
}
