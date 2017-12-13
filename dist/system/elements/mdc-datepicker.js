'use strict';

System.register(['aurelia-framework', 'material-components-web'], function (_export, _context) {
    "use strict";

    var inject, bindable, bindingMode, computedFrom, DOM, customElement, dialog, textField, _createClass, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _dec7, _dec8, _dec9, _desc2, _value2, _class4, MdcDatepicker, DatepickerDate;

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
            computedFrom = _aureliaFramework.computedFrom;
            DOM = _aureliaFramework.DOM;
            customElement = _aureliaFramework.customElement;
        }, function (_materialComponentsWeb) {
            dialog = _materialComponentsWeb.dialog;
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

            _export('MdcDatepicker', MdcDatepicker = (_dec = customElement('mdc-datepicker'), _dec2 = inject(DOM.Element), _dec3 = bindable({
                attribute: 'locale',
                defaultBindingMode: bindingMode.twoWay,
                changeHandler: 'localeChangeHandler',
                defaultValue: 'en'
            }), _dec4 = bindable({
                attribute: 'start-week-on',
                defaultBindingMode: bindingMode.twoWay,
                defaultValue: 'sunday'
            }), _dec5 = bindable({
                attribute: 'value',
                defaultBindingMode: bindingMode.twoWay,
                changeHandler: 'valueChangeHandler'
            }), _dec6 = computedFrom('_value'), _dec(_class = _dec2(_class = (_class2 = function () {
                function MdcDatepicker(element) {
                    _classCallCheck(this, MdcDatepicker);

                    _initDefineProp(this, 'locale', _descriptor, this);

                    _initDefineProp(this, 'startWeekOn', _descriptor2, this);

                    _initDefineProp(this, '_value', _descriptor3, this);

                    this.animating = false;

                    this.element = element;
                }

                MdcDatepicker.prototype.attached = function attached() {
                    var _this = this;

                    this.mdcDatepickerDialog = new dialog.MDCDialog(this.datepickerDialog);
                    this.mdcValueDOM = new textField.MDCTextField(this.valueDOM);

                    var shift = 0;
                    if (this.startWeekOn === 'monday') {
                        shift = 1;
                    } else if (this.startWeekOn === 'tuesday') {
                        shift = 2;
                    } else if (this.startWeekOn === 'wednesday') {
                        shift = 3;
                    } else if (this.startWeekOn === 'thursday') {
                        shift = 4;
                    } else if (this.startWeekOn === 'friday') {
                        shift = 5;
                    } else if (this.startWeekOn === 'saturday') {
                        shift = 6;
                    }

                    this.selected = new DatepickerDate(this._value ? this._value : new Date(), this.locale, shift);

                    this.slideA = new DatepickerDate(new Date(), this.locale, shift, 'current', this.selected);
                    this.slideB = new DatepickerDate(new Date(Date.UTC(this.slideA.date.getFullYear(), this.slideA.date.getMonth() - 1, 1)), this.locale, shift, 'previous', this.selected);
                    this.slideC = new DatepickerDate(new Date(Date.UTC(this.slideA.date.getFullYear(), this.slideA.date.getMonth() + 1, 1)), this.locale, shift, 'next', this.selected);

                    this.slideA.calculateCalendar({
                        empty: true
                    });
                    this.slideB.calculateCalendar({
                        empty: true
                    });
                    this.slideC.calculateCalendar({
                        empty: true
                    });

                    this.trackDOM.addEventListener('transitionend', function (event) {
                        _this.animating = false;
                    }, false);
                };

                MdcDatepicker.prototype.localeChangeHandler = function localeChangeHandler(newValue, oldValue) {
                    if (this.selected) {
                        this.selected.refresh(newValue);
                        this.mdcValueDOM.getDefaultFoundation().adapter_.getNativeInput().value = this.value;
                        this.mdcValueDOM.getDefaultFoundation().adapter_.getNativeInput().dispatchEvent(new Event('change', {
                            bubbles: true
                        }));
                    }
                };

                MdcDatepicker.prototype.valueChangeHandler = function valueChangeHandler(newValue, oldValue) {
                    this._value = newValue;

                    if (this.mdcValueDOM) {
                        this.mdcValueDOM.getDefaultFoundation().adapter_.removeClassFromLabel('mdc-textfield__label--float-above');
                        if (newValue instanceof Date) {
                            this.mdcValueDOM.getDefaultFoundation().adapter_.addClassToLabel('mdc-textfield__label--float-above');
                        }
                    }
                };

                MdcDatepicker.prototype.next = function next() {
                    if (this.animating) return;

                    this.animating = true;

                    this.slideA = this.getNextPosition(this.slideA);
                    this.slideB = this.getNextPosition(this.slideB);
                    this.slideC = this.getNextPosition(this.slideC);
                };

                MdcDatepicker.prototype.previous = function previous() {
                    if (this.animating) return;

                    this.animating = true;

                    this.slideA = this.getPreviousPosition(this.slideA);
                    this.slideB = this.getPreviousPosition(this.slideB);
                    this.slideC = this.getPreviousPosition(this.slideC);
                };

                MdcDatepicker.prototype.getNextPosition = function getNextPosition(model) {
                    if (model.position === 'previous') {
                        model.date = new Date(Date.UTC(model.date.getFullYear(), model.date.getMonth() + 3, 1));
                        model.position = 'next';
                        return model;
                    } else if (model.position === 'current') {
                        model.position = 'previous';
                        return model;
                    } else if (model.position === 'next') {
                        model.position = 'current';
                        return model;
                    }
                };

                MdcDatepicker.prototype.getPreviousPosition = function getPreviousPosition(model) {
                    if (model.position === 'previous') {
                        model.position = 'current';
                        return model;
                    } else if (model.position === 'current') {
                        model.position = 'next';
                        return model;
                    } else if (model.position === 'next') {
                        model.date = new Date(Date.UTC(model.date.getFullYear(), model.date.getMonth() - 3, 1));
                        model.position = 'previous';
                        return model;
                    }
                };

                MdcDatepicker.prototype.show = function show(evt) {
                    this.selected.locale = this.locale;
                    this.selected.date = this._value ? this._value : new Date();

                    this.slideA.refresh(this.locale);
                    this.slideB.refresh(this.locale);
                    this.slideC.refresh(this.locale);

                    this.mdcDatepickerDialog.show();
                };

                MdcDatepicker.prototype.cancel = function cancel(evt) {
                    evt.preventDefault();
                    evt.stopPropagation();
                    this.value = this.selected.originalDate;
                    this.mdcDatepickerDialog.close();
                };

                MdcDatepicker.prototype.ok = function ok(evt) {
                    evt.preventDefault();
                    evt.stopPropagation();
                    this.value = this.selected.date;
                    this.mdcDatepickerDialog.close();
                };

                _createClass(MdcDatepicker, [{
                    key: 'value',
                    get: function get() {
                        if (this._value) {
                            return this._value.toLocaleDateString(this.locale, {
                                weekday: 'short',
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                            });
                        }
                        return '';
                    },
                    set: function set(value) {
                        this._value = value;
                    }
                }]);

                return MdcDatepicker;
            }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'locale', [_dec3], {
                enumerable: true,
                initializer: null
            }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'startWeekOn', [_dec4], {
                enumerable: true,
                initializer: null
            }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, '_value', [_dec5], {
                enumerable: true,
                initializer: null
            }), _applyDecoratedDescriptor(_class2.prototype, 'value', [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, 'value'), _class2.prototype)), _class2)) || _class) || _class));

            _export('MdcDatepicker', MdcDatepicker);

            DatepickerDate = (_dec7 = computedFrom('_date'), _dec8 = computedFrom('_position'), _dec9 = computedFrom('_locale'), (_class4 = function () {
                function DatepickerDate(date, locale, shift, position, selected) {
                    _classCallCheck(this, DatepickerDate);

                    this.weekdays = [];
                    this.matrix = [];
                    this.matrixFlat = [];
                    this.matrixOptions = {
                        empty: false
                    };
                    this._position = '';
                    this.styleClasses = '';

                    this.locale = locale ? locale : 'en';
                    this.shift = shift ? shift : 0;
                    this.position = position;
                    this._origDate = date;
                    this.date = new Date(date.getTime());
                    this.selected = selected;
                }

                DatepickerDate.prototype.setDate = function setDate(year, month, day) {
                    this._date.setFullYear(year);
                    this._date.setMonth(month);
                    this._date.setDate(day);

                    this.refresh(this.locale, this.shift, this.position);
                };

                DatepickerDate.prototype.select = function select(day) {
                    if (this.selected) {
                        this.selected.setDate(this.date.getFullYear(), this.date.getMonth(), day);
                    }
                };

                DatepickerDate.prototype.calculateCalendar = function calculateCalendar(options) {
                    this.matrixOptions = options;
                    this._weekdays();
                    this._matrix();
                    this._flatten();
                };

                DatepickerDate.prototype.refresh = function refresh(locale, shift, position) {
                    this.locale = locale ? locale : this.locale;
                    this.shift = shift ? shift : this.shift;
                    this.position = position ? position : this.position;

                    this._format();

                    if (this.matrix.length > 0) {
                        this.calculateCalendar(this.matrixOptions);
                    }
                };

                DatepickerDate.prototype._calculateStyles = function _calculateStyles(newPosition) {
                    if (!this.position) {
                        if (newPosition === 'previous') {
                            this.styleClasses = 'previous';
                        } else if (newPosition === 'current') {
                            this.styleClasses = 'current';
                        } else if (newPosition === 'next') {
                            this.styleClasses = 'next';
                        }
                        return;
                    }

                    if (this.position === 'previous' && newPosition === 'next') {
                        this.styleClasses = 'next hidden';
                    } else if (this.position === 'current' && newPosition === 'previous') {
                        this.styleClasses = 'previous';
                    } else if (this.position === 'next' && newPosition === 'current') {
                        this.styleClasses = 'current';
                    } else if (this.position === 'previous' && newPosition === 'current') {
                        this.styleClasses = 'current';
                    } else if (this.position === 'current' && newPosition === 'next') {
                        this.styleClasses = 'next';
                    } else if (this.position === 'next' && newPosition === 'previous') {
                        this.styleClasses = 'previous hidden';
                    }
                };

                DatepickerDate.prototype._format = function _format() {
                    for (var _iterator = new Intl.DateTimeFormat(this.locale, {
                        weekday: 'long',

                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric'
                    }).formatToParts(this.date), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                        var _ref;

                        if (_isArray) {
                            if (_i >= _iterator.length) break;
                            _ref = _iterator[_i++];
                        } else {
                            _i = _iterator.next();
                            if (_i.done) break;
                            _ref = _i.value;
                        }

                        var value = _ref;

                        if (value.type === 'year') {
                            this.year = parseInt(value.value, 10);
                        } else if (value.type === 'month') {
                            this.month = parseInt(value.value, 10);
                        } else if (value.type === 'day') {
                            this.day = parseInt(value.value, 10);
                        } else if (value.type === 'weekday') {
                            this.weekdayLong = value.value;
                        }
                    }

                    for (var _iterator2 = new Intl.DateTimeFormat(this.locale, {
                        weekday: 'narrow',
                        month: 'narrow'
                    }).formatToParts(this.date), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
                        var _ref2;

                        if (_isArray2) {
                            if (_i2 >= _iterator2.length) break;
                            _ref2 = _iterator2[_i2++];
                        } else {
                            _i2 = _iterator2.next();
                            if (_i2.done) break;
                            _ref2 = _i2.value;
                        }

                        var _value3 = _ref2;

                        if (_value3.type === 'month') {
                            this.monthNarrow = _value3.value;
                        } else if (_value3.type === 'weekday') {
                            this.weekdayNarrow = _value3.value;
                        }
                    }

                    for (var _iterator3 = new Intl.DateTimeFormat(this.locale, {
                        weekday: 'short',
                        month: 'short'
                    }).formatToParts(this.date), _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
                        var _ref3;

                        if (_isArray3) {
                            if (_i3 >= _iterator3.length) break;
                            _ref3 = _iterator3[_i3++];
                        } else {
                            _i3 = _iterator3.next();
                            if (_i3.done) break;
                            _ref3 = _i3.value;
                        }

                        var _value4 = _ref3;

                        if (_value4.type === 'month') {
                            this.monthShort = _value4.value;
                        } else if (_value4.type === 'weekday') {
                            this.weekdayShort = _value4.value;
                        }
                    }

                    for (var _iterator4 = new Intl.DateTimeFormat(this.locale, {
                        month: 'long'
                    }).formatToParts(this.date), _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
                        var _ref4;

                        if (_isArray4) {
                            if (_i4 >= _iterator4.length) break;
                            _ref4 = _iterator4[_i4++];
                        } else {
                            _i4 = _iterator4.next();
                            if (_i4.done) break;
                            _ref4 = _i4.value;
                        }

                        var _value5 = _ref4;

                        if (_value5.type === 'month') {
                            this.monthLong = _value5.value;
                        }
                    }

                    return this;
                };

                DatepickerDate.prototype._matrix = function _matrix() {
                    this.matrix = [];

                    var startDate = new Date(Date.UTC(this.year, this.month - 1, 1));
                    var endDate = new Date(Date.UTC(this.year, this.month, 0));

                    var matrixStartDate = new Date(Date.UTC(this.year, this.month - 1, 1));
                    var matrixEndDate = new Date(Date.UTC(this.year, this.month, 0));

                    matrixStartDate.setUTCDate(startDate.getUTCDate() - this._mod(startDate.getUTCDay() - this.shift, 7));
                    matrixEndDate.setUTCDate(endDate.getUTCDate() + (6 - this._mod(endDate.getUTCDay() - this.shift, 7)));

                    var currentDate = matrixStartDate;
                    var counter = 0;
                    var week = [];

                    while (currentDate <= matrixEndDate) {
                        if (counter > 6) {
                            this.matrix.push(week);
                            counter = 0;
                            week = [];
                        }

                        if (this.matrixOptions.empty && (currentDate < startDate || currentDate > endDate)) {
                            week.push('');
                        } else {
                            week.push(currentDate.getDate());
                        }

                        counter++;
                        currentDate.setUTCDate(currentDate.getUTCDate() + 1);
                    }

                    this.matrix.push(week);
                };

                DatepickerDate.prototype._flatten = function _flatten() {
                    var _ref5;

                    this.matrixFlat = (_ref5 = []).concat.apply(_ref5, this.matrix);
                };

                DatepickerDate.prototype._weekdays = function _weekdays() {
                    var _this2 = this;

                    var date = new Date();
                    date.setUTCDate(date.getUTCDate() - date.getUTCDay() - 1);
                    this.weekdays = Array(7).fill().map(function (i) {
                        date.setUTCDate(date.getUTCDate() + 1);
                        return new Intl.DateTimeFormat(_this2.locale, {
                            weekday: 'narrow'
                        }).format(date);
                    });

                    if (this.shift > 0) {
                        this.weekdays = this.weekdays.concat(this.weekdays.splice(0, this.shift));
                    }
                };

                DatepickerDate.prototype._mod = function _mod(a, n) {
                    return a - n * Math.floor(a / n);
                };

                DatepickerDate.prototype.mod = function mod(num, _mod2) {
                    return (num % _mod2 + _mod2) % _mod2;
                };

                _createClass(DatepickerDate, [{
                    key: 'date',
                    get: function get() {
                        this._date.setUTCHours(this.originalDate.getUTCHours());
                        this._date.setUTCMinutes(this.originalDate.getUTCMinutes());
                        this._date.setUTCSeconds(this.originalDate.getUTCSeconds());
                        this._date.setUTCMilliseconds(this.originalDate.getUTCMilliseconds());
                        return this._date;
                    },
                    set: function set(value) {
                        this._origDate = value;
                        this._date = new Date(value.getTime());
                        this.refresh(this.locale, this.shift, this.position);
                    }
                }, {
                    key: 'originalDate',
                    get: function get() {
                        return this._origDate;
                    }
                }, {
                    key: 'position',
                    get: function get() {
                        return this._position;
                    },
                    set: function set(value) {
                        this._calculateStyles(value);
                        this._position = value;
                    }
                }, {
                    key: 'locale',
                    get: function get() {
                        return this._locale;
                    },
                    set: function set(value) {
                        this._locale = value;
                    }
                }]);

                return DatepickerDate;
            }(), (_applyDecoratedDescriptor(_class4.prototype, 'date', [_dec7], Object.getOwnPropertyDescriptor(_class4.prototype, 'date'), _class4.prototype), _applyDecoratedDescriptor(_class4.prototype, 'position', [_dec8], Object.getOwnPropertyDescriptor(_class4.prototype, 'position'), _class4.prototype), _applyDecoratedDescriptor(_class4.prototype, 'locale', [_dec9], Object.getOwnPropertyDescriptor(_class4.prototype, 'locale'), _class4.prototype)), _class4));
        }
    };
});