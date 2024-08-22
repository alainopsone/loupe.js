import Loupe from './loupe.js'

document.addEventListener('DOMContentLoaded', () => {
	const imageElement = document.querySelector('[data-target="image"]')
	const magnifierElement = document.querySelector('[data-target="magnifier"]')
	const lensElement = document.querySelector('[data-target="lens"]')

	if (imageElement && magnifierElement && lensElement) {
		new Loupe({imageElement, magnifierElement, lensElement, zoomLevel: 5})
	}
})
