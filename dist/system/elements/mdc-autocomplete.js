'use strict';

System.register(['aurelia-framework', 'material-components-web'], function (_export, _context) {
    "use strict";

    var inject, bindable, bindingMode, DOM, customElement, computedFrom, textField, _createClass, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, MdcAutocomplete;

    function _asyncToGenerator(fn) {
        return function () {
            var gen = fn.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                function step(key, arg) {
                    try {
                        var info = gen[key](arg);
                        var value = info.value;
                    } catch (error) {
                        reject(error);
                        return;
                    }

                    if (info.done) {
                        resolve(value);
                    } else {
                        return Promise.resolve(value).then(function (value) {
                            step("next", value);
                        }, function (err) {
                            step("throw", err);
                        });
                    }
                }

                return step("next");
            });
        };
    }

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
            bindable = _aureliaFramework.bindable;
            bindingMode = _aureliaFramework.bindingMode;
            DOM = _aureliaFramework.DOM;
            customElement = _aureliaFramework.customElement;
            computedFrom = _aureliaFramework.computedFrom;
        }, function (_materialComponentsWeb) {
            textField = _materialComponentsWeb.textField;
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

            _export('MdcAutocomplete', MdcAutocomplete = (_dec = customElement('mdc-autocomplete'), _dec2 = inject(DOM.Element), _dec3 = bindable({
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
            }), _dec7 = computedFrom('_value'), _dec(_class = _dec2(_class = (_class2 = function () {
                function MdcAutocomplete(element) {
                    _classCallCheck(this, MdcAutocomplete);

                    _initDefineProp(this, 'lookup', _descriptor, this);

                    _initDefineProp(this, 'renderItem', _descriptor2, this);

                    _initDefineProp(this, 'select', _descriptor3, this);

                    _initDefineProp(this, '_value', _descriptor4, this);

                    this.listItems = [];
                    this.selectionEvent = false;

                    this.element = element;
                }

                MdcAutocomplete.prototype.attached = function attached() {
                    var _this = this;

                    this.mdcValueDOM = new textField.MDCTextField(this.valueDOM);

                    this.element.setValue = function (value) {
                        _this.setValue(value);
                    };
                };

                MdcAutocomplete.prototype.valueChangeHandler = function () {
                    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(newValue, oldValue) {
                        return regeneratorRuntime.wrap(function _callee$(_context2) {
                            while (1) {
                                switch (_context2.prev = _context2.next) {
                                    case 0:
                                        if (!(!this.simpleMenuDOM || this.selectionEvent)) {
                                            _context2.next = 3;
                                            break;
                                        }

                                        this.selectionEvent = false;
                                        return _context2.abrupt('return');

                                    case 3:
                                        _context2.next = 5;
                                        return this.lookup({ newValue: newValue, oldValue: oldValue });

                                    case 5:
                                        this.listItems = _context2.sent;


                                        if (this.listItems && this.listItems.length > 0) {
                                            this.simpleMenuDOM.classList.add('mdc-simple-menu--open');
                                            this.simpleMenuDOM.style.transform = 'scale(1, 1)';
                                        } else {
                                            this.simpleMenuDOM.classList.remove('mdc-simple-menu--open');
                                            this.simpleMenuDOM.style.transform = 'scale(0, 0)';
                                        }

                                    case 7:
                                    case 'end':
                                        return _context2.stop();
                                }
                            }
                        }, _callee, this);
                    }));

                    function valueChangeHandler(_x, _x2) {
                        return _ref.apply(this, arguments);
                    }

                    return valueChangeHandler;
                }();

                MdcAutocomplete.prototype.renderListItem = function renderListItem(value) {
                    return this.renderItem({ item: value });
                };

                MdcAutocomplete.prototype.selectItem = function () {
                    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(value) {
                        return regeneratorRuntime.wrap(function _callee2$(_context3) {
                            while (1) {
                                switch (_context3.prev = _context3.next) {
                                    case 0:
                                        this.selectionEvent = true;
                                        this._value = this.renderItem({ item: value });
                                        this.simpleMenuDOM.classList.remove('mdc-simple-menu--open');
                                        this.simpleMenuDOM.style.transform = 'scale(0, 0)';

                                        this.select({ item: value });

                                    case 5:
                                    case 'end':
                                        return _context3.stop();
                                }
                            }
                        }, _callee2, this);
                    }));

                    function selectItem(_x3) {
                        return _ref2.apply(this, arguments);
                    }

                    return selectItem;
                }();

                MdcAutocomplete.prototype.setValue = function setValue(value) {
                    this.selectionEvent = true;
                    this._value = value;
                    this.mdcValueDOM.getDefaultFoundation().adapter_.removeClassFromLabel('mdc-textfield__label--float-above');

                    if (this._value) {
                        this.mdcValueDOM.getDefaultFoundation().adapter_.addClassToLabel('mdc-textfield__label--float-above');
                    }
                };

                _createClass(MdcAutocomplete, [{
                    key: 'value',
                    get: function get() {
                        return this._value;
                    },
                    set: function set(value) {
                        this._value = value;
                    }
                }]);

                return MdcAutocomplete;
            }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'lookup', [_dec3], {
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
            }), _applyDecoratedDescriptor(_class2.prototype, 'value', [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, 'value'), _class2.prototype)), _class2)) || _class) || _class));

            _export('MdcAutocomplete', MdcAutocomplete);
        }
    };
});