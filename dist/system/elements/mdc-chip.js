'use strict';

System.register(['aurelia-framework'], function (_export, _context) {
    "use strict";

    var inject, DOM, customElement, bindable, computedFrom, _createClass, _dec, _dec2, _dec3, _dec4, _dec5, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, MdcChip;

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

    return {
        setters: [function (_aureliaFramework) {
            inject = _aureliaFramework.inject;
            DOM = _aureliaFramework.DOM;
            customElement = _aureliaFramework.customElement;
            bindable = _aureliaFramework.bindable;
            computedFrom = _aureliaFramework.computedFrom;
        }],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            _export('MdcChip', MdcChip = (_dec = customElement('mdc-chip'), _dec2 = inject(DOM.Element), _dec3 = bindable({
                defaultValue: false
            }), _dec4 = bindable({
                defaultValue: false
            }), _dec5 = computedFrom('remove'), _dec(_class = _dec2(_class = (_class2 = function () {
                function MdcChip(element) {
                    _classCallCheck(this, MdcChip);

                    _initDefineProp(this, 'remove', _descriptor, this);

                    _initDefineProp(this, 'hover', _descriptor2, this);

                    _initDefineProp(this, 'raised', _descriptor3, this);

                    this.element = element;
                }

                MdcChip.prototype.handleRemove = function handleRemove(event) {
                    this.remove(event);
                    this.element.au.controller.view.removeNodes();
                    this.element.au.controller.unbind();
                };

                _createClass(MdcChip, [{
                    key: 'hasRemoveButton',
                    get: function get() {
                        if ('remove' in this && typeof this.remove === 'function') {
                            return true;
                        }
                        return false;
                    }
                }]);

                return MdcChip;
            }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'remove', [bindable], {
                enumerable: true,
                initializer: null
            }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'hover', [_dec3], {
                enumerable: true,
                initializer: null
            }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'raised', [_dec4], {
                enumerable: true,
                initializer: null
            }), _applyDecoratedDescriptor(_class2.prototype, 'hasRemoveButton', [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, 'hasRemoveButton'), _class2.prototype)), _class2)) || _class) || _class));

            _export('MdcChip', MdcChip);
        }
    };
});