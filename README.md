# aurelia-mdc-plugin

[![NPM](https://nodei.co/npm/aurelia-mdc-plugin.png?compact=true)](https://nodei.co/npm/aurelia-mdc-plugin/)

# Aurelia CLI:

## Install:

```bash
npm i -S material-components-web
npm i -S aurelia-mdc-plugin
```

### Bundle:

add **material-components-web** and **aurelia-mdc-plugin** to one of your bundle's dependencies in _aurelia.json_.

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
    "name": "aurelia-mdc-plugin",
    "path": "../node_modules/aurelia-mdc-plugin/dist/amd",
    "main": "index",
    "resources": ["**/*.{html,css}"]
}
```

### Register the plugin:

```javascript
export function configure(aurelia) {
    ...
    aurelia.use.plugin('aurelia-mdc-plugin');
    ...
}
```

### import the css:

```html
<require from="material-components-web/material-components-web.css"></require>
```

## Use it!

### General usage

```html
<button class="mdc-button
               mdc-button--raised
               mdc-button--primary
               mdc-ripple-surface">
    Print Greeting
</button>
```

### Add new or 3rd party MDC-web components:

```js
aurelia.use.plugin('aurelia-mdc-plugin', mdc => mdc.addComponents({
    'mdc-selector': 'MDCClassName'
}));
```

The plugin automaticaly adds `data-mdc-auto-init="MDCRipple"` to the button above and initializes it, so you do not have to add it to any of the components available.

### Custom Elements

`mdc-checkbox`

Your view includes the checkbox. The plugin automatically adds the necessary _html_ and _svg_ snippets.

```html
<label>
    <mdc-checkbox is-checked.bind="raisedButtons" is-indeterminate.bind="isIndeterminate" is-disabled.bind="isFirstCbDisabled" change.delegate="handleChange()"></mdc-checkbox>
    Raised buttons
</label>
```

Your model needs to provide the `boolean` flags

```javascript
export class Example {
  // these flags are used
  accentButtons = true;
  raisedButtons = true;
  isIndeterminate = true;
  changeEventCount = 0;
  isDisabled = true;

  handleChange() {
    this.changeEventCount++;
  }

  makeIndeterminate() {
    this.isIndeterminate = true;
  }

  toggleCheckbox() {
    this.raisedButtons = !this.raisedButtons;
  }
}
```

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

`mdc-chip`

```html
<mdc-chip remove.bind="removeMe()" hover="true" raised="true">
    <!-- optional: if you want to have an icon -->
    <div class="mdc-chip-icon">A</div>
    <!-- your text -->
    <span>This is my chip</span>
</mdc-chip>
```

`remove` action is optional. if it is set, it will automatically add a remove icon at the end of the chip.

`hover` and `raised` are optional parameters
