import './styles/main.sass'

import BeginComponent from './components/begin.component'
import DialogsComponent from './components/dialogs.component'
import AuthComponent from './components/auth.component'

new BeginComponent('header')
new DialogsComponent('.profile')
new AuthComponent('.auth')