import React from 'react';
import { render } from "react-dom";
import Root from './containers/Root';
import configureStore from './store/configureStore'
import {
  HashRouter as Router,
} from 'react-router-dom'

const store = configureStore()

const rootEl = document.getElementById('react-application')
render(
	<Router>
		<Root store={store} />
	</Router>, 
	rootEl
)
