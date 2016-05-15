
"use strict"




const is                 = require('is')
const errCodes           = require('err-codes')

const fs                 = require('fs')
const path               = require('path')

const constants          = require('../commons/constants')
const readStdin          = require('../fs/read-stdin')
const printLine          = require('../display/print-line')





const kale = rawArgs => {

	const args = kale.preprocess(rawArgs)

	if (args.version) {
		console.log(constants.packageJson.version)
		process.exit(0)
	}

	if (args.fixedString) {
		var mode = 'literalString'
	} else if (args.groupRegexp) {
		var mode = 'groupRegexp'
	} else {
		var mode = 'regexp'
	}

	const printer = printLine[mode]

	readStdin(line => {
		printer(rawArgs.patterns, line)
	})

}

kale.preprocess = rawArgs => {
	return rawArgs
}





module.exports = kale
