![GitHub Workflow Status](https://img.shields.io/github/workflow/status/artmizu/nuxt-yandex-metrika/CI?label=CI&style=plastic) ![GitHub Workflow Status](https://img.shields.io/github/workflow/status/artmizu/nuxt-yandex-metrika/release-please?label=release&style=plastic)

# Yandex Metrika for Nuxt 2/3

## Features
* Support Nuxt 2/3
* Prints handy mesages in a dev mode, when certain goals is reached
* Expose useful methods to the nuxt app instance
* Fully customizable via runtime config
* Types for external API

## Installation

### Nuxt 3
Install package via a package manager:
```bash
# using npm
npm install --save-dev @artmizu/nuxt-yandex-metrika

# using yarm
yarn add -D @artmizu/nuxt-yandex-metrika

# using pnpm
pnpm add -D @artmizu/nuxt-yandex-metrika
```

Add it to a modules section of your nuxt config:
```js
export default {
  modules: ['@artmizu/nuxt-yandex-metrika']
}
```

## Nuxt 2
Similarly install package and add it to a buildModules section of your nuxt config:
```js
export default {
  buildModules: ['@artmizu/nuxt-yandex-metrika']
}
``` 

# Module parameters
You can pass it through runtime config, module options and the special nuxt config property.