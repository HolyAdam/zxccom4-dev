export default class Component {
	constructor(selector) {
		this.$el = document.querySelector(selector)
		
		this.init()
	}


	hide() {
		this.$el.classList.add('hide')
	}

	onShow() {

	}

	onHide() {
		
	}

	show() {
		this.$el.classList.remove('hide')
		this.onShow()
	}


	init() {

	}

}