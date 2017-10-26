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
import { preProcessData, makeOptions, makePlot, makePlotStruct } from './Charts/GoogleGraphUtils'

import WithCard from './Decorators/WithCard'

import ProgressBar from './ProgressBar'

//  ----------------------------------
//  mapping from store state to props
//  ----------------------------------
const mapStateToProps = (state, ownProps) => {
  
  const patientIds = state.sleeps.idsByUser || []
  const sleepsByUser = state.sleeps.idsByUser || []
  const fetching = state.sleeps.transitInfo.fetching || false
  const cached = state.sleeps.transitInfo.cached || false
  let patientArr = []
  let plots = []
  let patients = []

  // wait until the action is cached
  if(cached) {

    for (var key in patientIds) {
      if (patientIds.hasOwnProperty(key)) {
          patientArr.push(key)
      }
    }

    patientArr.forEach(userId => {
      const sleepArrOfIds = sleepsByUser[userId]
      const user = state.entities.users[userId]
      
      const plot = makePlot(
        null,
        user.profile.first + ' ' + user.profile.last,
        user.createdAt,
        false,
        sleepArrOfIds.map((id) => {
          return state.entities.sleeps[id]
        }))

      plots.push(plot)
      patients.push(user)
    })
  }

  return {
    patients: patients,
    plots: plots,
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
      selectedSleepField: 0,
      plotStruct : makePlotStruct(
        '2017-01-01',
        '2018-01-01',
        null,
        null,
        []
      )
    }
  }

  componentDidMount() {
    const { loadSleeps } = this.props
    loadSleeps()    
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(!this.dataIsReady(nextProps)) {
      return false
    }
    return true
  }

  componentWillReceiveProps(nextProps) {
    if(!this.dataIsReady(nextProps)) {
      return
    }

    const { selectedSleepField } = this.state
    const { plots } = nextProps

    let plotStruct = makePlotStruct(
      '2017-01-01',
      '2018-01-01',
      makeOptions(true, 'date', 'something'),
      makeSleepParser(selectedSleepField),
      plots
    )

    plotStruct = this.refinePlotStruct(plotStruct)

    this.setState({
      plotStruct
    })
  }  

  dataIsReady = (props) => {
    const { fetching, cached } = props
    return (!fetching && cached)
  }

  refinePlotStruct = (plotStruct) => {
    // let { plots } = plotStruct

    // console.log('plots: ', plots)

    // let [ plot ] = plots
    // plot.active = true

    return plotStruct
  }

  onActionBarChange = (name, value) => {
    console.log('selection changed: ', name, value)
    this.setState({ [name]: value})
  }

  onClickHandler = (index) => {
    let { plots } = this.state.plotStruct
    let plot = plots[index]    
    plot.active = !plot.active
    this.setState({
      plotStruct: this.state.plotStruct
    })    
  }

  render() {

    const { classes, patients, plots, fetching } = this.props
    const { selectedSleepField, plotStruct } = this.state
    const { parser } = plotStruct

    //console.log('state: ', this.state)

    if (!this.dataIsReady(this.props)) {
      const title = 'Loading Sleeps'
      const subTitle = 'please wait. Loading...'
      return <ProgressBar title={title} subTitle={subTitle}/>
    }

    const graphData = preProcessData(plotStruct)

    const ActionBarProps = {
      name : 'Sleep Metric',
      helperText : 'Choose a sleep metric to view',
      arrayFields : parser.makeDropDownFields()
    }

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
              start={plotStruct.start}
              end={plotStruct.end}
              onChange={this.onActionBarChange}
            />
          </Grid>
        </Grid>       
        <GoogleChart chart={graphData} />
        <ChartFilter label={chartFilterTitle} plotStruct={plotStruct} onClickHandler={this.onClickHandler} />
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
