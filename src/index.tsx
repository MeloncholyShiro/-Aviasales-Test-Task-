import { createBrowserHistory } from 'history';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { loadingBarMiddleware } from 'react-redux-loading-bar';
import { Router } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { ApplicationContainer as Application } from './Containers/ApplicationContainer';
import * as serviceWorker from './serviceWorker';
import { formatTicketsMiddleware } from './store/Product/ProductMiddleware';
import { rootReducer } from './store/rootReducer';

const history = createBrowserHistory();
const store = createStore(
	rootReducer,
	composeWithDevTools(
		applyMiddleware(
			thunk,
			logger,
			loadingBarMiddleware({
				promiseTypeSuffixes: ['REQUEST', 'DONE', 'ERROR'],
			}),
			formatTicketsMiddleware,
		),
	),
);

render(
	<React.StrictMode>
		<Provider store={store}>
			<Router history={history}>
				<Application />
			</Router>
		</Provider>
	</React.StrictMode>,
	document.querySelector('#root'),
);

serviceWorker.register();
