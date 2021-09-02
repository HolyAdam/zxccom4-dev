import Component from './component'

export default class BeginComponent extends Component {
	constructor(selector) {
		super(selector)
	}

	init() {

		let isFirstTime = !localStorage.getItem('isFirst')

		if (isFirstTime) {

			console.log(1)

			this.$el.querySelector('.header-content__btn').addEventListener('click', e => {
				e.preventDefault()

				this.hide()
				document.querySelector('.auth').classList.remove('hide')

				localStorage.setItem('isFirst', true)

			}, {
				once: true
			})

		} else {
			this.hide()
			document.querySelector('.auth').classList.remove('hide')
		}

		this.$el.querySelector('.header-content__btn').addEventListener('click', e => {
			let newAcc = localStorage.getItem('newAcc')

			if (newAcc) {
				this.hide()
				document.querySelector('.auth').classList.remove('hide')
				localStorage.setItem('newAcc', '')
			}
		})

	}
}



