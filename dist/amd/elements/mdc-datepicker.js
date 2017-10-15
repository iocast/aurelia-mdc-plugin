define(['exports', 'aurelia-framework', 'material-components-web'], function (exports, _aureliaFramework, _materialComponentsWeb) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.MdcDatepicker = undefined;

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

    var _dec, _dec2, _dec3, _dec4, _class, _desc, _value, _class2, _descriptor, _descriptor2;

    var MdcDatepicker = exports.MdcDatepicker = (_dec = (0, _aureliaFramework.customElement)('mdc-datepicker'), _dec2 = (0, _aureliaFramework.inject)(_aureliaFramework.DOM.Element), _dec3 = (0, _aureliaFramework.bindable)({
        attribute: 'locale',
        defaultBindingMode: _aureliaFramework.bindingMode.twoWay,
        defaultValue: 'en'
    }), _dec4 = (0, _aureliaFramework.bindable)({
        attribute: 'start-week-on',
        defaultBindingMode: _aureliaFramework.bindingMode.twoWay,
        defaultValue: 'sunday'
    }), _dec(_class = _dec2(_class = (_class2 = function () {
        function MdcDatepicker(element) {
            _classCallCheck(this, MdcDatepicker);

            _initDefineProp(this, 'locale', _descriptor, this);

            _initDefineProp(this, 'startWeekOn', _descriptor2, this);

            this.element = element;
        }

        MdcDatepicker.prototype.attached = function attached() {
            this.mdcDatepickerDialog = new _materialComponentsWeb.dialog.MDCDialog(this.datepickerDialog);
            this.shiftLeft = 0;
            if (this.startWeekOn === 'monday') {
                this.shiftLeft = 1;
            } else if (this.startWeekOn === 'tuesday') {
                this.shiftLeft = 2;
            } else if (this.startWeekOn === 'wednesday') {
                this.shiftLeft = 3;
            } else if (this.startWeekOn === 'thursday') {
                this.shiftLeft = 4;
            } else if (this.startWeekOn === 'friday') {
                this.shiftLeft = 5;
            } else if (this.startWeekOn === 'saturday') {
                this.shiftLeft = 6;
            }

            this.weekdays = this.getWeekdays(this.locale, {
                shiftLeft: this.shiftLeft
            });
            this.selected = this.format(new Date(), this.locale);

            this.modelA = this.format(new Date(), this.locale);
            this.modelA.matrix = this.matrix(this.modelA.year, this.modelA.month, {
                empty: true,
                shiftLeft: this.shiftLeft
            });
            this.modelA.matrixFlat = this.flatten(this.modelA.matrix);
            this.modelA.position = "current";

            this.modelB = this.format(new Date(Date.UTC(this.modelA.date.getFullYear(), this.modelA.date.getMonth() - 1, 1)), this.locale);
            this.modelB.matrix = this.matrix(this.modelB.year, this.modelB.month, {
                empty: true,
                shiftLeft: this.shiftLeft
            });
            this.modelB.matrixFlat = this.flatten(this.modelB.matrix);
            this.modelB.position = "previous";

            this.modelC = this.format(new Date(Date.UTC(this.modelA.date.getFullYear(), this.modelA.date.getMonth() + 1, 1)), this.locale);
            this.modelC.matrix = this.matrix(this.modelC.year, this.modelC.month, {
                empty: true,
                shiftLeft: this.shiftLeft
            });
            this.modelC.matrixFlat = this.flatten(this.modelC.matrix);
            this.modelC.position = "next";
        };

        MdcDatepicker.prototype.next = function next() {
            this.modelA = this.getNextPosition(this.modelA);
            this.modelB = this.getNextPosition(this.modelB);
            this.modelC = this.getNextPosition(this.modelC);
        };

        MdcDatepicker.prototype.previous = function previous() {
            this.modelA = this.getPreviousPosition(this.modelA);
            this.modelB = this.getPreviousPosition(this.modelB);
            this.modelC = this.getPreviousPosition(this.modelC);
        };

        MdcDatepicker.prototype.getNextPosition = function getNextPosition(model) {
            if (model.position.includes('previous')) {
                model = this.format(new Date(Date.UTC(model.date.getFullYear(), model.date.getMonth() + 3, 1)), this.locale);
                model.matrix = this.matrix(model.year, model.month, {
                    empty: true,
                    shiftLeft: this.shiftLeft
                });
                model.matrixFlat = this.flatten(model.matrix);
                model.position = "next hidden";
                return model;
            } else if (model.position.includes('current')) {
                model.position = "previous";
                return model;
            } else if (model.position.includes('next')) {
                model.position = "current";
                return model;
            }
        };

        MdcDatepicker.prototype.getPreviousPosition = function getPreviousPosition(model) {
            if (model.position.includes('previous')) {
                model.position = "current";
                return model;
            } else if (model.position.includes('current')) {
                model.position = "next";
                return model;
            } else if (model.position.includes('next')) {
                model = this.format(new Date(Date.UTC(model.date.getFullYear(), model.date.getMonth() - 3, 1)), this.locale);
                model.matrix = this.matrix(model.year, model.month, {
                    empty: true,
                    shiftLeft: this.shiftLeft
                });
                model.matrixFlat = this.flatten(model.matrix);
                model.position = "previous hidden";
                return model;
            }
        };

        MdcDatepicker.prototype.show = function show() {

            console.log(this);

            this.mdcDatepickerDialog.show();
        };

        MdcDatepicker.prototype.cancel = function cancel() {
            this.mdcDatepickerDialog.close();
        };

        MdcDatepicker.prototype.ok = function ok() {
            this.mdcDatepickerDialog.close();
        };

        MdcDatepicker.prototype.format = function format(date, locale) {
            locale = locale ? locale : 'en';

            var formatted = {
                date: date,
                year: '',
                month: '',
                monthNarrow: '',
                monthShort: '',
                monthLong: '',
                day: '',
                weekdayLong: '',
                weekdayNarrow: '',
                weekdayShort: ''
            };

            for (var _iterator = new Intl.DateTimeFormat(locale, {
                weekday: 'long',

                year: 'numeric',
                month: 'numeric',
                day: 'numeric'
            }).formatToParts(date), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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
                    formatted.year = value.value;
                } else if (value.type === 'month') {
                    formatted.month = value.value;
                } else if (value.type === 'day') {
                    formatted.day = value.value;
                } else if (value.type === 'weekday') {
                    formatted.weekdayLong = value.value;
                }
            }

            for (var _iterator2 = new Intl.DateTimeFormat(locale, {
                weekday: 'narrow',
                month: 'narrow'
            }).formatToParts(date), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
                var _ref2;

                if (_isArray2) {
                    if (_i2 >= _iterator2.length) break;
                    _ref2 = _iterator2[_i2++];
                } else {
                    _i2 = _iterator2.next();
                    if (_i2.done) break;
                    _ref2 = _i2.value;
                }

                var _value2 = _ref2;

                if (_value2.type === 'month') {
                    formatted.monthNarrow = _value2.value;
                } else if (_value2.type === 'weekday') {
                    formatted.weekdayNarrow = _value2.value;
                }
            }

            for (var _iterator3 = new Intl.DateTimeFormat(locale, {
                weekday: 'short',
                month: 'short'
            }).formatToParts(date), _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
                var _ref3;

                if (_isArray3) {
                    if (_i3 >= _iterator3.length) break;
                    _ref3 = _iterator3[_i3++];
                } else {
                    _i3 = _iterator3.next();
                    if (_i3.done) break;
                    _ref3 = _i3.value;
                }

                var _value3 = _ref3;

                if (_value3.type === 'month') {
                    formatted.monthShort = _value3.value;
                } else if (_value3.type === 'weekday') {
                    formatted.weekdayShort = _value3.value;
                }
            }

            for (var _iterator4 = new Intl.DateTimeFormat(locale, {
                month: 'long'
            }).formatToParts(date), _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
                var _ref4;

                if (_isArray4) {
                    if (_i4 >= _iterator4.length) break;
                    _ref4 = _iterator4[_i4++];
                } else {
                    _i4 = _iterator4.next();
                    if (_i4.done) break;
                    _ref4 = _i4.value;
                }

                var _value4 = _ref4;

                if (_value4.type === 'month') {
                    formatted.monthLong = _value4.value;
                }
            }

            return formatted;
        };

        MdcDatepicker.prototype.getWeekdays = function getWeekdays(locale, options) {
            locale = locale ? locale : 'en';

            var date = new Date();
            date.setUTCDate(date.getUTCDate() - date.getUTCDay() - 1);
            var weekdays = Array(7).fill().map(function (i) {
                date.setUTCDate(date.getUTCDate() + 1);
                return Intl.DateTimeFormat(locale, {
                    weekday: 'narrow'
                }).format(date);
            });

            if ("shiftLeft" in options && options.shiftLeft > 0) {
                weekdays = weekdays.concat(weekdays.splice(0, options.shiftLeft));
            }

            return weekdays;
        };

        MdcDatepicker.prototype.matrix = function matrix(year, month, options) {
            var matrix = [];

            var startDate = new Date(Date.UTC(year, month - 1, 1));
            var endDate = new Date(Date.UTC(year, month, 0));

            var matrixStartDate = new Date(Date.UTC(year, month - 1, 1));
            var matrixEndDate = new Date(Date.UTC(year, month, 0));

            var shiftLeft = 0;
            if ("shiftLeft" in options && options.shiftLeft > 0) {
                shiftLeft = options.shiftLeft;
            }

            matrixStartDate.setUTCDate(startDate.getUTCDate() - this.mod(startDate.getUTCDay() - shiftLeft, 7));
            matrixEndDate.setUTCDate(endDate.getUTCDate() + (6 - this.mod(endDate.getUTCDay() - shiftLeft, 7)));

            var currentDate = matrixStartDate;
            var counter = 0;
            var week = [];

            while (currentDate <= matrixEndDate) {
                if (counter > 6) {
                    matrix.push(week);
                    counter = 0;
                    week = [];
                }

                if (options.empty && (currentDate < startDate || currentDate > endDate)) {
                    week.push("");
                } else {
                    week.push(currentDate.getDate());
                }

                counter++;
                currentDate.setUTCDate(currentDate.getUTCDate() + 1);
            }

            matrix.push(week);

            return matrix;
        };

        MdcDatepicker.prototype.flatten = function flatten(matrix) {
            var _ref5;

            return (_ref5 = []).concat.apply(_ref5, matrix);
        };

        MdcDatepicker.prototype.mod = function mod(a, n) {
            return a - n * Math.floor(a / n);
        };

        return MdcDatepicker;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'locale', [_dec3], {
        enumerable: true,
        initializer: null
    }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'startWeekOn', [_dec4], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class) || _class);
});