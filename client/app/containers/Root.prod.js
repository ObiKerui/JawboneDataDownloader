import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Route } from 'react-router-dom'

import Dashboard from './Dashboard'
import withWideScreenContainer from '../components/WithWideScreenContainer'
import AppBar from '../components/JawboneAppBar';

const Root = ({ store }) => (
  <Provider store={store}>
    <DocumentTitle title='Jawbone App'>
		<div>
			<AppBar title="Title" />
			<Route path="/" component={Dashboard} />
			<Route path="/groups" component={Groups} />
			<Route path="/users" component={Users} />
		</div>
    </DocumentTitle>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired,
}

export default withWideScreenContainer(Root)