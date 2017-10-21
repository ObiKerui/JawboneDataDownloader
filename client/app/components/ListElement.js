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
import DefaultUserImage from '../../assets/users.png';

const styles = theme => ({
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
      backgroundColor: red[300],
      cursor: 'pointer'
    }
  }  
});

// const Button = withRouter(({ history}) => (
//   <button
//     type='button'
//     onClick={() => { history.push('/new-location') }}
//   >
//     Click Me!
//   </button>
// ))

class ListElement extends React.Component {

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
    const { history } = this.props;
    history.push('/users');   
  }

  render() {

    const { classes, obj } = this.props

    if(!obj) {
      return (<h1>loading...</h1>)
    }

    const image = (obj.defaultImage || DefaultUserImage)
    const { profile } = obj

    const createDate = (date) => <span> joined: <Moment format="DD/MM/YYYY">{date}</Moment></span>

    return (
      <Card onClick={this.handleClick} className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="ElemImage" className={classNames(classes.avatar, classes.bigAvatar)} src={image}/>
          }
          title={profile.first + ' ' + profile.last}
          subheader={createDate(obj.createdAt)}
        />
      </Card>
    );
  }
}

ListElement.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(ListElement));

