import React from 'react';
import { render } from 'react-dom';
import { Chart } from 'react-google-charts'
import ReactMoment from 'react-moment'

//  -------------------------------------------------
//
//  -------------------------------------------------
export default class JBChart extends React.Component {
  constructor(props) {
    super(props)

    this.chartEvents = [ {
        eventName: 'select',
        callback(Chart) {
          // returns chart so you can access props and the chart wrapper
          console.log('Selected: ', Chart.chart.getSelection())
        }
      }
    ]

    this.state = {
      options: {
        hAxis: { title: 'Date', minValue: 0, maxValue: 15 },
        vAxis: { title: 'Weight', minValue: 0, maxValue: 15 },
        legend: 'true',
        chartArea: { 'left':'80','top':'40','width':'70%','height':'75%'},
        'backgroundColor.fill': '#00ffff',        
        'explorer': { 
          'actions': ['dragToZoom', 'rightClickToReset'],
          'keepInBounds': false,
          'maxZoomIn' : 0.1
        }
      },
      rows: [],
      columns: []
    }
  }
   
  componentWillMount() {
  }

  render() {

    const { data } = this.props
    const { rows, cols } = data

    console.log('data to chart: ', data)

    return (
      <Chart 
        chartType="LineChart"
        options={this.state.options}
        rows={rows}
        columns={cols}
        graph_id="LineChart"
        width="100%"
        height="400px"
        chartEvents={this.chartEvents}
        legend_toggle
      />
    )
  }
}
