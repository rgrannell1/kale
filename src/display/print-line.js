
"use strict"




const utils = require('../commons/utils')




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






printLine.literalString = (textPatterns, line) => {

	const foo = utils.regexMatches( /(a)(b)(c)/g, 'abcd abc'  )

	console.log(
		foo
	)

	throw 'xxx'

	// for each literal text pattern, assign an ID, start & end index.

	const matchIndices = textPatterns.reduce((acc, text, id) => {

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

printLine.groupRegexp = (patterns, line) => {

	var formattedLine = line

	console.log(formattedLine)

}

printLine.regexp = (patterns, line) => {

	var formattedLine = line

	patterns.forEach((pattern, ith) => {

		const regexp = new RegExp(pattern, 'g')

		const displayPattern = displayText[ith % displayText.length]
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
