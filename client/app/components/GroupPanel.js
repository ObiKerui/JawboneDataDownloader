import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';

import PanelCard from './PanelCard';
import DefaultUserImage from '../../assets/users.png';

import Tabs from './JawboneTabs';
import TabContainer from './TabContainer';
import SwipeableViews from 'react-swipeable-views';

import List from './InfScrollList';

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { loadGroups, loadGroup } from '../actions/groupsActions'
import { loadUsers } from '../actions/usersActions'

import ListElement from './ListElement'
import SleepsManager from './SleepsManager'

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 200,
  },
}

//  ----------------------------------
//  mapping from store state to props
//  ----------------------------------
const mapStateToProps = (state, ownProps) => {
  
  const groups = state.groups.allIds || []
  const selectedGroupId = state.groups.selectedGroup || null
  const groupsMap = state.entities.groups || []
  const selectedGroup = groupsMap[selectedGroupId] || null 
  //const patientIds = (selectedGroup ? selectedGroup.members : [])
  const patientIds = state.users.allIds || []
  const patients = patientIds.map((patientId) => state.entities.users[patientId])
  const adminIds = (selectedGroup ? selectedGroup.admins : [])
  const admins = adminIds.map((adminId) => state.entities.users[adminId])

  return {
    errorMessage: state.errorMessage,
    fetching: state.groups.transitInfo.fetching,
    groups: groups,
    patients: patients,
    admins: admins,
    selectedGroup: selectedGroup
  }
}

//  ----------------------------------
//  utility for loading data
//  ----------------------------------
const loadData = props => {
  props.loadGroups()
  props.loadUsers()
}

const DebugList = (Component) => (list) => {

  return (
    <Grid container spacing={24}>
      {list.map((item, i) => <Grid item xs={12} md={6} key={i}>
        <Component obj={item}/>
      </Grid>)}
    </Grid>
  )
}

const ListElem = (props) => {

  const { item } = props;
  //console.log('item elem:', item)

  return (
    <div>{item}</div>
  )
}


// const ListItem = ({ item, key }) => (
//   <div key={key}>{item}</div>
// )

class GroupPanel extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      tab: 0
    }
  }

  componentWillMount() {
    loadData(this.props)
  }

  componentWillReceiveProps(nextProps) {
  }  

  onTabChange = (tabInfo) => {
    this.setState({ tab: tabInfo.value })
  };

  loadGroup = (group) => {
    //console.log('group to fetch: ', group)
    //this.props.loadGroup(group.id)
  }

  render() {

    const { classes, admins, patients, groups, selectedGroup, fetching } = this.props;
    const nPatients = patients.length
    const nAdmins = admins.length

    const headers = [
      'patients ' + '(' + nPatients + ')',
      'therapists ' + '(' + nAdmins + ')'
    ]

    if (!selectedGroup) {
      return <h1><i>{fetching} Loading details...</i></h1>
    }

    if(!patients) {
      return <h1><i>{fetching} Loading users...</i></h1>
    }

    //console.log('patients: ', patients)

    return (    
      <div>
        <PanelCard title={selectedGroup.title} subTitle={selectedGroup.subTitle} avatar={selectedGroup.image} />
        <Tabs 
          headers={headers} 
          onTabChange={ this.onTabChange } 
        />

        <SwipeableViews index={this.state.tab} onChangeIndex={this.handleChangeIndex}>
          <TabContainer>
            { DebugList(ListElement)(patients) }
          </TabContainer>
          <TabContainer>
            { DebugList(ListElement)(admins) }
          </TabContainer>
        </SwipeableViews>
        <SleepsManager />
      </div>
    )    
  }
}

GroupPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

//  ----------------------------------
//  EXPORT PROFILE PANEL COMPONENT
//  ----------------------------------
GroupPanel = withStyles(styles)(GroupPanel);
export default connect(mapStateToProps, {
  loadGroups,
  loadGroup,
  loadUsers
})(GroupPanel)
