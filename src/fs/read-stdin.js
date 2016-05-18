
//"use strict"





const readline = require('readline')




const readStdin = onLine => {

	readline.createInterface({input: process.stdin})
	.on('line', onLine)
	.on('close', ( ) => {
		process.exit(1)
	})

}




module.exports = readStdin
