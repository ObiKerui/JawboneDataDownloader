import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

// const styles = theme => ({
//   root: theme.mixins.gutters({
//     paddingTop: 16,
//     paddingBottom: 16,
//     marginTop: theme.spacing.unit * 3,
//   }),
// });

const withPaper = (Component) =>
  class WithPaper extends React.Component {
    constructor(props) {
      super(props)
    }

    render() {
      const { classes } = this.props

      return (
        <div>
          <Paper className={classes.root} elevation={4}>
            <Typography type="headline" component="h3">
            </Typography>
              <Component {...this.props} />
          </Paper>
        </div>
      )        
    }
}

export default withPaper
