const THEME_STORAGE_KEY = 'theme';

// The eyes sit about a third of the way down the avatar.
const EYE_HEIGHT = 0.32;

// How far the mouse must be from the eyes, in pixels, before they look that way.
const DEAD_ZONE = 24;

setUpThemeToggle();
setUpAvatarEyes();

function setUpThemeToggle() {
	const button = document.querySelector('.theme-toggle');
	const root = document.documentElement;

	function updateLabel() {
		const otherTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
		button.setAttribute('aria-label', `Switch to ${otherTheme} theme`);
	}

	button.addEventListener('click', () => {
		root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
		try {
			localStorage.setItem(THEME_STORAGE_KEY, root.dataset.theme);
		} catch {
			// Storage can be blocked. The theme still changes for this visit.
		}
		updateLabel();
	});

	updateLabel();
}

// The pupils follow the mouse while it's over the avatar's stage, and look
// straight ahead again when it leaves.
function setUpAvatarEyes() {
	const stage = document.querySelector('.avatar-stage');
	if (!stage) {
		return;
	}

	const avatar = stage.querySelector('.avatar');
	const pupils = [...stage.querySelectorAll('.pupil')].map((pupil) => ({
		element: pupil,
		x: Number(pupil.getAttribute('x')),
		y: Number(pupil.getAttribute('y')),
	}));

	function look(dx, dy) {
		for (const pupil of pupils) {
			pupil.element.setAttribute('x', pupil.x + dx);
			pupil.element.setAttribute('y', pupil.y + dy);
		}
	}

	stage.addEventListener('mousemove', (event) => {
		const box = avatar.getBoundingClientRect();
		const eyesX = box.left + box.width / 2;
		const eyesY = box.top + box.height * EYE_HEIGHT;

		look(direction(event.clientX - eyesX), direction(event.clientY - eyesY));
	});

	stage.addEventListener('mouseleave', () => look(0, 0));
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
