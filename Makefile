
ESLINT         = ./node_modules/.bin/eslint
ESLINT_FLAGS   = --config eslint/eslint.json





install:
	npm link && npm install --global

eslint: FORCE
	$(ESLINT) $(ESLINT_FLAGS) ./src

FORCE:
