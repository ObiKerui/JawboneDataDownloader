import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import { compose } from 'recompose';

import ListElement from './ListElement';
import withPaginator from './Paginator';

//----------------------------------------------------
// WILL REMOVE THIS TO OWN FILE 
//----------------------------------------------------
const withLoading = (Component) => (props) => {
  return (
  <div>
    <Component {...props} />

    <div>
      {props.loading && <span>Loading...</span>}
    </div>
  </div>
  )
};

//----------------------------------------------------
// WILL REMOVE THIS TO OWN FILE 
//----------------------------------------------------

//----------------------------------------------------
// WILL REMOVE THIS TO OWN FILE 
//----------------------------------------------------
const withInfiniteScroll = (Component) =>
  class WithInfiniteScroll extends React.Component {

    constructor(props) {
      super(props);
    }

    componentDidMount() {
      window.addEventListener('scroll', this.onScroll, false);
    }

    componentWillUnmount() {
      window.removeEventListener('scroll', this.onScroll, false);
    }

    onScroll = () => {
      if (
        (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500) &&
        this.props.list.length
      ) {
        this.props.onPaginatedLoad();
      }
    }

    render() {
      return <Component {...this.props} />;
    }
  }
//----------------------------------------------------
// WILL REMOVE THIS TO OWN FILE 
//----------------------------------------------------

const styles = theme => ({
  bigAvatar: {
    width: 60,
    height: 60,
  },
});

const List = ({ list }) => (
  <Grid container spacing={24}>
    {list.map((item, i) => <Grid item xs={12} md={6} key={i}>
      <ListElement obj={item} />
    </Grid>)}
  </Grid>
);

export default compose(
  withPaginator,
  withLoading,
  withInfiniteScroll,
  withStyles(styles),
)(List);
