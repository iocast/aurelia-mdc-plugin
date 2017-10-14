'use strict';

System.register(['aurelia-framework', 'material-components-web'], function (_export, _context) {
    "use strict";

    var inject, bindable, bindingMode, DOM, customElement, dialog, _dec, _dec2, _class, MdcDatepicker;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_aureliaFramework) {
            inject = _aureliaFramework.inject;
            bindable = _aureliaFramework.bindable;
            bindingMode = _aureliaFramework.bindingMode;
            DOM = _aureliaFramework.DOM;
            customElement = _aureliaFramework.customElement;
        }, function (_materialComponentsWeb) {
            dialog = _materialComponentsWeb.dialog;
        }],
        execute: function () {
            _export('MdcDatepicker', MdcDatepicker = (_dec = customElement('mdc-datepicker'), _dec2 = inject(DOM.Element), _dec(_class = _dec2(_class = function () {
                function MdcDatepicker(element) {
                    _classCallCheck(this, MdcDatepicker);

                    this.today = {};

                    this.element = element;
                }

                MdcDatepicker.prototype.attached = function attached() {
                    this.mdcDatepickerDialog = new dialog.MDCDialog(this.datepickerDialog);
                };

                MdcDatepicker.prototype.show = function show() {
                    this.today = this.format(new Date());

                    this.currentMonthMatrix = this.flatten(this.matrix(this.today.year, this.today.month, {
                        empty: true
                    }));

                    this.previousMonthMatrix = this.flatten(this.matrix(this.today.year, new Date(Date.UTC(this.today.date.getYear(), this.today.date.getUTCMonth() - 1, 1)).getUTCMonth() + 1, {
                        empty: true
                    }));

                    this.nextMonthMatrix = this.flatten(this.matrix(this.today.year, new Date(Date.UTC(this.today.date.getYear(), this.today.date.getUTCMonth() + 1, 1)).getUTCMonth() + 1, {
                        empty: true
                    }));

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

                        var _value = _ref2;

                        if (_value.type === 'month') {
                            formatted.monthNarrow = _value.value;
                        } else if (_value.type === 'weekday') {
                            formatted.weekdayNarrow = _value.value;
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

                        var _value2 = _ref3;

                        if (_value2.type === 'month') {
                            formatted.monthShort = _value2.value;
                        } else if (_value2.type === 'weekday') {
                            formatted.weekdayShort = _value2.value;
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

                        var _value3 = _ref4;

                        if (_value3.type === 'month') {
                            formatted.monthLong = _value3.value;
                        }
                    }

                    return formatted;
                };

                MdcDatepicker.prototype.matrix = function matrix(year, month, options) {
                    var matrix = [];

                    var startDate = new Date(Date.UTC(year, month - 1, 1));
                    var endDate = new Date(Date.UTC(year, month, 0));

                    var matrixStartDate = new Date(Date.UTC(year, month - 1, 1));
                    var matrixEndDate = new Date(Date.UTC(year, month, 0));

                    matrixStartDate.setUTCDate(-startDate.getUTCDay() + 1);
                    matrixEndDate.setUTCDate(endDate.getUTCDate() + 6 - endDate.getUTCDay());

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

                return MdcDatepicker;
            }()) || _class) || _class));

            _export('MdcDatepicker', MdcDatepicker);
        }
    };
});