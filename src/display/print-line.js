
"use strict"




const constants = require('../commons/constants')
const utils     = require('../commons/utils')





const printLine = { }




printLine.literalString = (patterns, line) => {

	var formattedLine = line

	patterns.forEach((pattern, ith) => {

		const displayPattern = constants.displayPatterns[ith % constants.displayPatterns.length]

		formattedLine = formattedLine.replace(pattern, displayPattern(pattern))

	})

	console.log(formattedLine)

}

printLine.groupRegexp = (patterns, line) => {

}

printLine.regexp = (patterns, line) => {

	var formattedLine = line

	patterns.forEach((pattern, ith) => {

		const regexp = new RegExp(pattern, 'g')

		const displayPattern = constants.displayPatterns[ith % constants.displayPatterns.length]
		const matches        = formattedLine.match(regexp)

		if (matches) {

			matches.forEach(match => {
				formattedLine = formattedLine.replace(regexp, displayPattern(match))
			})

		}

	})

	console.log(formattedLine)

}



module.exports = printLine
