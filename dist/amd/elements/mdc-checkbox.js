define(['exports', 'aurelia-framework', 'material-components-web'], function (exports, _aureliaFramework, _materialComponentsWeb) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.MdcCheckbox = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
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

    var _dec, _dec2, _dec3, _dec4, _dec5, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3;

    var MdcCheckbox = exports.MdcCheckbox = (_dec = (0, _aureliaFramework.customElement)('mdc-checkbox'), _dec2 = (0, _aureliaFramework.inject)(_aureliaFramework.DOM.Element), _dec3 = (0, _aureliaFramework.bindable)({
        defaultBindingMode: _aureliaFramework.bindingMode.twoWay
    }), _dec4 = (0, _aureliaFramework.bindable)({
        defaultBindingMode: _aureliaFramework.bindingMode.twoWay
    }), _dec5 = (0, _aureliaFramework.bindable)({
        defaultBindingMode: _aureliaFramework.bindingMode.oneWay
    }), _dec(_class = _dec2(_class = (_class2 = function () {
        function MdcCheckbox(element) {
            _classCallCheck(this, MdcCheckbox);

            _initDefineProp(this, 'isChecked', _descriptor, this);

            _initDefineProp(this, 'isIndeterminate', _descriptor2, this);

            _initDefineProp(this, 'isDisabled', _descriptor3, this);

            this.element = element;
        }

        MdcCheckbox.prototype.bind = function bind() {
            this.mdcCheckbox = _materialComponentsWeb.checkbox.MDCCheckbox.attachTo(this.element);
        };

        MdcCheckbox.prototype.handleChange = function handleChange(evt) {
            evt.stopPropagation();
        };

        MdcCheckbox.prototype.isCheckedChanged = function isCheckedChanged(newValue) {
            this.isIndeterminate = false;
            var event = new CustomEvent('change', {
                bubbles: true,
                detail: {
                    value: newValue
                }
            });
            this.element.dispatchEvent(event);
        };

        MdcCheckbox.prototype.isDisabledChanged = function isDisabledChanged(newValue) {
            this.mdcCheckbox.disabled = !!newValue;
        };

        MdcCheckbox.prototype.isIndeterminateChanged = function isIndeterminateChanged(newValue) {
            this.mdcCheckbox.indeterminate = !!newValue;
        };

        return MdcCheckbox;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'isChecked', [_dec3], {
        enumerable: true,
        initializer: function initializer() {
            return false;
        }
    }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'isIndeterminate', [_dec4], {
        enumerable: true,
        initializer: function initializer() {
            return false;
        }
    }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'isDisabled', [_dec5], {
        enumerable: true,
        initializer: function initializer() {
            return false;
        }
    })), _class2)) || _class) || _class);
});