#!/usr/bin/env python






import unittest
from sh import kale





class Tests(unittest.TestCase):

	def test_no_matches(self):

		assert kale(_in = "pass") == "pass\n"
		assert kale(_in = "💩 💩 💩 ") == "💩 💩 💩 \n"






if __name__ == '__main__':
	unittest.main( )
