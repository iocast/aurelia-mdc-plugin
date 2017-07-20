import { inject, bindable, bindingMode, DOM } from 'aurelia-framework';
import { checkbox } from 'material-components-web';

@inject(DOM.Element)
export class MdcCheckbox {

  @bindable({
    defaultBindingMode: bindingMode.twoWay
  }) isChecked = false;
  @bindable({
    defaultBindingMode: bindingMode.twoWay
  }) isIndeterminate = false;
  @bindable({
    defaultBindingMode: bindingMode.oneWay
  }) isDisabled = false;
  mdcCheckbox;

  constructor(element) {
    this.element = element;
  }

  bind() {
    this.mdcCheckbox = checkbox.MDCCheckbox.attachTo(this.element);
  }

  handleChange(evt) {
    // stop propagation so we're able to fire our own event when data-binding changes checked value
    evt.stopPropagation();
  }

  isCheckedChanged(newValue) {
    this.isIndeterminate = false;
    const event = new CustomEvent('change', {
      bubbles: true,
      detail: {
        value: newValue
      }
    });
    this.element.dispatchEvent(event);
  }

  isDisabledChanged(newValue) {
    this.mdcCheckbox.disabled = !!newValue;
  }

  isIndeterminateChanged(newValue) {
    this.mdcCheckbox.indeterminate = !!newValue;
  }

}
