# aurelia-mdc-plugin

[![NPM](https://nodei.co/npm/@iocast/aurelia-mdc-plugin.png?compact=true)](https://nodei.co/npm/@iocast/aurelia-mdc-plugin/)

# Aurelia CLI:

[DEMO](https://iocast.github.io/aurelia-mdc-plugin-example/index.html)

## Install:

```bash
npm i -S material-components-web
npm i -S @iocast/aurelia-mdc-plugin
```

### Bundle:

add **material-components-web** and **@iocast/aurelia-mdc-plugin** to one of your bundle's dependencies in _aurelia.json_.

```json
{
    "name": "material-components-web",
    "path": "../node_modules/material-components-web/dist",
    "main": "material-components-web",
    "resources": [
        "material-components-web.css"
    ]
},
{
    "name": "@iocast/aurelia-mdc-plugin",
    "path": "../node_modules/@iocast/aurelia-mdc-plugin/dist/amd",
    "main": "index",
    "resources": ["**/*.{html,css}"]
}
```

### Register the plugin:

```javascript
import { PLATFORM } from 'aurelia-pal';
...
export function configure(aurelia) {
    ...
    aurelia.use.plugin(PLATFORM.moduleName('@iocast/aurelia-mdc-plugin'));
    ...
}
```

### import the css:

Inside `main.html` import the stylesheet.

```html
<require from="material-components-web/material-components-web.css"></require>
```

## Use it!

### General usage

```html
<button class="mdc-button"
        click.delegate="print()">
    Print Greeting
</button>
```

more example [here](https://iocast.github.io/aurelia-mdc-plugin-example/index.html)


### Add new or 3rd party MDC-web components:

```js
aurelia.use.plugin('@iocast/aurelia-mdc-plugin', mdc => mdc.addComponents({
    'mdc-selector': 'MDCClassName'
}));
```

The plugin automaticaly adds `data-mdc-auto-init="MDCRipple"` to the button above and initializes it, so you do not have to add it to any of the components available.

### Custom Elements


`mdc-datepicker`

```html
<mdc-datepicker locale.bind="en" start-week-on="monday" value.bind="testDate">
  <label class="mdc-textfield__label">Date</label>
</mdc-datepicker>
```

`mdc-timepicker`

```html
<mdc-timepicker locale.bind="de" value.bind="testDate">
  <label class="mdc-textfield__label">Time</label>
</mdc-timepicker>
```

`mdc-autocomplete`

```html
<mdc-autocomplete ref="valueDOM" value.bind="currentValue" lookup.call="onChangeLookupEvent(newValue, oldValue)" render-item.call="renderListItemEvent(item)" select.call="onSelectionEvent(item)">
  <label class="mdc-textfield__label">Autocomplete Label</label>
</mdc-autocomplete>
```

```javascript
export class YourModel {
  ...
  async onChangeLookupEvent(newValue, oldValue) {
    // or call your service
    return new Promise((resolve, reject) => {
      resolve([
        {
          id: 'DBv-1ADov-123',
          description: 'Item 1'
        },
        {
          id: 'H40-8Vd2v-1Dg',
          description: 'Item 2'
        }
      ]);
    });
  }

  renderListItemEvent(item) {
    return item.description;
  }

  async onSelectionEvent(item) {
    let data = await this.service.getDetails(item.id);
    // do something
  }
  ...
}
```

you can use `setValue(value)` on the element to set a value without triggering the lookup event.

