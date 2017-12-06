'use strict';

System.register(['aurelia-framework', 'material-components-web'], function (_export, _context) {
    "use strict";

    var inject, bindable, bindingMode, DOM, customElement, textField, _dec, _dec2, _dec3, _dec4, _dec5, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, MdcAutocomplete;

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
        }, function (_materialComponentsWeb) {
            textField = _materialComponentsWeb.textField;
        }],
        execute: function () {
            _export('MdcAutocomplete', MdcAutocomplete = (_dec = customElement('mdc-autocomplete'), _dec2 = inject(DOM.Element), _dec3 = bindable({
                defaultBindingMode: bindingMode.twoWay
            }), _dec4 = bindable({
                defaultBindingMode: bindingMode.twoWay
            }), _dec5 = bindable({
                attribute: 'items',
                defaultBindingMode: bindingMode.oneWay,
                changeHandler: 'itemsChanged'
            }), _dec(_class = _dec2(_class = (_class2 = function () {
                function MdcAutocomplete(element) {
                    _classCallCheck(this, MdcAutocomplete);

                    _initDefineProp(this, 'lookup', _descriptor, this);

                    _initDefineProp(this, 'select', _descriptor2, this);

                    _initDefineProp(this, 'items', _descriptor3, this);

                    this.selectionEvent = false;

                    this.element = element;
                }

                MdcAutocomplete.prototype.attached = function attached() {
                    var _this = this;

                    this.mdcValueDOM = new textField.MDCTextField(this.valueDOM);

                    this.oldValue = this.mdcValueDOM.value;

                    this.mdcValueDOM.listen('change', function (event) {});
                    this.mdcValueDOM.listen('input', function (event) {
                        _this.valueChangeHandler(event.target.value, _this.oldValue);
                        _this.oldValue = event.target.value;
                    });
                };

                MdcAutocomplete.prototype.itemsChanged = function itemsChanged() {
                    if (!this.simpleMenuDOM && !this.changed) return;
                    if (this.items && this.items.length > 0) {
                        this.simpleMenuDOM.classList.add('mdc-simple-menu--open');
                        this.simpleMenuDOM.style.transform = 'scale(1, 1)';
                    } else {
                        this.simpleMenuDOM.classList.remove('mdc-simple-menu--open');
                        this.simpleMenuDOM.style.transform = 'scale(0, 0)';
                    }
                    this.changed = false;
                };

                MdcAutocomplete.prototype.valueChangeHandler = function () {
                    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(newValue, oldValue) {
                        return regeneratorRuntime.wrap(function _callee$(_context2) {
                            while (1) {
                                switch (_context2.prev = _context2.next) {
                                    case 0:
                                        _context2.next = 2;
                                        return this.lookup({ newValue: newValue, oldValue: oldValue });

                                    case 2:
                                        this.changed = true;

                                    case 3:
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

                MdcAutocomplete.prototype.selectItem = function () {
                    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(item) {
                        var selection, _iterator, _isArray, _i, _ref3, _ref4, key, value;

                        return regeneratorRuntime.wrap(function _callee2$(_context3) {
                            while (1) {
                                switch (_context3.prev = _context3.next) {
                                    case 0:
                                        this.simpleMenuDOM.classList.remove('mdc-simple-menu--open');
                                        this.simpleMenuDOM.style.transform = 'scale(0, 0)';

                                        selection = {};
                                        _iterator = Object.entries(item), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();

                                    case 4:
                                        if (!_isArray) {
                                            _context3.next = 10;
                                            break;
                                        }

                                        if (!(_i >= _iterator.length)) {
                                            _context3.next = 7;
                                            break;
                                        }

                                        return _context3.abrupt('break', 18);

                                    case 7:
                                        _ref3 = _iterator[_i++];
                                        _context3.next = 14;
                                        break;

                                    case 10:
                                        _i = _iterator.next();

                                        if (!_i.done) {
                                            _context3.next = 13;
                                            break;
                                        }

                                        return _context3.abrupt('break', 18);

                                    case 13:
                                        _ref3 = _i.value;

                                    case 14:
                                        _ref4 = _ref3, key = _ref4[0], value = _ref4[1];

                                        selection[key] = value;

                                    case 16:
                                        _context3.next = 4;
                                        break;

                                    case 18:

                                        this.select({ item: selection });

                                    case 19:
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

                return MdcAutocomplete;
            }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'lookup', [_dec3], {
                enumerable: true,
                initializer: null
            }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'select', [_dec4], {
                enumerable: true,
                initializer: null
            }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'items', [_dec5], {
                enumerable: true,
                initializer: null
            })), _class2)) || _class) || _class));

            _export('MdcAutocomplete', MdcAutocomplete);
        }
    };
});