#!/usr/bin/env python






import unittest
from sh import kale





class Tests(unittest.TestCase):

	def test_no_matches(self):

		# -- regular expression mode.

		assert kale("mismatch_0", _in = "💩 💩 💩 ") == "💩 💩 💩 \n"
		assert kale("mismatch_0", "mismatch_1", _in = "💩 💩 💩 ") == "💩 💩 💩 \n"

		assert kale("mismatch_0", "mismatch_1", _in = "💩 💩 💩 ") == "💩 💩 💩 \n"

		# -- fixed string mode.

		assert kale("mismatch_0", fixed_string = True, _in = "💩 💩 💩 ") == "💩 💩 💩 \n"
		assert kale("mismatch_0", "mismatch_1", fixed_string = True, _in = "💩 💩 💩 ") == "💩 💩 💩 \n"

		assert kale("mismatch_0", "mismatch_1", fixed_string = True,_in = "💩 💩 💩 ") == "💩 💩 💩 \n"





if __name__ == '__main__':
	unittest.main( )
