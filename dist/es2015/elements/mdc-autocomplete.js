var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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

import { inject, bindable, bindingMode, DOM, customElement, computedFrom } from 'aurelia-framework';
import { checkbox } from 'material-components-web';

export let MdcAutocomplete = (_dec = customElement('mdc-autocomplete'), _dec2 = inject(DOM.Element), _dec3 = bindable({
    defaultBindingMode: bindingMode.twoWay
}), _dec4 = bindable({
    attribute: 'render-item',
    defaultBindingMode: bindingMode.twoWay
}), _dec5 = bindable({
    defaultBindingMode: bindingMode.twoWay
}), _dec6 = bindable({
    attribute: 'value',
    defaultBindingMode: bindingMode.twoWay,
    changeHandler: 'valueChangeHandler'
}), _dec7 = computedFrom("_value"), _dec(_class = _dec2(_class = (_class2 = class MdcAutocomplete {

    constructor(element) {
        _initDefineProp(this, 'lookup', _descriptor, this);

        _initDefineProp(this, 'renderItem', _descriptor2, this);

        _initDefineProp(this, 'select', _descriptor3, this);

        _initDefineProp(this, '_value', _descriptor4, this);

        this.listItems = [];
        this.selectionEvent = false;

        this.element = element;
    }

    attached() {}

    valueChangeHandler(newValue, oldValue) {
        var _this = this;

        return _asyncToGenerator(function* () {
            if (!_this.simpleMenuDOM || _this.selectionEvent) {
                _this.selectionEvent = false;
                return;
            }

            _this.listItems = yield _this.lookup({ newValue: newValue, oldValue: oldValue });

            if (_this.listItems && _this.listItems.length > 0) {
                _this.simpleMenuDOM.classList.add('mdc-simple-menu--open');
                _this.simpleMenuDOM.style.transform = "scale(1, 1)";
            } else {
                _this.simpleMenuDOM.classList.remove('mdc-simple-menu--open');
                _this.simpleMenuDOM.style.transform = "scale(0, 0)";
            }
        })();
    }

    renderListItem(value) {
        return this.renderItem({ item: value });
    }

    selectItem(value) {
        this.selectionEvent = true;
        this._value = value.description;
        this.simpleMenuDOM.classList.remove('mdc-simple-menu--open');
        this.simpleMenuDOM.style.transform = "scale(0, 0)";

        if (typeof this.select === 'function') this.select({ item: value });
    }

    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
    }

}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'lookup', [_dec3], {
    enumerable: true,
    initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'renderItem', [_dec4], {
    enumerable: true,
    initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'select', [_dec5], {
    enumerable: true,
    initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, '_value', [_dec6], {
    enumerable: true,
    initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, 'value', [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, 'value'), _class2.prototype)), _class2)) || _class) || _class);