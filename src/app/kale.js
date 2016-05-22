
"use strict"





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
		patterns = predefinedPatterns.default
	}

	readStdin(line => {


		const formatted = printer(patterns, line)

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
