import { inject, bindable, bindingMode, DOM, customElement, computedFrom, processContent } from 'aurelia-framework';
import { FEATURE } from 'aurelia-pal';

import { textField } from 'material-components-web';

//@processContent(makePartReplacementFromContent)
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
        defaultBindingMode: bindingMode.twoWay,
        changeHandler: 'itemsChanged'
    }) items;


    //items = [];
    selectionEvent = false;

    valueDOM;
    mdcValueDOM;
    simpleMenuDOM

    oldValue;

    constructor(element) {
        this.element = element;
    }

    attached() {
        this.mdcValueDOM = new textField.MDCTextField(this.valueDOM);

        this.oldValue = this.mdcValueDOM.value;

        this.mdcValueDOM.listen('change', (event) => {});
        this.mdcValueDOM.listen('input', (event) => {
            this.valueChangeHandler(event.target.value, this.oldValue);
            this.oldValue = event.target.value;
        });
    }

    itemsChanged() {
        if(!this.simpleMenuDOM) return;
        if (this.items && this.items.length > 0) {
            this.simpleMenuDOM.classList.add('mdc-simple-menu--open');
            this.simpleMenuDOM.style.transform = 'scale(1, 1)';
        } else {
            this.simpleMenuDOM.classList.remove('mdc-simple-menu--open');
            this.simpleMenuDOM.style.transform = 'scale(0, 0)';
        }
    }

    async valueChangeHandler(newValue, oldValue) {
        await this.lookup({ newValue: newValue, oldValue: oldValue });
    }

    async selectItem(item) {
        this.simpleMenuDOM.classList.remove('mdc-simple-menu--open');
        this.simpleMenuDOM.style.transform = 'scale(0, 0)';

        this.select({ item: item });
    }

}
