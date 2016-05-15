
//"use strict"





const fs         = require('fs')
const readline   = require('readline')
const constants  = require('../commons/constants')




const readStdin = onLine => {

	readline.createInterface({input: process.stdin})
	.on('line', onLine)
	.on('close', ( ) => {
		process.exit(1)
	})

}




module.exports = readStdin
