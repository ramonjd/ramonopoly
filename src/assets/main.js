import { setUpAvatarGame } from './avatar-game.js';

const THEME_STORAGE_KEY = 'theme';

setUpThemeToggle();
setUpAvatarGame();

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
