
setup:
	cp .env-example.local .env.local

install:
	npm install

dev:
	npm run dev -- --open

test:
	npm run test

build:
	npm run build

lint:
	npm run format
	npm run lint
