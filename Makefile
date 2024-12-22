
setup:
	cp .env-example.local .env.local

dev:
	npm run dev -- --open

build:
	npm run build
	npm run postbuild

lint:
	npx prettier . --write
