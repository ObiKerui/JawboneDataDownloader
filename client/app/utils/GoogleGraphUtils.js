import Moment from 'moment'
import times from 'lodash/times'
import constant from 'lodash/constant'

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

//  -------------------------------------------------
//
//  -------------------------------------------------
const extractPlotData = ({ sleeps }) => sleeps

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
  const plotDataArr = extractPlotData(plot)

  // for each sleep data object
  plotDataArr.forEach(elem => {
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

  //console.log('result so far: ', result)

  return result
}

//  -------------------------------------------------
//
//  -------------------------------------------------
const preProcessRows = (range, plots) => {
  let arrs = [ range ]
  plots.forEach(plot => {
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
    result.push({
      type: 'number',
      label: 'label'
    })
  })
  return result
}

//  -------------------------------------------------
//	check is array, maybe supply a function to check 
//	can parse too
//  -------------------------------------------------
const validInputPlots = (plots) => {
	if(Array.isArray(plots)) {
    	return true
    } 
    return false
}

//  -------------------------------------------------
//
//  -------------------------------------------------
const preProcessData = (plots, objParser) => {

	if(!validInputPlots(plots)) {
		throw new TypeError('not a valid formed set of props to graph utils')		
	}

	// create an array of dates from startDate to endData called range
	const str = '2017-03-01'
	const startDate = Moment(str)
	const endDate = Moment(str).add(10, 'months')
	const range = getDateArray(startDate, endDate, 'days', 1)

	const hAxisType = {
		type: 'date',
		label: 'date'
	}

	const cols = preProcessCols(hAxisType, plots)
	const preRows = preProcessRows(range, plots)
	const rows = transformArrays(preRows, objParser)

	console.log('rows: ', rows)

	return {
		cols: cols,
		rows: rows
	}
}

export {
	ObjParser,
	preProcessData
}