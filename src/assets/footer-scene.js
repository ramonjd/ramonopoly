// The scenery along the bottom of the footer: a city skyline behind the bush,
// then sand and sea, as if seen from the water. Drawn as a text grid like the
// art in sprites.js. The build turns it into two pictures, one for each theme,
// and the CSS repeats the right one across the footer. The left and right
// edges match, so the copies join up.
//
// It is 64 × 18. The first and last columns must line up with each other.

export const SCENE = [
	'..............R.........................LLL...LL................',
	'..............r........................LTTTL.LTTL...............',
	'............DDDDD.....................LTTTTTLTTTT...............',
	'............DwDqD............AAAAA....TTHTTTTTTHT...............',
	'...AAAAAAA..DDDDD............AwAwA.....HHHH.UUHHH...............',
	'...AqAwAwA..DwDwD............AAAAA..........UUUUUUUUUUU.........',
	'...AAAAAAA..DDDDD.BBBBBBBBB..AqAwA..........UU..................',
	'...AqAqAwA..DwDwD.BqBqBwBwB..AAAAA..........UU...........DDDDD..',
	'...AAAAAAA..DDDDD.BBBBBBBBB..AqAqA..........UU...........DwDqD..',
	'..LLLLqAqA..DqDLLLBwBqBqBLLLLAAAAA.LLLL.....UU...........DDLLL..',
	'LLTTTTLLLA.LLLLTTTLLLBBBBTTTTLLLAA.TTTTLLLLLUUL.........LLLTTTLL',
	'TTTTTTTTTLLTTTTTTTTTTLLLLTTTTTTTLLLTTTTTTTTTUUTLL.......TTTTTTTT',
	'HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHUUHHHLLLLLLLHHHHHHHH',
	'SSSZSSSSSSSZSSSSSSSZSSSSSSSZSSSSSSSZSSSSSSSZSSSSSSSZSSSSSSSZSSSS',
	'SSSSSSSZSSSSSSSZSSSSSSSZSSSSSSSZSSSSSSSZSSSSSSSZSSSSSSSZSSSSSSSZ',
	'XFFFXXXXXXXFFXXXXFFFXXXXXXXFFXXXXFFFXXXXXXXFFXXXXFFFXXXXXXXFFXXX',
	'OOOOOXXOOOOOOXOOOOOOOXXOOOOOOXOOOOOOOXXOOOOOOXOOOOOOOXXOOOOOOXOO',
	'NNOONNNNNNONNNNNNNOONNNNNNONNNNNNNOONNNNNNONNNNNNNOONNNNNNONNNNN',
];

// By day a rainbow lorikeet sits on the gum tree's bare branch. At night a
// fruit bat hangs upside down under the same branch. x and y say where each
// one's top left corner goes in the scene.
export const BIRD = {
	x: 49,
	y: 1,
	rows: [
		'....uu.',
		'...uukR',
		'.gggCC.',
		'gg..k..',
	],
};

export const BAT = {
	x: 50,
	y: 6,
	rows: [
		'.k.k.',
		'.KKK.',
		'KKKKK',
		'KKKKK',
		'.MMM.',
		'.EhE.',
		'.h.h.',
	],
};

// What each character means, by day and by night. The night colours are the
// day ones darkened and shifted towards blue, except the windows marked w,
// which light up. Windows marked q stay dark.
export const SCENE_COLOURS = {
	day: {
		A: '#9AA5B8', // building
		B: '#C9B48F', // sandstone building
		D: '#6F7C93', // dark building
		w: '#DCEBF5', // window
		q: '#DCEBF5', // window
		r: '#565C6B', // antenna
		R: '#E05A4F', // antenna light, beak
		L: '#94B46A', // leaves in the light
		T: '#6B8E4E', // leaves
		H: '#4A6B3A', // leaves in shadow
		U: '#7A5233', // trunk and branch
		S: '#ECD09A', // sand
		Z: '#D9B878', // darker sand
		F: '#FFFFFF', // foam
		X: '#9FD0F0', // shallow water
		O: '#5B9FD6', // water
		N: '#3F7FC0', // deep water
		u: '#5B8DEF', // lorikeet head
		k: '#1A1A1A', // eye, feet
		C: '#FFB547', // lorikeet chest
		g: '#3FAE4A', // lorikeet body
	},
	night: {
		A: '#2B3242',
		B: '#3A3540',
		D: '#222838',
		w: '#FFD36B', // lit window
		q: '#151A26', // dark window
		r: '#3A4152',
		R: '#FF6B5E',
		L: '#2F4729',
		T: '#24361F',
		H: '#192617',
		U: '#3A2A20',
		S: '#5C5546',
		Z: '#4A4438',
		F: '#7F93B0',
		X: '#2E4C72',
		O: '#1D3556',
		N: '#142640',
		k: '#1A1A1A', // claws
		K: '#3B3330', // bat wings
		M: '#9A5A2E', // bat's rusty collar
		h: '#5A4E48', // bat head and ears
		E: '#FFD36B', // bat eyes catching the light
	},
};
