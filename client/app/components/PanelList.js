import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

import Grid from 'material-ui/Grid';

import ListElement from './ListElement';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 200,
  },
};

class PanelList extends React.Component {

  render() {

    const classes = this.props.classes;
    const items = this.props.items.map((item, i) => 
      <Grid item xs={12} md={6} key={i}>
        <ListElement obj={item} />
      </Grid>);

    return (
      <Grid container spacing={24}>
        {items}
      </Grid>                      
    );
  }
}

PanelList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PanelList);