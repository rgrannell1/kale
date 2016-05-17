
"use strict"




const constants = require('../commons/constants')
const utils     = require('../commons/utils')





const printLine = { }






/*



*/

printLine.literalString = (patterns, line) => {

	const chars = line.split('').map( char => ({char, id: -1}) )

	const matchIndices = patterns.reduce((acc, pattern, id) => {


		var previousIndex  = -1
		const matchIndices = [ ]

		while (true) {

			var matchIndex = line.indexOf(pattern, previousIndex + 1)

			if (matchIndex === -1) {
				break
			} else {

				matchIndices.push(matchIndex)
				previousIndex = matchIndex

			}

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

	for (let {id, start, end} of matchIndices) {

		for (let ith = start; ith <= end; ++ith) {
			chars[ith].id = id
		}

	}

	utils
		.sequenceBy((elem0, elem1) => {
			return elem0.id === elem1.id
		}, chars)
		.forEach(sequence => {

			const id           = sequence[0].id
			const charSequence = sequence.map( ({char, id}) => char).join('')

			if (id === -1) {

				process.stdout.write(charSequence)

			} else {

				// style characters.

				const displayPattern = constants.displayPatterns[id % constants.displayPatterns.length]
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
