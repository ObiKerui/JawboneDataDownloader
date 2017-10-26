import Moment from 'moment'
import times from 'lodash/times'
import constant from 'lodash/constant'

// Need data of the following format:
//{
//  start: date,
//  end: date,
//  parser: ObjParser,
//  plots: [
//    plotInfo: obj, plotLabel: label, active: true|false, plotPoints: [dataObjs],
//    plotInfo: obj, plotLabel: label, active: true|false, plotPoints: [dataObjs],
//    ...
//    plotInfo: obj, plotLabel: label, active: true|false, plotPoints: [dataObjs],
//  ]
//} 

class ObjParser {
    constructor(prop) {
        this.prop = prop;
    }
    
    getValue(obj) {
    	return 0
    }
}

//  -------------------------------------------------
//  CREATE AN ARRAY OF DATES
//  -------------------------------------------------
const getDateArray = (start, end, interval, increment) => {
  const config = {
    interval: interval || 'days',
    increment: increment || 1
  }

  let dateArray = []
  let currentDate = start.clone()

  while (currentDate < end) {
    dateArray.push(currentDate.toDate())
    currentDate = currentDate.clone().add(config.increment, config.interval)
  }

  return dateArray
}

const findDate = (elem, index, array) => {
  const dateInRange = Moment(elem)
  //const dateInSleep = Moment(this.date)

  //console.log('compare date : ', this)
  return false
}

//  -------------------------------------------------
//
//  -------------------------------------------------
const createPlot = (range, plot) => {

  // create a null array the size of range
  let resultArr = times(range.length, constant(null));

  // retrieve the data we need
  const { plotPoints } = plot

  // for each sleep data object
  plotPoints.forEach(elem => {
    const idx = range.findIndex((element, index, arr) => {
      const dateInRange = Moment(element)
      const dateInSleep = Moment(elem.date, 'YYYYMMDD')
      return (dateInRange.isSame(dateInSleep, 'day'))
    })

    if(idx !== -1) {
      resultArr[idx] = elem
    }
  })
  return resultArr
}

//  -------------------------------------------------
//
//  -------------------------------------------------
const transformArrays = (arrs, objParser) => {
  let result = []
  const [ hAxisValues ] = arrs

  hAxisValues.forEach(value => {
    result.push([value])
  })

  //console.log('obj parser: ', objParser)

  for(var i = 1; i < arrs.length; i++) {
    const arr = arrs[i]
    for(var j = 0; j < hAxisValues.length; j++) {
      if(arr[j] === null) {
        result[j].push(0)
      } else {
        result[j].push(objParser.getValue(arr[j]))
      }
    }
  }

  return result
}

//  -------------------------------------------------
//
//  -------------------------------------------------
const preProcessRows = (range, plots) => {

  let arrs = [ range ]
  plots.forEach(plot => {

    if(!plot.active) {
      return
    }

    const plotArr = createPlot(range, plot)
    arrs.push(plotArr)
  })
  return arrs
}

//  -------------------------------------------------
//
//  -------------------------------------------------
const preProcessCols = (hAxisType, plots) => {
  let result = []

  result.push(hAxisType)

  plots.forEach(plot => {

    if(!plot.active) {
      return
    }

    result.push({
      type: 'number',
      label: plot.plotLabel || 'label'
    })
  })

  return result
}

//  -------------------------------------------------
//  preprocess the options 
//  -------------------------------------------------
const preProcessOptions = (options) => {
  const { showLegend, hAxisTitle, vAxisTitle } = options

  let newOptions = {
    hAxis: { title: hAxisTitle, minValue: 0, maxValue: 1 },
    vAxis: { title: vAxisTitle, minValue: 0, maxValue: 1 },
    legend: showLegend
  }

  return newOptions
}

//  -------------------------------------------------
//	check is array, maybe supply a function to check 
//	can parse too
//  -------------------------------------------------
const noActiveRows = (plots) => {
  for(let i = 0; i < plots.length; i++) {
    if(plots[i].active) {
      return false
    }
  }
  return true
}

//  -------------------------------------------------
//
//  -------------------------------------------------
const preProcessData = (plotStruct) => {

  const { start, end, parser, plots, options } = plotStruct

  console.log('what is plotstruct: ', plotStruct)

	// create an array of dates from startDate to endData called range
	const startDate = Moment(start)
	const endDate = Moment(end)
	const range = getDateArray(startDate, endDate, 'days', 1)

	const hAxisType = {
		type: 'date',
		label: 'date'
	}

	const cols = preProcessCols(hAxisType, plots)
	const preRows = preProcessRows(range, plots)
	const rows = transformArrays(preRows, parser)
  const procOpts = preProcessOptions(options)

  if(noActiveRows(plots)) {
    let amendedRows = []
    rows.forEach(row => {
      const [ rowdata ] = row
      amendedRows.push([rowdata, 0])
    }) 

    let amendedCols = []
    amendedCols.push(cols[0])
    amendedCols.push({ type: 'number', label: 'number' })

    let amendedOptions = procOpts
    amendedOptions.legend = 'none'

    return {
      columns: amendedCols,
      rows: amendedRows,
      options: amendedOptions
    }
  }

	return {
		columns: cols,
		rows,
    options: procOpts
	}
}

const makeOptions = (showLegend, hAxisTitle, vAxisTitle) => {
  return { showLegend, hAxisTitle, vAxisTitle }
}

const makePlot = (plotImage, plotLabel, plotSubtitle, active, plotPoints) => {
  return { plotImage, plotLabel, plotSubtitle, active, plotPoints }
}

const makePlotStruct = (start, end, options, parser, plots ) => {
  return { start, end, options, parser, plots }
}

export {
	ObjParser,
	preProcessData,
  makeOptions,
  makePlot,
  makePlotStruct
}