
"use strict"





const utils = { }





/*
	group adjacent elements that match a predicate.
*/

utils.sequenceBy = (pred, coll) => {

	if (coll.length === 0) {
		return [ ]
	} else if (coll.length === 1) {
		return [coll]
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





module.exports = utils
