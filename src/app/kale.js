
"use strict"





const constants = require('../commons/constants')
const readStdin = require('../fs/read-stdin')
const printLine = require('../display/print-line')





const kale = rawArgs => {

	const args = kale.preprocess(rawArgs)

	if (args.version) {

		console.log(constants.packageJson.version)
		process.exit(0)

	}

	var mode

	if (args.fixedString) {
		mode = 'literalString'
	} else if (args.groupRegexp) {
		mode = 'groupRegexp'
	} else {
		mode = 'regexp'
	}

	const printer = printLine[mode]

	readStdin(printer.bind({ }, rawArgs.patterns))

}

kale.preprocess = rawArgs => {
	return rawArgs
}





module.exports = kale
