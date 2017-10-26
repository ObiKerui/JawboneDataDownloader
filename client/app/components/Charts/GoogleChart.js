import React from 'react'
import { render } from 'react-dom'
import { Chart } from 'react-google-charts'
import ReactMoment from 'react-moment'
import merge from 'lodash/merge'

//  -------------------------------------------------
//
//  -------------------------------------------------
export default class JBChart extends React.Component {
  constructor(props) {
    super(props)

    console.log('props: ', props)

    const { chart } = props
    const { options } = chart
    const { hAxis, vAxis, legend } = options
    const { columns, rows } = chart

    console.log('columns: ', columns)

    this.chartEvents = [ {
        eventName: 'select',
        callback(Chart) {
          // returns chart so you can access props and the chart wrapper
          console.log('Selected: ', Chart.chart.getSelection())
        }
      }
    ]

    this.state = {
      chart: {
        options: {
          hAxis: hAxis,
          vAxis: vAxis,
          legend: legend,
          chartArea: { 'left':'80','top':'40','width':'70%','height':'75%'},
          'backgroundColor.fill': '#00ffff',        
          'explorer': { 
            'actions': ['dragToZoom', 'rightClickToReset'],
            'keepInBounds': false,
            'maxZoomIn' : 0.1
          }
        },
        rows: rows,
        columns: columns        
      }
    }
  }
   
  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    const { chart } = nextProps
    const { options, rows, columns } = chart

    this.setState(
      (prev, props) => {
        return {
          chart: {
            options: merge({}, prev.chart.options, options),
            rows: rows,
            columns: columns
          }
        }
      })
  }

  render() {

    const { chart } = this.state

    return (
      <Chart 
        chartType="LineChart"
        options={chart.options}
        rows={chart.rows}
        columns={chart.columns}
        graph_id="LineChart"
        width="100%"
        height="400px"
        chartEvents={this.chartEvents}
        legend_toggle
      />
    )
  }
}
