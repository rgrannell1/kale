
"use strict"




const constants = require('../commons/constants')





const builtInHighlighters = { }





builtInHighlighters.default = [
	constants.regexp.syntaxDelimiters,
	constants.regexp.numbers
]






module.exports = builtInHighlighters
