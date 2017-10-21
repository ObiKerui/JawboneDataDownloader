import React from 'react';
import PropTypes from 'prop-types';

import { compose } from 'recompose';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

import PanelCard from './PanelCard';
import DefaultUserImage from '../../assets/users.png';

class GridList extends React.Component {

	constructor(props) {
		super(props)
		this.renderChild = this.renderChild.bind(this)
	}

	renderChild(item) {
	  const child = React.Children.only(this.props.children)
	  return React.cloneElement(child, {
	  	item: item
	  })
	}

	render() {

		const { items, children } = this.props

	  	return (
	    	<Grid container spacing={24}>
	      		{items.map((item, i) => 
	      			<Grid item xs={12} md={12} key={i}>
	      				{this.renderChild(item)}
	      			</Grid>)}
	    	</Grid>
	  	)		
	}
}

const styles = theme => ({
  bigAvatar: {
    width: 60,
    height: 60,
  },
});

export default compose(
	withStyles(styles),
)(GridList)