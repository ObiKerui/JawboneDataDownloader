import React from 'react';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import CustomScroll from 'react-custom-scroll';

const styles = {
  root: {
    margin: 10,
    padding: 10,
    //overflow: 'hidden',
    //height: 300,
    //border: '1px solid #ddd'
  }
};

// may use this if can get it working
const withCustomScroll = (Component) =>
  class WithCustomScroll extends React.Component {

    constructor(props) {
      super(props);
    }

    componentDidMount() {

    }

    componentWillUnmount() {
    }

    render() {
      return <CustomScroll><Component {...this.props} /></CustomScroll>;
    }
 }

function TabContainer(props) {
	const classes = props.classes;
  	return <div className={classes.root}>{props.children}</div>;
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default withStyles(styles)(TabContainer);