
ESLINT         = ./node_modules/.bin/eslint
ESLINT_FLAGS   = --config eslint/eslint.json





eslint: FORCE
	$(ESLINT) $(ESLINT_FLAGS) ./src

install: snap
	rm snapcraft/kale_*
	cd snapcraft && snap install kale_* && cd ..

snap: FORCE
	cd snapcraft && snapcraft clean && snapcraft snap && cd ..

test:
	python3 tests/cases/sh-tests.py

FORCE:
