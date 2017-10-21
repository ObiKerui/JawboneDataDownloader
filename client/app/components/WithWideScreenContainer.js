import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Grid from 'material-ui/Grid';

const withWideScreenContainer = (Component) =>
  class WithWideScreenContainer extends React.Component {

    constructor(props) {
      super(props);
    }

    render() {

      return (
        <Grid container spacing={24}>
          <Grid item md={1} lg={2}>
          </Grid>
          <Grid item xs={12} md={10} lg={8}>
            <Component {...this.props} />
          </Grid>
          <Grid item md={1} lg={2}>
          </Grid>
        </Grid>
      );
    }
  }

export default withWideScreenContainer;