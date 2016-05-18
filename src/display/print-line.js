
"use strict"




const utils         = require('../commons/utils')
const matchPatterns = require('../app/match-patterns')




const displayText = [
	text => text.green,
	text => text.red,
	text => text.yellow,
	text => text.blue,
	text => text.magenta,
	text => text.cyan,
	text => text.black,
	text => text.white,
	text => text.gray,
	text => text.grey
]





const printLine = { }






const displayPatternMatches = (matcher, patterns, line) => {

	const matchIndices = matcher(patterns, line)

	// tag each character with a pattern id (default to -1)

	const chars = line.split('').map( char => ({char, id: -1}) )

	for (let {id, start, end} of matchIndices) {

		for (let ith = start; ith <= end; ++ith) {
			chars[ith].id = id
		}

	}

	// group adjacent matching id's into sublists,
	// then colourise each id and print the message.

	const displayLine = utils
		.sequenceBy(
			(elem0, elem1) => elem0.id === elem1.id, chars)
		.map(sequence => {

			const id           = sequence[0].id
			const charSequence = sequence.map( ({char, _}) => char).join('')

			return id === -1
				? charSequence
				: displayText[id % displayText.length](charSequence)

		})
		.join('')

	console.log(displayLine)

}






printLine.literalString = displayPatternMatches.bind({ }, matchPatterns.literalString)

printLine.groupRegexp = (patterns, line) => {
	throw 'not supported'
}

printLine.regexp = displayPatternMatches.bind({ }, matchPatterns.regexp)






module.exports = printLine
