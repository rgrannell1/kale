#!/usr/bin/env python






import random
import unittest
from sh import kale





def unique_string (size):
	return ''.join(random.choice(['0', '1']) for _ in range(size))

def find_kale_styles( ):

	unique_strings = [ ]

	unique_style_starts  = set( )

	while True:

		unique_strings.append(unique_string(128))

		outputs = kale(unique_strings, _in = ' '.join(unique_strings))

		previous_unique_count = len(unique_style_starts)

		for str_input, str_output in zip(unique_strings, outputs.split(' ')):

			# get the style applied to the current string.

			style_start, style_end = str_output.split(str_input)

			unique_style_starts.add(style_start)
			unique_style_end = style_end.strip( )

		# styles cycle back-around; exit when the same style is encountered.
		if len(unique_style_starts) == previous_unique_count:
			break

	return [{"start": start, "end": unique_style_end} for start in unique_style_starts]

def find_ansii (styles, pattern, output):

	processed   = output.stdout.decode("unicode_escape").strip( )
	match_found = False

	for style in styles:

		styled_pattern = style['start'] + pattern + style['end']

		if processed.find(styled_pattern) != -1:
			match_found = True

	return match_found






class Tests(unittest.TestCase):

	# validate test fails when no value present.

	def test_known_finder_failure (self):

		try:
			assert find_ansii(find_kale_styles( ), 'not present', '___')
		except Exception:
			return

		assert false

	def test_no_matches (self):

		for patterns in [ ['mismatch_0'], ['mismatch_0', 'mismatch_1'] ]:
			for text_input in [unichr(0x2603), unichr(0x2603)]:

				expected_ouput = text_input + '\n'

				# -- regular expression mode.

				assert kale(patterns, _in = text_input) == expected_ouput

				# -- fixed string mode.

				assert kale(patterns, fixed_string = True, _in = text_input) == expected_ouput


	def test_fixed_string_matches (self):

		# first, extract the colour information associated with each match group.

		styles = find_kale_styles( )

		for pattern in ['foo', 'baz']:

			assert find_ansii(styles, pattern,
				kale([pattern], fixed_string = True, _in = pattern))

			assert find_ansii(styles, pattern,
				kale([pattern], fixed_string = True, _in = 'pre ' + pattern + ' post'))

			assert find_ansii(styles, pattern,
				kale([pattern], fixed_string = True, _in = 'pre ' + pattern + ' post'))






if __name__ == '__main__':
	unittest.main( )
