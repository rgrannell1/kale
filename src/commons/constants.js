
"use strict"



const colours = require('colors')




const millisecondsPerSecond = 1000

const constants = {
    reservedChars:   ['Ỳ', 'ỳ'],
	displayPatterns: [
    	match => match.green,
    	match => match.red,
    	match => match.yellow,
    	match => match.blue,
    	match => match.magenta,
    	match => match.cyan,
    	match => match.black,
    	match => match.white,
    	match => match.gray,
    	match => match.grey
	],
	packageJson: require('../../package'),
	units: {
		millisecondsPerSecond,
		nanosecondsPerMillisecond: 10000000,
		secondsPerMinute:          60
	}
}





module.exports = constants
