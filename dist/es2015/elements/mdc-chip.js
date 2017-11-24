var _dec, _dec2, _dec3, _dec4, _dec5, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3;

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

import { inject, DOM, customElement, bindable, computedFrom } from 'aurelia-framework';

export let MdcChip = (_dec = customElement('mdc-chip'), _dec2 = inject(DOM.Element), _dec3 = bindable({
    defaultValue: false
}), _dec4 = bindable({
    defaultValue: false
}), _dec5 = computedFrom('remove'), _dec(_class = _dec2(_class = (_class2 = class MdcChip {

    constructor(element) {
        _initDefineProp(this, 'remove', _descriptor, this);

        _initDefineProp(this, 'hover', _descriptor2, this);

        _initDefineProp(this, 'raised', _descriptor3, this);

        this.element = element;
    }

    get hasRemoveButton() {
        if ('remove' in this && typeof this.remove === 'function') {
            return true;
        }
        return false;
    }

    handleRemove(event) {
        this.remove(event);
        this.element.au.controller.view.removeNodes();
        this.element.au.controller.unbind();
    }
}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'remove', [bindable], {
    enumerable: true,
    initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'hover', [_dec3], {
    enumerable: true,
    initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'raised', [_dec4], {
    enumerable: true,
    initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, 'hasRemoveButton', [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, 'hasRemoveButton'), _class2.prototype)), _class2)) || _class) || _class);