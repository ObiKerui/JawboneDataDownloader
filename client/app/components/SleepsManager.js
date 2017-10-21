import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { loadSleeps } from '../actions/sleepActions'

//import SleepGraphRenderer from './SleepGraphRenderer'
import GoogleChart from './GoogleChart'
import ChartActionBar from './ChartActionBar'
import DatePicker from './DatePicker'
import { makeSleepParser } from '../utils/SleepParser'
import { preProcessData } from '../utils/GoogleGraphUtils'
import Grid from 'material-ui/Grid'

const makeUserSleep = (userId, sleepIdArray, state) => {
  return {
    user: userId,
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

  // wait until the action is cached
  if(cached) {

    for (var key in patientIds) {
      if (patientIds.hasOwnProperty(key)) {
          patientArr.push(key)
      }
    }

    patientArr.forEach(elem => {
      const sleepArrOfIds = sleepsByUser[elem]
      const userData = makeUserSleep(elem, sleepArrOfIds, state)
      userSleeps.push(userData)
    })
  }

  return {
    patients: patientArr,
    sleeps: userSleeps,
    fetching: fetching,
    cached: cached
  }
}

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
    console.log('fetching cached: ', fetching, cached)
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
    this.setState({
      selectedSleepField: value
    })
  }

  render() {

    const { classes, patients, sleeps, fetching } = this.props
    const { selectedSleepField } = this.state

    if (!this.dataIsReady()) {
      return <h1><i>{fetching} Loading sleeps...</i></h1>
    }

    console.log('sleeps: ', sleeps)
    const SleepParser = makeSleepParser(selectedSleepField)
    const refinedSleeps = this.refineSleepData(sleeps)
    const graphData = preProcessData(refinedSleeps, SleepParser)

    const ActionBarProps = {
      name : 'Sleep Metric',
      helperText : 'Choose a sleep metric to view',
      arrayFields : SleepParser.makeDropDownFields()
    }

    const start = 'Start'
    const defaultValue = '2017-05-05'

    return (    
      <div>
      	<h1>sleeps manager</h1>
        <Grid container spacing={8}>
          <Grid item xs={12} md={4}>
            <ChartActionBar
              name={ActionBarProps.name}
              helperText={ActionBarProps.helperText}
              arrayFields={ActionBarProps.arrayFields}
              onChange={this.onActionBarChange}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <DatePicker label={start} defaultValue={defaultValue}/>
          </Grid>          
        </Grid>                      
        <GoogleChart data={graphData} objParser={SleepParser} />
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
