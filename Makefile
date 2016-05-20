
ESLINT         = ./node_modules/.bin/eslint
ESLINT_FLAGS   = --config eslint/eslint.json





install: snap
	cd snapcraft && snap install kale_* && cd ..

eslint: FORCE
	$(ESLINT) $(ESLINT_FLAGS) ./src

snap: FORCE
	cd snapcraft && snapcraft clean && snapcraft snap && cd ..

FORCE:
