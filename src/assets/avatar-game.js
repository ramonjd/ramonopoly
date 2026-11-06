// The hero's game. Once the stage has focus, ← and → walk the avatar along the
// ground and Space punches. On a touch screen, a tap on him walks him to the
// next item and punches it. Punching an item sends it up to the bar at the top
// and opens a box with a line about it. The art comes from sprites.js.

import { drawSprite, FRAMES } from './sprites.js';

// One art pixel is 8 CSS pixels. Positions in this file are in art pixels.
const PIXEL = 8;

// The avatar is drawn 3 art pixels in from the stage's left edge (see .avatar
// in styles.css), and his punch reaches 15 art pixels past that.
const AVATAR_LEFT = 3;
const REACH = 15;

// How far past the last item he can walk.
const END_MARGIN = 12;

// Timings, in milliseconds.
const STEP_TIME = 80;
const TURN_FRONT_DELAY = 400;
const PUNCH_TIME = 200;
const BOUNCE_TIME = 350; // matches the .stage-item transition in styles.css
const SHRUG_TIME = 900;
const BLINK_EVERY = 4000;
const BLINK_TIME = 150;

// The eyes sit about a third of the way down the avatar.
const EYE_HEIGHT = 0.32;

// How far the mouse must be from the eyes, in pixels, before they look that way.
const DEAD_ZONE = 24;

const WALK_CYCLE = ['walk1', 'walk2', 'walk3', 'walk4'];
const STANDING_SIDE_ON = 'walk2';
const FRONT_FACING = ['front', 'blink', 'shrug'];
const ARROWS = { ArrowLeft: -1, ArrowRight: 1 };

// Every frame is drawn once, up front, and swapped in as needed.
const DRAWN = Object.fromEntries(
	Object.entries(FRAMES).map(([name, rows]) => [name, drawSprite(rows)])
);

export function setUpAvatarGame() {
	const stage = document.querySelector('.avatar-stage');
	if (!stage) {
		return;
	}

	const avatar = stage.querySelector('.avatar');
	const world = stage.querySelector('.stage-world');
	const ground = stage.querySelector('.ground');
	const overlay = stage.querySelector('.stage-overlay');
	const items = [...world.querySelectorAll('.stage-item')].map((element) => ({
		element,
		name: element.dataset.item,
		x: Number(element.style.getPropertyValue('--x')),
		slot: stage.querySelector(`.stage-slot[data-item="${element.dataset.item}"]`),
		punched: false,
	}));
	const end = items.at(-1).x + END_MARGIN;
	const pupilHome = [...avatar.querySelectorAll('.pupil')].map((pupil) => ({
		x: Number(pupil.getAttribute('x')),
		y: Number(pupil.getAttribute('y')),
	}));

	const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

	const state = {
		position: 0,
		facing: 1, // 1 is right, -1 is left
		frame: 'front',
		walking: 0, // the direction he's walking in, or 0
		walkStep: 0,
		lastStepTime: 0,
		looping: false,
		tapWalking: false,
		punching: false,
		shrugged: false,
		pupilsAway: false, // true while the pupils look away from straight ahead
	};
	let turnFrontTimer;
	let punchTimer;

	// A new frame is drawn with its pupils looking straight ahead.
	function show(frame) {
		if (frame !== state.frame) {
			state.frame = frame;
			state.pupilsAway = false;
			avatar.innerHTML = DRAWN[frame];
		}
		const sideOn = !FRONT_FACING.includes(frame);
		avatar.classList.toggle('is-facing-left', sideOn && state.facing < 0);
		avatar.classList.toggle('is-moving', frame !== 'front' && frame !== 'blink');
	}

	function turnFrontSoon() {
		clearTimeout(turnFrontTimer);
		turnFrontTimer = setTimeout(() => {
			if (!state.walking && !state.punching) {
				show('front');
			}
		}, TURN_FRONT_DELAY);
	}

	function nextItem() {
		return items.find((item) => !item.punched);
	}

	// Walking

	// A new key press takes one step straight away, so a quick tap still moves him.
	function startWalking(direction) {
		clearTimeout(turnFrontTimer);
		stage.classList.add('has-played');
		if (state.walking !== direction) {
			state.walking = direction;
			state.facing = direction;
			state.lastStepTime = performance.now();
			takeStep();
		}
		if (!state.looping) {
			state.looping = true;
			requestAnimationFrame(walk);
		}
	}

	function stopWalking() {
		state.walking = 0;
		if (!state.punching) {
			show(STANDING_SIDE_ON);
			turnFrontSoon();
		}
	}

	function walk(time) {
		if (!state.walking) {
			state.looping = false;
			return;
		}
		if (time - state.lastStepTime >= STEP_TIME) {
			state.lastStepTime = time;
			takeStep();
		}
		requestAnimationFrame(walk);
	}

	// An unpunched item stops him where his punch just reaches it. A tap walk
	// punches it when he gets there.
	function takeStep() {
		const next = nextItem();
		const furthest = next ? next.x - AVATAR_LEFT - REACH : end;
		const position = Math.min(Math.max(state.position + state.walking, 0), furthest);

		if (position === state.position) {
			if (state.tapWalking) {
				state.tapWalking = false;
				state.walking = 0;
				punch();
				return;
			}
			if (!state.punching) {
				show(STANDING_SIDE_ON);
			}
			// Walking into an item he hasn't punched: tell the visitor to punch it.
			stage.classList.toggle('at-item', Boolean(next) && state.walking > 0);
			return;
		}

		moveTo(position);
		if (!state.punching) {
			state.walkStep = (state.walkStep + 1) % WALK_CYCLE.length;
			show(WALK_CYCLE[state.walkStep]);
		}
	}

	function moveTo(position) {
		stage.classList.remove('at-item');
		state.position = position;
		world.style.transform = `translateX(${-position * PIXEL}px)`;
		ground.style.backgroundPosition = `${-position * PIXEL}px 0`;
	}

	// A finger tap on him walks him to the next item and punches it. Taps do
	// nothing while he's busy, while the overlay is open, or after the last item.
	// With reduced motion, he jumps straight there.
	function tapWalk() {
		const next = nextItem();
		if (!next || overlay.open || state.walking || state.punching) {
			return;
		}
		stage.classList.add('has-played');
		if (reducedMotion.matches) {
			state.facing = 1;
			moveTo(next.x - AVATAR_LEFT - REACH);
			punch();
			return;
		}
		state.tapWalking = true;
		startWalking(1);
	}

	// Punching

	// A new punch restarts the punch timer, so a quick second punch isn't cut short.
	function punch() {
		clearTimeout(turnFrontTimer);
		clearTimeout(punchTimer);
		stage.classList.add('has-played');
		state.punching = true;
		show('punch');

		punchTimer = setTimeout(() => {
			state.punching = false;
			show(state.walking ? WALK_CYCLE[state.walkStep] : STANDING_SIDE_ON);
			if (!state.walking) {
				turnFrontSoon();
			}
		}, PUNCH_TIME);

		const next = nextItem();
		const gap = next ? next.x - (state.position + AVATAR_LEFT + REACH) : Infinity;
		if (state.facing > 0 && gap <= 1) {
			stage.classList.remove('at-item');
			next.punched = true;
			state.walking = 0;
			next.element.classList.add('is-punched');
			setTimeout(() => {
				next.slot.disabled = false;
				next.slot.removeAttribute('aria-hidden');
				openOverlay(next.name);
			}, reducedMotion.matches ? 0 : BOUNCE_TIME);
		}
	}

	// The overlay

	// Opening the overlay stops any walk, so nothing moves behind it.
	function openOverlay(name) {
		state.walking = 0;
		state.tapWalking = false;
		const entry = document.querySelector(`#interests [data-item="${name}"]`);
		overlay.querySelector('.stage-card-title').textContent = entry.querySelector('.interest-title').textContent;
		overlay.querySelector('.stage-card-text').textContent = entry.querySelector('.interest-text').textContent;
		if (!overlay.open) {
			overlay.show();
		}
		overlay.querySelector('.stage-close').focus();
	}

	function closeOverlay() {
		overlay.close();
		stage.focus();
		if (!state.shrugged && !nextItem()) {
			state.shrugged = true;
			clearTimeout(turnFrontTimer);
			show('shrug');
			setTimeout(() => {
				if (state.frame === 'shrug') {
					show('front');
				}
			}, SHRUG_TIME);
		}
	}

	overlay.querySelector('.stage-close').addEventListener('click', closeOverlay);

	for (const item of items) {
		item.slot.addEventListener('click', () => openOverlay(item.name));
	}

	// Keys. Arrows and Space only act on key presses aimed at the stage itself,
	// so the buttons inside it keep working as buttons.

	// Esc closes the overlay wherever focus is, even after a click elsewhere.
	document.addEventListener('keydown', (event) => {
		if (overlay.open && event.key === 'Escape') {
			event.preventDefault();
			closeOverlay();
		}
	});

	stage.addEventListener('keydown', (event) => {
		if (overlay.open) {
			return;
		}
		if (event.key === 'Escape') {
			event.target.blur();
			return;
		}
		if (event.target !== stage) {
			return;
		}
		if (event.key in ARROWS) {
			event.preventDefault();
			state.tapWalking = false;
			startWalking(ARROWS[event.key]);
		} else if (event.key === ' ') {
			event.preventDefault();
			if (!event.repeat) {
				punch();
			}
		}
	});

	stage.addEventListener('keyup', (event) => {
		if (ARROWS[event.key] === state.walking) {
			stopWalking();
		}
	});

	stage.addEventListener('blur', () => {
		if (state.walking && !state.tapWalking) {
			stopWalking();
		}
	});

	// Touch. A swipe that starts on him scrolls the page instead: the browser
	// sends pointercancel when a touch turns into a scroll.

	let tapPointer = null;

	avatar.addEventListener('pointerdown', (event) => {
		const isFinger = event.pointerType === 'touch' || event.pointerType === 'pen';
		tapPointer = isFinger ? event.pointerId : null;
	});

	avatar.addEventListener('pointercancel', () => {
		tapPointer = null;
	});

	avatar.addEventListener('pointerup', (event) => {
		if (event.pointerId === tapPointer) {
			tapPointer = null;
			tapWalk();
		}
	});

	// The pupils follow the mouse while it's over the stage, and look straight
	// ahead again when it leaves. Only when he's facing front.

	function look(dx, dy) {
		state.pupilsAway = dx !== 0 || dy !== 0;
		avatar.querySelectorAll('.pupil').forEach((pupil, index) => {
			pupil.setAttribute('x', pupilHome[index].x + dx);
			pupil.setAttribute('y', pupilHome[index].y + dy);
		});
	}

	stage.addEventListener('mousemove', (event) => {
		if (state.frame !== 'front') {
			return;
		}
		const box = avatar.getBoundingClientRect();
		const eyesX = box.left + box.width / 2;
		const eyesY = box.top + box.height * EYE_HEIGHT;

		look(direction(event.clientX - eyesX), direction(event.clientY - eyesY));
	});

	stage.addEventListener('mouseleave', () => look(0, 0));

	// Every few seconds he blinks, if he's standing facing front and looking
	// straight ahead, so a blink never snaps his pupils back.
	setInterval(() => {
		if (state.frame === 'front' && !state.pupilsAway) {
			show('blink');
			setTimeout(() => {
				if (state.frame === 'blink') {
					show('front');
				}
			}, BLINK_TIME);
		}
	}, BLINK_EVERY);
}

// -1, 0 or 1: which way to move a pupil one pixel.
function direction(distance) {
	if (distance > DEAD_ZONE) {
		return 1;
	}
	if (distance < -DEAD_ZONE) {
		return -1;
	}
	return 0;
}
