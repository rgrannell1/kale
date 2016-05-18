
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






printLine.literalString = (patterns, line) => {

	const matchIndices = patterns.reduce((acc, pattern, id) => {

		var matchIndex
		var previousIndex  = -1

		const matchIndices = [ ]

		while ( (matchIndex = line.indexOf(pattern, previousIndex + 1)) !== -1 ) {

			matchIndices.push(matchIndex)
			previousIndex = matchIndex

		}

		matchIndices.forEach(matchIndex => {

			if (matchIndex !== -1) {

				acc.push({
					id,
					start: matchIndex,
					end:   Math.min(line.length, matchIndex + pattern.length - 1)
				})

			}

		})

		return acc

	}, [ ])

	const chars = line.split('').map( char => ({char, id: -1}) )

	for (let {id, start, end} of matchIndices) {

		for (let ith = start; ith <= end; ++ith) {
			chars[ith].id = id
		}

	}

	utils.sequenceBy((elem0, elem1) => {
		return elem0.id === elem1.id
	}, chars)
	.forEach(sequence => {

		const id           = sequence[0].id
		const charSequence = sequence.map( ({char, _}) => char).join('')

		if (id === -1) {

			process.stdout.write(charSequence)

		} else {

			const displayPattern = displayText[id % displayText.length]
			process.stdout.write(displayPattern(charSequence))

		}


	})

	console.log('')

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
