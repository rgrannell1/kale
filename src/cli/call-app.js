
"use strict"





const app = require('../app/kale')





const callApp = rawArgs => app(callApp.preprocess(rawArgs))

callApp.preprocess = rawArgs => {

	return {
		regexp:      rawArgs['--regexp'],
		fixedString: rawArgs['--fixed-string'],
		default:     rawArgs['--default'],

		patterns:    rawArgs['<pattern>'],
		version:     rawArgs['--version']
	}

}






module.exports = callApp
