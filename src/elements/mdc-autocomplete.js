import { inject, bindable, bindingMode, DOM, customElement } from 'aurelia-framework';

import { textField } from 'material-components-web';

@customElement('mdc-autocomplete')
@inject(DOM.Element)
export class MdcAutocomplete {
    @bindable({
        defaultBindingMode: bindingMode.twoWay
    }) lookup;

    @bindable({
        defaultBindingMode: bindingMode.twoWay
    }) select;

    @bindable({
        attribute: 'items',
        defaultBindingMode: bindingMode.oneWay,
        changeHandler: 'itemsChanged'
    }) items;

    selectionEvent = false;

    valueDOM;
    mdcValueDOM;
    menuDOM

    oldValue;

    constructor(element) {
        this.element = element;
    }

    attached() {
        this.mdcValueDOM = textField.MDCTextField.attachTo(this.valueDOM);

        this.oldValue = this.mdcValueDOM.value;

        this.mdcValueDOM.listen('change', (event) => {});
        this.mdcValueDOM.listen('input', (event) => {
            this.valueChangeHandler(event.target.value, this.oldValue);
            this.oldValue = event.target.value;
        });
    }

    itemsChanged() {
        if (!this.menuDOM && !this.changed) return;
        if (this.items && this.items.length > 0) {
            this.menuDOM.classList.add('mdc-menu--open');
            this.menuDOM.style.transform = 'scale(1, 1)';
        } else {
            this.menuDOM.classList.remove('mdc-menu--open');
            this.menuDOM.style.transform = 'scale(0, 0)';
        }
        this.changed = false;
    }

    async valueChangeHandler(newValue, oldValue) {
        await this.lookup({ newValue: newValue, oldValue: oldValue });
        this.changed = true;
    }

    async selectItem(item) {
        this.menuDOM.classList.remove('mdc-menu--open');
        this.menuDOM.style.transform = 'scale(0, 0)';

        let selection = {};
        for (let [key, value] of Object.entries(item)) {
            selection[key] = value;
        }

        this.select({ item: selection });
    }
}
