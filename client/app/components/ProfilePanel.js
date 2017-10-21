import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import defUserImage from '../../assets/users.png';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadProfile } from '../actions/profileActions'
import { loadUsers } from '../actions/usersActions'
import { loadUserSleeps } from '../actions/sleepActions'

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 200,
  },
};

//  ----------------------------------
//  mapping from store state to props
//  ----------------------------------
const mapStateToProps = (state, ownProps) => {

  const id = state.profile.id
  let profile = state.entities.users || {}
  profile = profile[id] || null
  
  return {
    errorMessage: state.errorMessage,
    profile: profile,
    fetching: state.profile.transitInfo.fetching        
  }
};

//  ----------------------------------
//  utility for loading data
//  ----------------------------------
const loadData = props => {
  props.loadProfile();
}

//  ----------------------------------
//  PROFILE PANEL REACT COMPONENT
//  ----------------------------------
class ProfilePanel extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)
  }

  componentWillMount() {
    loadData(this.props)
  }

  componentWillReceiveProps(nextProps) {
  }  

  handleClick() {
    console.log('i was clicked')
    this.props.loadUserSleeps()
  }

  render() {

    const { classes, errorMessage, profile, fetching } = this.props;

    if (!profile) {
      return <h1><i>{fetching} Loading details...</i></h1>
    }

    return (    
      <div>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={ profile.image ? profile.image : defUserImage }
            title="Profile Image"
          />
          <CardContent>
            <Typography type="headline" component="h2">
              {profile.name ? profile.name : 'supply name' }
            </Typography>
            <Typography component="p">
              Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
              across all continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions>
            <Button dense color="primary" onClick={this.handleClick}>
              Test Profile Update
            </Button>
            <Button dense color="primary">
              Learn More
            </Button>
          </CardActions>
        </Card>
      </div>
    );    
  }
}

//  ----------------------------------
//  define the prop types
//  ----------------------------------
ProfilePanel.propTypes = {
  classes: PropTypes.object.isRequired,
  profile: PropTypes.object
};

//  ----------------------------------
//  provide default proptypes
//  ----------------------------------
// ProfilePanel.defaultProps = {
// };

//  ----------------------------------
//  EXPORT PROFILE PANEL COMPONENT
//  ----------------------------------
ProfilePanel = withStyles(styles)(ProfilePanel);
export default connect(mapStateToProps, {
  loadProfile,
  loadUserSleeps
})(ProfilePanel)
