
.PHONY: js bundle clean server
.DEFAULT_GOAL := bundle

BUILD=babel --stage 2 app.jsx --out-file build/app.js

BUNDLE_ARGS=./build/app.js -t babelify -o build/bundle.js --verbose --debug

js: build/app.js

bundle: build/bundle.js

watch: build
	($(BUILD) --watch & watchify $(BUNDLE_ARGS)) && fg

clean:
	rm -r build

server:
	browser-sync start --server --files="build/bundle.js, css/*.css"

# ts:
# 	tsc --watch --experimentalAsyncFunctions --target ES6 --jsx react app.tsx --outDir build


build:
	mkdir -p build

build/app.js: build
	$(BUILD)

build/bundle.js: build/app.js
	browserify $(BUNDLE_ARGS)