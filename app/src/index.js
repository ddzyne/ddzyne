import React from 'react'
import ReactDOM from 'react-dom'
import './css/App.css'
import registerServiceWorker from './registerServiceWorker'

import { Provider } from 'react-redux'
import store, { history } from './store/configureStore'
import { ConnectedRouter } from 'connected-react-router'

import App from './containers/App'


ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<App/>
		</ConnectedRouter>
	</Provider>,
	document.getElementById('root')
)

registerServiceWorker()