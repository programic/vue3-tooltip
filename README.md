# Vue 3 & Nuxt 3 Tooltip
[![npm version](https://badge.fury.io/js/@programic%2Fvue3-tooltip.svg)](https://badge.fury.io/js/@programic%2Fvue3-tooltip)
[![Vue 3](https://img.shields.io/badge/Vue-3-green)](https://img.shields.io/badge/Vue-3-green)

[//]: # (![vt]&#40;https://i.imgur.com/i2PMcTq.gif&#41;)

## Features

- **Vue 3** compatible!
- **Nuxt 3** compatible!
- Generic registration allows it to be used inside any app!
- Fully written in Typescript with full types support
- Easy to set up for real, you can make it work in less than 10sec!
- Customize everything
- Use your custom components as the tooltip body for endless possibilities!
- Define behavior per tooltip
- Use your themes and animations easily
- And much more!

## Installation

```
$ yarn add @programic/vue3-tooltip
$ npm install --save @programic/vue3-tooltip
```

## Usage

### Plugin registration

Add it as a plugin to your app:
```javascript
import { createApp } from "vue";
import Tooltip from "@programic/vue3-tooltip";
// Import the CSS or use your own!
import '@programic/vue3-tooltip/dist/index.css';

const app = createApp(...);

const options = {
    // You can set your default options here
};

app.use(Tooltip, options);
```

Or, if you are using Typescript:
```javascript
import { createApp } from "vue";
import Tooltip, { TooltipConfiguration } from '@programic/vue3-tooltip';
// Import the CSS or use your own!
import '@programic/vue3-tooltip/dist/index.css';

const app = createApp(...);

const options: TooltipConfiguration = {
    // You can set your default options here
};

app.use(Tooltip, options);
```

### Creating tooltips by directive
To create tooltips by directive, add v-tooltip on your element

```html
<p><span v-tooltip="this is a tooltip">Hover me</span></p>
```

### Creating tooltips by component
For more options and configurations use tooltip by a component

```javascript
<script>
    import { Tooltip } from '@programic/vue3-tooltip';
</script>

<template>
    <Tooltip title="tooltip test">Hover me</Tooltip>
</template>
```

### Positioning the Tooltip

By default, the tooltip will be displayed at the top of the element, but you can set it manually using the `placement` option.

You can use the type definitions or one of the allowed values: **top**, **right**, **bottom**, **left**.

```javascript
import Tooltip from '@programic/vue3-tooltip';

app.use(Tooltip, {
    // Setting the global default position
    position: 'bottom',
});


// Or set it per tooltip
<Tooltip title="tooltip test" placement="bottom">Hover me</Tooltip>
```

### Tooltip types

Depending on the context, you may want to use tooltips of different colors. You can easily do that by setting the type of tooltip to be displayed.

```javascript
<Tooltip title="tooltip test" type="light">Hover me</Tooltip>

// You can also set the type programmatically when calling the default toast
import Tooltip from '@programic/vue3-tooltip';

app.use(Tooltip, {
    // Setting the global default type
    type: 'light',
});
```

## API

### Plugin registration (app.use)
| Option                 | Type                                                              | Default                                             | Description                                                                                                                                                                                                               |
|------------------------|-------------------------------------------------------------------|-----------------------------------------------------| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| placement              | String                                                            | `top`                                               | Position of the toast on the screen. Can be any of **top-right**, **top-center**, **top-left**, **bottom-right**, **bottom-center**, **bottom-left**.                                                                     |
| container              | Object or Boolean                                                 | `true`                                              | Whether or not the newest toasts are placed on the top of the stack.                                                                                                                                                      |

### Tooltip (props)
| Props       | Type        | Required | Description                                                      |
|-------------|-------------|----------|------------------------------------------------------------------|
| container   | HTMLElement | No       | Override global container config where tooltip needs teleported) |
| trigger     | String      | No       | When the tooltip opens                                           |
| placement   | String      | No       | The position of the tooltip                                      |
| size        | String      | No       | The tooltip size                                                 |
| type        | String      | No       | The tooltip type                                                 |
| title       | String      | No       | The tooltip title                                                |
| description | String      | No       | The tooltip description                                          |


# License
Copyright (C) 2022 [Programic](https://github.com/programic). Licensed under MIT
