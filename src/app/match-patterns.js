
"use strict"





const is    = require('is')
const utils = require('../commons/utils')





const matchPatterns = { }





matchPatterns.literalString = (patterns, line) => {

	return patterns.reduce((acc, text, id) => {

		var matchIndex
		var previousIndex  = -1
		const matchIndices = [ ]

		// get the start index of each match in the line.

		while ( (matchIndex = line.indexOf(text, previousIndex + 1)) !== -1 ) {

			matchIndices.push(matchIndex)
			previousIndex = matchIndex

		}

		// accumulate all new match-indices.

		return acc.concat( matchIndices.map(matchIndex => {

			return {
				id,
				start: matchIndex,
				end:   Math.min(line.length, matchIndex + text.length - 1)
			}

		}) )

	}, [ ])

}

matchPatterns.regexp = (patterns, line) => {

	return patterns.reduce((acc, pattern, id) => {

		const regexp = is.regexp(pattern)
			? pattern
			: new RegExp(pattern, 'g')

		const matches = utils.regexMatches(regexp, line)

		return acc.concat( matches.map(match => {

			return {
				id,
				start: match.index,
				end:   match.index + (match.match.length - 1)
			}

		}) )

	}, [ ])

}






module.exports = matchPatterns
