// Ramon three ways, for the About page: the home page sprite in three
// different outfits. Drawn as text grids like the art in sprites.js, using the
// same colour letters, and turned into SVG by the build. All three have his
// shaved head: the hair is a close-cropped dome, never longer.

// 16 × 20. Sunglasses, a grey jacket over a white T-shirt and a red guitar
// slung across him.
const rockstar = [
	'................',
	'.....hhhhhh.....',
	'....hhhhhhhh....',
	'...hhhhhhhhhh...',
	'...hssssssssh...',
	'...skWkkkkWks...',
	'...skkksskkks...',
	'...ssssssssss...',
	'...ssssssssss...',
	'...ssssssssss.aa',
	'...sssmmmmsssa..',
	'....ssssssssa...',
	'......ssss.a....',
	'...KKKWWWWaKK...',
	'..KKKKWWWaKKKK..',
	'..sKRRRRRWKKKs..',
	'...RRWkRsWKKK...',
	'...RRRRR.ppp....',
	'....RRR..ppp....',
	'....ppp..ppp....',
];

// 16 × 20. Thick black glasses, a buck-toothed grin, and a white shirt with a
// red tie and pens in the pocket.
const nerd = [
	'................',
	'.....hhhhhh.....',
	'....hhhhhhhh....',
	'...hhhhhhhhhh...',
	'...hkkksskkkh...',
	'...kWWWkkWWWk...',
	'...kWkWkkWkWk...',
	'...kWWWkkWWWk...',
	'...skkksskkks...',
	'...ssssssssss...',
	'...sssmWWmsss...',
	'....ssssssss....',
	'......ssss......',
	'...WWlWRRWlWW...',
	'..WWuRWRRWWWWW..',
	'..sWllWRRWWWWs..',
	'...WWWWRRWWWW...',
	'....ppp..ppp....',
	'....ppp..ppp....',
	'....ppp..ppp....',
];

// 20 × 20. Zinc cream on his nose, a singlet, board shorts and bare feet,
// holding a blue surfboard upright beside him.
const surfer = [
	'.................u..',
	'.....hhhhhh.....uuu.',
	'....hhhhhhhh....uWu.',
	'...hhhhhhhhhh..uuWuu',
	'...hssssssssh..uuWuu',
	'...sWWWssWWWs..uuWuu',
	'...sWkWssWkWs..uuWuu',
	'...sWWWssWWWs..uuWuu',
	'...ssssWWssss..uuWuu',
	'...ssssssssss..uuWuu',
	'...sssmmmmsss..uuWuu',
	'....ssssssss...uuWuu',
	'......ssss.....uuWuu',
	'...ssggggggss..uuWuu',
	'..sssggggggsss.uuWuu',
	'..ssggggggggsssuuWuu',
	'...CCCCCCCCCC..uuWuu',
	'....WCC..CCW...uuWuu',
	'....sss..sss....uWu.',
	'....sss..sss.....u..',
];

export const OUTFITS = { rockstar, nerd, surfer };
