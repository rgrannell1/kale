
"use strict"



require('colors')





const millisecondsPerSecond = 1000

const constants = {
	packageJson: require('../../package'),
	units: {
		millisecondsPerSecond
	},
	regexp: {
		syntaxDelimiters: new RegExp([

			// brackets
			'\\[',
			'\\]',

			'\\(',
			'\\)',

			'\\{',
			'\\}',

			// delimiters
			'\\:',
			'\\,',

			// string open-closing.
			'\\"',
			"\\'"

		].join('|'), 'g')

	}
}





module.exports = constants
