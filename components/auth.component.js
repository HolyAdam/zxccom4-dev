import Component from './Component'

export default class AuthComponent extends Component {
	constructor(selector) {
		super(selector)
	}

	init() {

		const form = this.$el.querySelector('form')

		if (localStorage.getItem('logged')) {
			this.hide()
			document.querySelector('.profile').classList.remove('hide')	
		}	

		form.addEventListener('submit', e => {
			e.preventDefault()

			const nickname = form.elements.nickname
			const password = form.elements.password

			if (nickname.value.trim() === 'Zxc123' && password.value === '12345') {
				
				this.hide()
				document.querySelector('.profile').classList.remove('hide')
				localStorage.setItem('logged', true)
				localStorage.setItem('currentNickname', nickname.value)

				document.querySelector('.name-info__name').textContent = localStorage.getItem('currentNickname')
				localStorage.setItem('newAcc', '')

				nickname.value = ''
				password.value = ''


			} else {
				alert('Ошибка входа. Обычно когда логин или пароль некорректен')
			}

		})

	}

}