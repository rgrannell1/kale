
"use strict"




const constants = require('../commons/constants')
const utils     = require('../commons/utils')





utils.sequenceBy = (pred, coll) => {

	if (coll.length === 0) {
		return [ ]
	} else if (coll.length === 1) {
		return [[elem]]
	} else {

		const sequences = [ [coll[0]] ]

		for (let ith = 1; ith < coll.length; ++ith) {

			const elem   = coll[ith]
			const target = sequences[sequences.length - 1]

			if ( pred(target[target.length - 1], elem) ) {
				target.push(elem)
			} else {
				sequences.push( [elem] )
			}

		}

		return sequences

	}

}





const printLine = { }






/*



*/

printLine.literalString = (patterns, line) => {

	const chars = line.split('').map( char => ({char, id: -1}) )

	const matchIndices = patterns.reduce((acc, pattern, id) => {

		const matchIndex = line.indexOf(pattern)

		if (matchIndex !== -1) {

			acc.push({
				id,
				start: matchIndex,
				end:   Math.min(line.length, matchIndex + pattern.length - 1)
			})

		}

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
