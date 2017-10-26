import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import FavoriteIcon from 'material-ui-icons/Favorite';
import classNames from 'classNames';
import red from 'material-ui/colors/red';
import { withRouter } from 'react-router-dom';
import Moment from 'react-moment'
import DefaultUserImage from '../../../assets/users.png';

// const styles = theme => ({
//   media: {
//     height: 200,
//   },
//   paper: {
//     padding: 16,
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//   },
//   bigAvatar: {
//     width: 60,
//     height: 60,
//   },
//   card: {
//     [theme.breakpoints.down('sm')]: {
//       width: '100% !important', // Overrides inline-style
//       height: 100,
//     },
//     '&:hover': {
//       backgroundColor: red[300],
//       cursor: 'pointer'
//     }
//   }  
// })

class FilterPlotElement extends React.Component {

  constructor(props) {
    super(props);

    // this.handleKeyUp = this.handleKeyUp.bind(this);
    // this.handleOnChange = this.handleOnChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

    // this.getInputValue = this.getInputValue.bind(this);
  }

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  handleClick() {
    const { index, onClickHandler } = this.props
    onClickHandler(index)
  }

  render() {

    const { classes, element } = this.props

    if(!element) {
      return (<h1>loading...</h1>)
    }

    const image = (element.image || DefaultUserImage)
    const createDate = (date) => <span> joined: <Moment format="DD/MM/YYYY">{date}</Moment></span>

    let selectedStyle = {
      /* some more class properties */
      //background: '#cc181e',
      backgroundColor: red[200]
    }

    return (
      <Card onClick={this.handleClick} className={classes.card} style={element.active ? selectedStyle : {}}>
        <CardHeader
          avatar={
            <Avatar aria-label="ElemImage" className={classNames(classes.avatar, classes.bigAvatar)} src={image}/>
          }
          title={element.plotLabel}
          subheader={createDate(element.createdAt)}
        />
      </Card>
    );
  }
}

FilterPlotElement.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default FilterPlotElement

//export default withStyles(styles)(withRouter(FilterPlotElement))
//export default withStyles(styles)(FilterPlotElement)
