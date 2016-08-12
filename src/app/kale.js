
"use strict"



const userFailingErrorMesasage = `Something has went terribly wrong!
Please report the following error message to https://github.com/rgrannell1/kale/issues,
(along with the input text if possible):
`

process.on('uncaughtException', err => {

	console.error(userFailingErrorMesasage)

	console.error(err.message)
	console.error(err.stack)

	process.exit(1)

})





const events             = require('events')
const constants          = require('../commons/constants')
const predefinedPatterns = require('../app/predefined-patterns')
const readStdin          = require('../fs/read-stdin')
const printLine          = require('../display/print-line')





const kale = rawArgs => {

	const args = kale.preprocess(rawArgs)

	if (args.version) {

		console.log(constants.packageJson.version)
		process.exit(0)

	}

	var mode
	const emitter = new events.EventEmitter( )

	if (args.fixedString) {
		mode = 'literalString'
	} else {
		mode = 'regexp'
	}

	const printer  = printLine[mode]
	var patterns

	if (rawArgs.patterns && rawArgs.patterns.length > 0) {
		patterns = rawArgs.patterns
	} else {
		patterns = predefinedPatterns.today( )
	}

	readStdin(line => {

		const formatted = printer(patterns, line, {
			invert:           args.invert,
			displayWholeLine: args.displayWholeLine
		})

		if (rawArgs.display) {
			console.log(formatted)
		}

		emitter.emit('line', {
			before: line,
			after:  formatted
		})

	})

	return emitter

}

kale.preprocess = rawArgs => {
	return rawArgs
}





module.exports = kale
