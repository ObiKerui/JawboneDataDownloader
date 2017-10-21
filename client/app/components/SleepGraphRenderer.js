import React from 'react'

import GoogleChart from './GoogleChart'

//  ----------------------------------
//  SLEEP GRAPH RENDERER
//  ----------------------------------
class SleepGraphRenderer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      tab: 0
    };
  }

  componentWillMount() {
  }

  componentWillReceiveProps(nextProps) {
  }  

  render() {

  	const { sleeps } = this.props

  	console.log('sleeps: ', sleeps)

    return (    
      <div>
      	<h1>sleep graph renderer</h1>
      	<GoogleChart data={sleeps} />
      </div>
    )    
  }
}

//  ----------------------------------
//  EXPORT PROFILE PANEL COMPONENT
//  ----------------------------------
export default SleepGraphRenderer
