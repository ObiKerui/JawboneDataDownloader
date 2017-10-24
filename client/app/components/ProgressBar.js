import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { LinearProgress } from 'material-ui/Progress';
import { compose } from 'recompose';
import red from 'material-ui/colors/red';
import withCard from './Decorators/WithCard'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: 10,
  },
  card: {
    //maxWidth: 400,
    marginBottom: 4
  },
  media: {
    //height: 194,
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  flexGrow: {
    flex: '1 1 auto',
  },
  bigAvatar: {
    width: 60,
    height: 60,
  }  
})


class LinearDeterminate extends React.Component {
  timer: number;
  state = {
    completed: 0,
  };

  componentDidMount() {
    this.timer = setInterval(this.progress, 500);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  progress = () => {
    const { completed } = this.state
    if (completed > 100) {
      this.setState({ completed: 0 })
    } else {
      const diff = Math.random() * 10
      this.setState({ completed: completed + diff })
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <LinearProgress mode="determinate" value={this.state.completed} />
        <br />
        <LinearProgress color="accent" mode="determinate" value={this.state.completed} />
      </div>
    )
  }
}

LinearDeterminate.propTypes = {
  classes: PropTypes.object.isRequired,
}

//export default withStyles(styles)(LinearDeterminate)

export default compose(
  withStyles(styles),
  withCard  
)(LinearDeterminate)
