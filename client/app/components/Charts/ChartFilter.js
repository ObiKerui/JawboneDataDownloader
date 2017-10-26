import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classnames from 'classnames';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import red from 'material-ui/colors/red';
import FavoriteIcon from 'material-ui-icons/Favorite';
import ShareIcon from 'material-ui-icons/Share';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Typography from 'material-ui/Typography'
import classNames from 'classnames'
import GridList from '../GridList'
import { compose } from 'recompose'
import { BasicList, BasicListStyle } from '../Lists/BasicList'
import FilterPlotElement from './FilterPlotElement'

const styles = theme => ({
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
    backgroundColor: red[100],
  },
  flexGrow: {
    flex: '1 1 auto',
  },
  bigAvatar: {
    width: 60,
    height: 60,
  }  
});

const ChartFilterListStyles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    background: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  media: {
    height: 200,
  },
  paper: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
  card: {
    [theme.breakpoints.down('sm')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover': {
      backgroundColor: red[100],
      cursor: 'pointer'
    }
  }  
})

const ChartFilterList = compose(
  withStyles(ChartFilterListStyles),
  BasicList
)(FilterPlotElement)

//  ------------------------------------------------------
//  CHART FILTER
//  ------------------------------------------------------
class ChartFilter extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {

    const { classes, label, plotStruct, onClickHandler } = this.props
    const { plots } = plotStruct
    //console.log('plots to chart filter: ', plots)

    const listData = plots.map((item, i) => {
      const { plotLabel, plotSubtitle, active } = item
      //console.log('plot label : active: ', plotLabel, plotSubtitle, active)
      return {
        plotLabel,
        plotSubtitle,
        active
      }
    })

    //console.log('listdata: ', listData)

    return (
      <div>
        <Card className={classes.card}>
          <CardActions disableActionSpacing>
            <IconButton aria-label="Add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="Share">
              <ShareIcon />
            </IconButton>
            <div className={classes.flexGrow} />
            <CardContent>
              <Typography type="subheading" gutterBottom>
                {label}
              </Typography>
            </CardContent>
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded,
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={this.state.expanded} transitionDuration="auto" unmountOnExit>
            <CardContent>
              <ChartFilterList listData={listData} onClickHandler={onClickHandler} />
            </CardContent>
          </Collapse>
        </Card>
      </div>
    );
  }
}

ChartFilter.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChartFilter)