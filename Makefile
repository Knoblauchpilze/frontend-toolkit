
setup:
	cp .env-example.local .env.local

dev:
	npm run dev -- --open

test:
	npm run test

build:
	npm run build

lint:
	npx prettier . --write
