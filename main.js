import { createElement, throttle } from './utils'
export default class Loupe {
  #container = document.querySelector('[data-loupe]')
  #imageElement = document.querySelector('[data-image]')
  #magnifierElement = createElement({
    tagName: 'div',
    dataAttributes: { magnifier: '' },
    classList: ['z-10', 'absolute', 'inset-0', 'w-full', 'h-full', 'opacity-0', 'bg-no-repeat', 'pointer-events-none', 'transition-opacity', 'duration-300']
  })
  #lensElement = createElement({
    tagName: 'div',
    dataAttributes: { lens: '' },
    classList: ['z-20', 'absolute', 'w-20', 'h-20', 'opacity-0', 'bg-white/60', 'transition-opacity', 'duration-300', 'pointer-events-none']
  })

	constructor({ backgroundUrl = '', zoomLevel = 3 } = {}) {
		this.backgroundUrl = backgroundUrl
		this.zoomLevel = zoomLevel

    this.#container.append(this.#magnifierElement)
    this.#container.append(this.#lensElement)

		if (this.#imageElement && this.#magnifierElement && this.#lensElement) {
			this.initializeMagnifier(this.zoomLevel)
		} else {
			console.error('Required targets missing. Please check the controller configuration.')
		}
	}

	initializeMagnifier(zoomLevel) {
		this.#magnifierElement.style.backgroundImage = `url('${this.backgroundUrl || this.#imageElement.src}')`
		this.#magnifierElement.style.backgroundSize = `${this.#imageElement.width * zoomLevel}px ${this.#imageElement.height * zoomLevel}px`

		this.addEventListeners()
	}

	addEventListeners() {
		this.handleMagnifierMoveThrottled = throttle(this.handleMagnifierMove, 16)

		this.#magnifierElement.addEventListener('mouseenter', this.onMouseenter)
		this.#magnifierElement.addEventListener('mouseleave', this.onMouseleave)
		this.#imageElement.addEventListener('mouseenter', this.onMouseenter)
		this.#imageElement.addEventListener('mouseleave', this.onMouseleave)

		this.#magnifierElement.addEventListener('mousemove', this.handleMagnifierMoveThrottled)
		this.#imageElement.addEventListener('mousemove', this.handleMagnifierMoveThrottled)
		this.#magnifierElement.addEventListener('touchmove', this.handleMagnifierMoveThrottled)
		this.#imageElement.addEventListener('touchmove', this.handleMagnifierMoveThrottled)
	}

	removeEventListeners() {
		this.#magnifierElement.removeEventListener('mouseenter', this.onMouseenter)
		this.#magnifierElement.removeEventListener('mouseleave', this.onMouseleave)
		this.#imageElement.removeEventListener('mouseenter', this.onMouseenter)
		this.#imageElement.removeEventListener('mouseleave', this.onMouseleave)

		this.#magnifierElement.removeEventListener('mousemove', this.handleMagnifierMoveThrottled)
		this.#imageElement.removeEventListener('mousemove', this.handleMagnifierMoveThrottled)
		this.#magnifierElement.removeEventListener('touchmove', this.handleMagnifierMoveThrottled)
		this.#imageElement.removeEventListener('touchmove', this.handleMagnifierMoveThrottled)
	}

	onMouseenter = () => {
		this.#magnifierElement.classList.remove('opacity-0')
		this.#lensElement.classList.remove('opacity-0')
	}

	onMouseleave = () => {
		this.#magnifierElement.classList.add('opacity-0')
		this.#lensElement.classList.add('opacity-0')
	}

	handleMagnifierMove = (event) => {
		const magnifierRadiusX = this.#magnifierElement.offsetWidth / 2
		const magnifierRadiusY = this.#magnifierElement.offsetHeight / 2

		this.updateMagnifierPosition(event, this.zoomLevel, magnifierRadiusX, magnifierRadiusY)
	}

	updateMagnifierPosition(event, zoomLevel, magnifierRadiusX, magnifierRadiusY) {
		event.preventDefault()

		const { x, y } = this.getCursorPosition(event, this.#imageElement)

		const constrainedX = Math.max(0, Math.min(x, this.#imageElement.width))
		const constrainedY = Math.max(0, Math.min(y, this.#imageElement.height))

		const backgroundPositionX = Math.max(Math.min(constrainedX * zoomLevel - magnifierRadiusX, this.#imageElement.width * zoomLevel - this.#imageElement.width), 0)
		const backgroundPositionY = Math.max(Math.min(constrainedY * zoomLevel - magnifierRadiusY, this.#imageElement.height * zoomLevel - this.#imageElement.height), 0)

		this.#magnifierElement.style.backgroundPosition = `-${backgroundPositionX}px -${backgroundPositionY}px`

		const lensSize = this.#lensElement.offsetWidth / 2
		const lensX = Math.max(lensSize, Math.min(constrainedX, this.#imageElement.width - lensSize))
		const lensY = Math.max(lensSize, Math.min(constrainedY, this.#imageElement.height - lensSize))

		this.#lensElement.style.left = `${lensX - lensSize}px`
		this.#lensElement.style.top = `${lensY - lensSize}px`
	}

	getCursorPosition(event, imageElement) {
		const rect = imageElement.getBoundingClientRect()
		const x = event.pageX - rect.left - window.scrollX
		const y = event.pageY - rect.top - window.scrollY

		return { x, y }
	}

	disconnect() {
		this.removeEventListeners()
	}
}
