import Component from './component'

export default class DialogsComponent extends Component {
	constructor(selector) {
		super(selector)
	}

	static menuPlz() {
		document.querySelector('.profile-menu.name-left').classList.remove('active')
		this.$el.style.width = ``
		this.$el.style.transform = ``
	}

	static nameContent = document.querySelector('.name-content')

	clears() {
		document.querySelectorAll('.h-100').forEach(wind => wind.classList.add('hide'))
	}

	init() {

		document.addEventListener('DOMContentLoaded', e => {
			setTimeout(() => {
				document.querySelector('.profile-menu').style.display = 'block'
			}, 720)
		})


		document.querySelector('.name-left__exit').addEventListener('click', e => {
			localStorage.setItem('logged', '')
			localStorage.setItem('currentNickname', 'Guest')

			this.clears()
			document.querySelector('.auth').classList.remove('hide')

			DialogsComponent.menuPlz()

		})

		if (localStorage.getItem('currentNickname')) {
			document.querySelector('.name-info__name').textContent = localStorage.getItem('currentNickname')
		}

		document.querySelectorAll('.typeMsg').forEach(item => {
			item.addEventListener('change', e => {
				this.clears()
				if (item.value === 'post') {
					DialogsComponent.menuPlz()
					this.$el.parentNode.querySelector('.name').classList.remove('hide')

					// DialogsComponent.nameContent.innerHTML = ''

				} else {
					this.$el.parentNode.querySelector('.profile').classList.remove('hide')
				}
				let atem = item
				document.querySelectorAll('.typeMsg').forEach(item => {
					item.querySelector(`option[value="${atem.value}"]`).selected = true	
				})
			})
		})

		document.querySelector('.profile-menu.name-left .name-left__bottom').addEventListener('click', e => {
			document.querySelectorAll('.h-100').forEach(wind => wind.classList.add('hide'))
			this.clears()

			DialogsComponent.menuPlz()

			document.querySelector('.auth').classList.remove('hide')

			localStorage.setItem('newAcc', true)

		})

		this.$el.parentNode.querySelector('.name .name-footer .create').addEventListener('click', e => {
			this.clears()
			const html = createFormPost()

			this.$el.closest('.container').insertAdjacentHTML('afterbegin', html)


			document.querySelector('#btn1').addEventListener('click', e => {
				const el2 = document.querySelector('#int2').value

				if (el2 && el2.trim()) {

					const obj = {el2, date: new Date().toLocaleString()}

					document.querySelector('.name').classList.remove('hide')
					document.querySelector('.renderForm').remove()

					const renderEl = document.createElement('div')
					renderEl.classList.add('name-post')
					renderEl.innerHTML = `
						<img class="ava" src="https://sun9-56.userapi.com/c840327/v840327103/84c9e/f2C1bG9y5o4.jpg" alt="Аватарка">
						<div class="name-text">
							<div class="name-text__name">${localStorage.getItem('currentNickname')} <span class="date">${obj.date}</span></div>
							<div class="name-text__descr">${obj.el2}</div>
						</div>
					`

					document.querySelector('.name').querySelector('.name-content').insertAdjacentElement('beforeend', renderEl)

					renderEl.scrollIntoView(true)

				} else {
					alert('Заполните поле!')
				}

			})

		})

		this.$el.querySelector('.create').addEventListener('click', e => {
			const html = createFormPost(false)

			DialogsComponent.menuPlz()

			this.clears()

			this.$el.closest('.container').insertAdjacentHTML('afterbegin', html)

			const lis = document.querySelectorAll('.contacts-item')
			lis.forEach(li => {
				li.addEventListener('click', e => {

					console.log(li)
					for (const body of document.querySelectorAll('.profile-body')) {
						if (body.querySelector('.profile__name').textContent === li.querySelector('span').textContent) {
							alert('Уже добавлен в чат такой пользователь')

							document.querySelector('.contacts-wrap').remove()
							this.clears()

							document.querySelector('.profile').classList.remove('hide')

							return

						}
					}

					document.querySelector('.contacts-wrap').remove()

					let formGeneratorNum = Math.random().toFixed(5).toString().split('.').join('') + 
					Math.random().toFixed(4).toString().split('.').join('')

					let xd = 'form' + formGeneratorNum


					this.clears()

					const name = li.querySelector('span').textContent
					const src = li.querySelector('img').src

					const sendHtml = `
					<div class="send h-100" id="d${document.querySelectorAll('.profile-body').length + 1}">
						<div class="span">
							<div class="send-name">
								${name}
							</div>
							<button>
								<img src="img/left-arrow.svg" alt="Стрелка назад">
							</button>
						</div>
						<div class="send-content"></div>
						<form class="send-form" id="${xd}">
							<label for="file"><img src="img/paper-clip.svg" alt="Скрепка"></label>
							<input type="file" name="file" class="send-form__file hide" id="file">
							<input type="text" name="text" class="send-form__text">
							<button class="send-form__btn">
								<img src="img/up-arrow.svg" alt="Arrow">
							</button>
						</form>
					</div>`

					this.$el.closest('.container').insertAdjacentHTML('afterbegin', sendHtml)

					let isAdd = true

					document.querySelectorAll('.profile-body').forEach(item => {
						if (item.querySelector('.profile__name').textContent === 
							document.querySelector('.send').querySelector('.send-name').textContent.trim()) {
							isAdd = false	
						} 
					})

					if (isAdd) {
						document.querySelector('.profile-content').insertAdjacentHTML('beforeend', `

							<div class="profile-body" data-dialog="d${document.querySelectorAll('.profile-body').length + 1}">
								<img src="${src}" alt="Человек">
								<div class="profile-about">
									<span class="profile__name">${name}</span>
									<span class="profile__msg">...</span>
								</div>
							</div>

							`)
						
					}

					document.querySelector(`#${xd}`).addEventListener('submit', sendMessage)

					document.querySelector(`#${xd}`).parentNode.querySelector('button').addEventListener('click', e => {
						this.clears()
						this.$el.classList.remove('hide')
						document.querySelector(`#${xd}`).removeEventListener('submit', sendMessage)
					})		

				})
			})


		})

		this.$el.querySelector('.profile__btn').addEventListener('click', e => {

			if (!document.querySelector('.profile-menu.name-left').classList.contains('active')) {
				document.querySelector('.profile-menu.name-left').classList.add('active')
				this.$el.style.width = `calc(100% - ${getComputedStyle(document.querySelector('.profile-menu.profile-menu.name-left'))['width']})`
				this.$el.style.transform = `translateX(${getComputedStyle(document.querySelector('.profile-menu.name-left'))['width']})`

			} else {
				DialogsComponent.menuPlz()



			}
		})


		this.$el.addEventListener('click', e => {
		
			if (e.target.closest('.profile-body')) {
				this.clears()
				const parent = e.target.closest('.profile-body')

				const name = parent.querySelector('.profile__name').textContent

				const id = parent.dataset.dialog

				const el = document.getElementById(id)

				if (id) {
					this.clears()
					document.querySelector('.profile-menu').classList.remove('active')
					document.querySelector('.profile').style.width = ''
					document.querySelector('.profile').style.transform = ''
					el.classList.remove('hide')
					el.querySelector('.send-name').textContent = name
					el.querySelector('.span button').addEventListener('click', e => {
						this.clears()
						this.$el.classList.remove('hide')
						el.querySelector('.send-form').removeEventListener('submit', sendMessage)
					}, {
						once: true
					})

					el.querySelector('.send-form').addEventListener('submit', sendMessage)

				}

			}

		})

	}

}


function sendMessage(e) {

	e.preventDefault()

	const val = this.querySelector('.send-form__text').value
	this.querySelector('.send-form__text').value = ''

	const span = document.createElement('span')
	span.innerHTML = `
		<div class="send-content__you">
			<span class="send-name">
				You
			</span>
			<span class="send-time">
				${new Date().toLocaleString()}
			</span>
			<span class="send-text">
				${val || 'Empty'}
			</span>
		</div>
	`

	span.classList.add('name-body')

	this.parentNode.querySelector('.send-content').insertAdjacentElement('beforeend', span)
	span.scrollIntoView(true)

	document.querySelector(`[data-dialog="${this.parentNode.id}"]`).querySelector('.profile__msg').textContent = 'You: ' + val

}


function createFormPost(post = true) {

	if (post) {
		return `
		<div class="renderForm h-100">
			<h2>Добавить новый пост</h2>
			<div class="form-func">
				<textarea type="text" placeholder="Message" id="int2"></textarea>
				<label for="filer" style="cursor: pointer"><img style="max-width: 20px; margin-top: 8px" src="img/paper-clip.svg" alt="Скрепка"></label>
				<input type="file" name="file" class="send-form__file hide" id="filer">
			</div>
			<br>
			<button id="btn1">Добавить пост</button>
		</div>
	`
} else {
	return `
		<div class="contacts-wrap">
			<h3 class="contacts-title">Список контактов</h3>
			<ul class="contacts">
				<li class="contacts-item" data-contact="d4"><img src="https://e7.pngegg.com/pngimages/401/263/png-clipart-residency-productivity-company-avatar-miscellaneous-blue.png" alt="Контакт"><span>Антон</span></li>
				<li class="contacts-item" data-contact="d5"><img src="https://im0-tub-ru.yandex.net/i?id=e093a4be3d252c76cf648044f5172dc0&ref=rim&n=33&w=168&h=150" alt="Контакт"><span>Денис</span></li>
				<li class="contacts-item" data-contact="d6"><img src="https://w7.pngwing.com/pngs/1020/149/png-transparent-management-business-chief-executive-organization-science-female-people-head-silhouette.png" alt="Контакт"><span>Кристина</span></li>
			</ul>
		</div>


	`
}

}


