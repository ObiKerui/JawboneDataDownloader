import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { loadSleeps } from '../actions/sleepActions'

import { makeSleepParser } from '../utils/SleepParser'

import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'

import ChartActionBar from './Charts/ChartActionBar'
import ChartFilter from './Charts/ChartFilter'
import GoogleChart from './Charts/GoogleChart'
import { preProcessData } from './Charts/GoogleGraphUtils'

import WithCard from './Decorators/WithCard'

import ProgressBar from './ProgressBar'

const makeUserSleep = (userId, user, sleepIdArray, state) => {

  return {
    user: userId,
    label: user.profile.first + ' ' + user.profile.last,
    sleeps: sleepIdArray.map((id) => {
      return state.entities.sleeps[id]
    })
  }
}

//  ----------------------------------
//  mapping from store state to props
//  ----------------------------------
const mapStateToProps = (state, ownProps) => {
  
  const patientIds = state.sleeps.idsByUser || []
  const sleepsByUser = state.sleeps.idsByUser || []
  const fetching = state.sleeps.transitInfo.fetching || false
  const cached = state.sleeps.transitInfo.cached || false
  let patientArr = []
  let userSleeps = []
  let patients = []

  // wait until the action is cached
  if(cached) {

    for (var key in patientIds) {
      if (patientIds.hasOwnProperty(key)) {
          patientArr.push(key)
      }
    }

    patientArr.forEach(elem => {
      const sleepArrOfIds = sleepsByUser[elem]
      const user = state.entities.users[elem]
      const userData = makeUserSleep(elem, user, sleepArrOfIds, state)
      userSleeps.push(userData)
      patients.push(user)
    })
  }

  return {
    patients: patients,
    sleeps: userSleeps,
    fetching: fetching,
    cached: cached
  }
}

const Chart = WithCard(GoogleChart)

//  ----------------------------------
//  SLEEP PANEL
//  ----------------------------------
class SleepManager extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      tab: 0,
      selectedSleepField: 0
    }
  }

  componentWillMount() {
    const { loadSleeps } = this.props
    loadSleeps()    
  }

  componentWillReceiveProps(nextProps) {
  }  

  dataIsReady = () => {
    const { fetching, cached } = this.props
    //console.log('fetching cached: ', fetching, cached)
    return (!fetching && cached)
  }

  refineSleepData = (sleepData) => {
    let elem = []
    
    for(var i = 0; i < sleepData.length; i++) {
      let curr = sleepData[i].sleeps || []
      if(curr.length > 0) {
        elem.push(sleepData[i]) 
      }
    }
    return elem
  }

  onActionBarChange = (name, value) => {
    console.log('selection changed: ', name, value)
    this.setState({ [name]: value})
  }

  render() {

    const { classes, patients, sleeps, fetching } = this.props
    const { selectedSleepField } = this.state

    if (!this.dataIsReady()) {
      const title = 'Loading Sleeps'
      const subTitle = 'please wait. Loading...'
      return <ProgressBar title={title} subTitle={subTitle}/>
    }

    console.log('sleeps: ', sleeps)
    const SleepParser = makeSleepParser(selectedSleepField)
    // need to add column label to sleeps

    //const refinedSleeps = this.refineSleepData(sleeps)
    const refinedSleeps = sleeps
    const graphData = preProcessData(refinedSleeps, SleepParser)

    const ActionBarProps = {
      name : 'Sleep Metric',
      helperText : 'Choose a sleep metric to view',
      arrayFields : SleepParser.makeDropDownFields()
    }

    const start = 'Start'
    const defaultStart = '2017-01-01'
    const defaultEnd = '2018-01-01'
    const chartFilterTitle = 'filter chart'

    // same patients as is seen on chart

    return (    
      <div>
        <Grid container spacing={8}>
          <Grid item xs={12} md={12}>
            <ChartActionBar
              name={ActionBarProps.name}
              helperText={ActionBarProps.helperText}
              arrayFields={ActionBarProps.arrayFields}
              start={defaultStart}
              end={defaultEnd}
              onChange={this.onActionBarChange}
            />
          </Grid>
        </Grid>       
        <GoogleChart data={graphData} objParser={SleepParser} />
        <ChartFilter label={chartFilterTitle} listData={patients} />
      </div>
    )    
  }
}

//  ----------------------------------
//  EXPORT PROFILE PANEL COMPONENT
//  ----------------------------------
export default connect(mapStateToProps, {
  loadSleeps
})(SleepManager)
