import { ObjParser } from './GoogleGraphUtils'

class SleepParser extends ObjParser {
    constructor(prop) {
    	super(prop)

    	console.log('prop to sleep parser: ', prop)
    }

    getValue(obj) {
    	console.log('prop : ', this.prop)

    	switch(this.prop) {
    		case 0 :
    			return obj.details.asleepTime
    		case 1 :
    			return obj.details.awake
    		case 2 :
    			return obj.details.awakeTime
    		case 3 :
    			return obj.details.awakenings
    		case 4 :
    			return obj.details.duration
    		case 5 :
    			return obj.details.light
    		case 6 :
    			return obj.details.rem
    		case 7 :
    			return obj.details.sound
    		case 8 :
    			return obj.details.timeCompleted
    		case 9 :
    			return obj.details.timeCreated
    		case 10 :
    			return obj.details.timeUpdated
    		default:
    			return 0
    	}
    }
    
    makeDropDownFields() {
    	return [
    		{ value: 0, text: 'Asleep Time' },
    		{ value: 1, text: 'Awake' },
    		{ value: 2, text: 'Awake Time' },
    		{ value: 3, text: 'Awakenings' },
    		{ value: 4, text: 'Duration' },
    		{ value: 5, text: 'Light' },
    		{ value: 6, text: 'REM' },    		    		    		    		    		    		    		
    		{ value: 7, text: 'Sound'},    		    		    		    		    		    		    		
    		{ value: 8, text: 'Time Completed' },
    		{ value: 9, text: 'Time Created' },    		    		    		    		    		    		    		
    		{ value: 10, text: 'Time Updated'}   		
    	]
    }
}

//  -------------------------------------------------
//
//  -------------------------------------------------
const makeSleepParser = (selectedField) => {
	return new SleepParser(selectedField)
}

export {
	makeSleepParser
}