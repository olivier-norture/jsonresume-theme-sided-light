.PHONY: test publish

test:
	npm test

publish:
	npm version patch --no-git-tag-version
	npm config set //registry.npmjs.org/:_authToken $${NPM_TOKEN}
	npm publish
