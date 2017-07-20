var _dec, _dec2, _dec3, _dec4, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3;

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

import { inject, bindable, bindingMode, DOM } from 'aurelia-framework';
import { checkbox } from 'material-components-web';

export let MdcCheckbox = (_dec = inject(DOM.Element), _dec2 = bindable({
  defaultBindingMode: bindingMode.twoWay
}), _dec3 = bindable({
  defaultBindingMode: bindingMode.twoWay
}), _dec4 = bindable({
  defaultBindingMode: bindingMode.oneWay
}), _dec(_class = (_class2 = class MdcCheckbox {

  constructor(element) {
    _initDefineProp(this, 'isChecked', _descriptor, this);

    _initDefineProp(this, 'isIndeterminate', _descriptor2, this);

    _initDefineProp(this, 'isDisabled', _descriptor3, this);

    this.element = element;
  }

  bind() {
    this.mdcCheckbox = checkbox.MDCCheckbox.attachTo(this.element);
  }

  handleChange(evt) {
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

}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'isChecked', [_dec2], {
  enumerable: true,
  initializer: function () {
    return false;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'isIndeterminate', [_dec3], {
  enumerable: true,
  initializer: function () {
    return false;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'isDisabled', [_dec4], {
  enumerable: true,
  initializer: function () {
    return false;
  }
})), _class2)) || _class);