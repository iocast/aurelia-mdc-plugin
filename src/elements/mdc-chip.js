import { inject, DOM, customElement, bindable, computedFrom } from 'aurelia-framework';

@customElement('mdc-chip')
@inject(DOM.Element)
export class MdcChip {
    @bindable remove;
    @bindable({
        defaultValue: false
    }) hover;
    @bindable({
        defaultValue: false
    }) raised;

    constructor(element) {
        this.element = element;
    }

    @computedFrom('remove')
    get hasRemoveButton() {
        if ('remove' in this && typeof(this.remove) === 'function') {
            return true;
        }
        return false;
    }

    handleRemove(event) {
        this.remove(event);
        this.element.au.controller.view.removeNodes();
        this.element.au.controller.unbind();
    }
}
