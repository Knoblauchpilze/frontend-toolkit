# frontend-toolkit

# Why this package?

This package aims at providing building blocks that help to kickstart a svelte-kit project able to interact with the backend services developed with [backend-toolkit](https://github.com/KnoblauchPilze/backend-toolkit).

It also defines convenience components allowing to style the various websites in a consistent way.

TODO: Create a template project for the frontend service.

# Badges

[![Build and test package](https://github.com/Knoblauchpilze/frontend-toolkit/actions/workflows/build-and-test.yml/badge.svg)](https://github.com/Knoblauchpilze/frontend-toolkit/actions/workflows/build-and-test.yml)

[![Publish package to npmjs](https://github.com/Knoblauchpilze/frontend-toolkit/actions/workflows/publish-package.yml/badge.svg)](https://github.com/Knoblauchpilze/frontend-toolkit/actions/workflows/publish-package.yml)

# What is the content of this repository?

Taken from the svelte documentation:

```
Everything inside src/lib is part of your library, everything inside src/routes can be used as a showcase or preview app.
```

# How to get started?

To build the library:

```bash
npm run package
```

To publish the package, you can run:

```bash
npm publish
```

# Useful resources

While building this package, some resources were instrumental to understand what needs to be done and how. In particular:

- the [svelte documentation](https://svelte.dev/docs/kit/packaging) about packaging and specifically the introduction to get started with how to create the project.
- this [freecodecamp](https://www.freecodecamp.org/news/how-to-create-and-publish-your-first-npm-package/) tutorial on how to publish an `npm` package: it does not apply 100% to svelte but gives a good overview.
- this [youtube video](https://www.youtube.com/watch?v=_TymiadmPrc) by `Syntax` which showcases how to publish a svelte package precisely.
- this [npm documentation](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#repository) link explains how to handle the `provenance` option.
