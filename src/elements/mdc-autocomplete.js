import { inject, bindable, bindingMode, DOM, customElement, computedFrom } from 'aurelia-framework';
import { textField } from 'material-components-web';

@customElement('mdc-autocomplete')
@inject(DOM.Element)
export class MdcAutocomplete {
    @bindable({
        defaultBindingMode: bindingMode.twoWay
    }) lookup;

    @bindable({
        attribute: 'render-item',
        defaultBindingMode: bindingMode.twoWay
    }) renderItem;

    @bindable({
        defaultBindingMode: bindingMode.twoWay
    }) select;

    @bindable({
        attribute: 'value',
        defaultBindingMode: bindingMode.twoWay,
        changeHandler: 'valueChangeHandler'
    }) _value;

    listItems = [];
    selectionEvent = false;

    valueDOM;
    mdcValueDOM;
    simpleMenuDOM

    constructor(element) {
        this.element = element;
    }

    attached() {
        this.mdcValueDOM = new textField.MDCTextField(this.valueDOM);

        this.element.setValue = (value) => {
            this.setValue(value);
        };
    }

    async valueChangeHandler(newValue, oldValue) {
        if (!this.simpleMenuDOM || this.selectionEvent) {
            this.selectionEvent = false;
            return;
        }

        this.listItems = await this.lookup({ newValue: newValue, oldValue: oldValue });

        if (this.listItems && this.listItems.length > 0) {
            this.simpleMenuDOM.classList.add('mdc-simple-menu--open');
            this.simpleMenuDOM.style.transform = 'scale(1, 1)';
        } else {
            this.simpleMenuDOM.classList.remove('mdc-simple-menu--open');
            this.simpleMenuDOM.style.transform = 'scale(0, 0)';
        }
    }

    renderListItem(value) {
        return this.renderItem({ item: value });
    }

    async selectItem(value) {
        this.selectionEvent = true;
        this._value = this.renderItem({ item: value });
        this.simpleMenuDOM.classList.remove('mdc-simple-menu--open');
        this.simpleMenuDOM.style.transform = 'scale(0, 0)';

        this.select({ item: value });
    }


    @computedFrom('_value')
    get value() {
        return this._value;
    }

    set value(value) {
        this._value = value;
    }

    setValue(value) {
        this.selectionEvent = true;
        this._value = value;
        this.mdcValueDOM.getDefaultFoundation().adapter_.removeClassFromLabel('mdc-textfield__label--float-above');

        if (this._value) {
            this.mdcValueDOM.getDefaultFoundation().adapter_.addClassToLabel('mdc-textfield__label--float-above');
        }
    }
}
