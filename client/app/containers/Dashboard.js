import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import { connect } from 'react-redux'

import Grid from 'material-ui/Grid'
import { withStyles } from 'material-ui/styles';

import ProfilePanel from '../components/ProfilePanel'
import GroupPanel from '../components/GroupPanel'
import GridList from '../components/SummaryList'
import ListElement from '../components/ListElement'
import SleepsManager from '../components/SleepsManager'
import GridTileList from '../components/GridList' // rendered that scrollable list
import Tabs from '../components/JawboneTabs'
import TabContainer from '../components/TabContainer'
import SwipeableViews from 'react-swipeable-views'

import { loadGroups, loadGroup } from '../actions/groupsActions'

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 200,
  },
}

const ListItem = (props) => {
	const { item } = props;

	console.log('props to item: ', props);

  	return (
    	<div>{item}</div>
  	)
}

//  ----------------------------------
//  mapping from store state to props
//  ----------------------------------
const mapStateToProps = (state, ownProps) => {
  
  const groupIds = state.groups.allIds || []
  const groupsMap = state.entities.groups || []
  const groups = groupIds.map((groupId) => groupsMap[groupId])
  
  const selectedGroupId = state.groups.selectedGroup || null
  const selectedGroup = groupsMap[selectedGroupId] || null 
  
  const patientIds = (selectedGroup ? selectedGroup.members : [])
  const usersMap = state.entities.users || []
  const patients = patientIds.map((patientId) => usersMap[patientId])
  
  const adminIds = (selectedGroup ? selectedGroup.admins : [])
  const admins = adminIds.map((adminId) => usersMap[adminId])

  return {
    errorMessage: state.errorMessage,
    fetching: state.groups.transitInfo.fetching,
    groups: groups,
    patients: patients,
    admins: admins,
    selectedGroup: selectedGroup
  }
}


class Dashboard extends React.Component {
	
	constructor(props) {
		super(props)

		this.onTabChange = this.onTabChange.bind(this)

		this.state = {
			tab: 0
		}
	}

	onTabChange = (tabInfo) => {
		this.setState({ tab: tabInfo.value })
	}

	render() {

	    const headers = [
	      'sleeps ',
	      'moves '
	    ]

		const testList = [ 1, 2, 3, 4, 5, 6 ]
		//console.log('groups: ', this.props.groups)
		//console.log('patients: ', this.props.patients)

		//const RecentGroups = SummList(ListItem)(testList)
		//const RecentUsers = SummList(ListItem)(testList)

		return (
	        <Grid container spacing={24}>
	        	<Grid item xs={12}>
	          	</Grid>
				<Grid item xs={12} sm={5} md={4}>
					<ProfilePanel />
					<h1>recent groups</h1>
					<GridList items={testList}>
						<ListElement/>
					</GridList>
					<h1>recent users</h1>
					<GridList items={testList}>
						<ListElement/>
					</GridList>			
				</Grid>
				<Grid item xs={12} sm={7} md={8}>
				    <Tabs 
          				headers={headers} 
          				onTabChange={ this.onTabChange } 
        			/>
			        <SwipeableViews index={this.state.tab} onChangeIndex={this.handleChangeIndex}>
			          	<TabContainer>
				    		<SleepsManager />
				    	</TabContainer>
			          	<TabContainer>
			            	the moves here
			          	</TabContainer>
			        </SwipeableViews>

					<GroupPanel />
					<h1>users summary</h1>
				</Grid>
	        </Grid>                
		)
	}
}

//  ----------------------------------
//  EXPORT PROFILE PANEL COMPONENT
//  ----------------------------------
Dashboard = withStyles(styles)(Dashboard);
export default connect(mapStateToProps, {
  loadGroups,
  loadGroup
})(Dashboard)

//export default Dashboard;