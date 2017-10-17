define(['exports', 'aurelia-framework', 'material-components-web'], function (exports, _aureliaFramework, _materialComponentsWeb) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.MdcTimepicker = undefined;

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

    var _createClass = function () {
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

    var _dec, _dec2, _dec3, _dec4, _dec5, _class, _desc, _value, _class2, _descriptor, _descriptor2, _dec6, _dec7, _desc2, _value2, _class4;

    var MdcTimepicker = exports.MdcTimepicker = (_dec = (0, _aureliaFramework.customElement)('mdc-timepicker'), _dec2 = (0, _aureliaFramework.inject)(_aureliaFramework.DOM.Element), _dec3 = (0, _aureliaFramework.bindable)({
        attribute: 'locale',
        defaultBindingMode: _aureliaFramework.bindingMode.twoWay,
        changeHandler: 'localeChangeHandler',
        defaultValue: 'en'
    }), _dec4 = (0, _aureliaFramework.bindable)({
        attribute: 'value',
        defaultBindingMode: _aureliaFramework.bindingMode.twoWay
    }), _dec5 = (0, _aureliaFramework.computedFrom)("_value"), _dec(_class = _dec2(_class = (_class2 = function () {
        function MdcTimepicker(element) {
            _classCallCheck(this, MdcTimepicker);

            _initDefineProp(this, 'locale', _descriptor, this);

            _initDefineProp(this, '_value', _descriptor2, this);

            this.animating = false;

            this.element = element;
        }

        MdcTimepicker.prototype.attached = function attached() {
            this.mdcTimepickerDialog = new _materialComponentsWeb.dialog.MDCDialog(this.timepickerDialog);

            this.selected = new TimepickerTime(this._value ? this._value : new Date(), this.locale);
        };

        MdcTimepicker.prototype.localeChangeHandler = function localeChangeHandler(newValue, oldValue) {
            if (this.selected) {
                this.selected.refresh(newValue);
                this.valueDOM.value = this.value;
                this.valueDOM.dispatchEvent(new Event('change', {
                    bubbles: true
                }));
            }
        };

        MdcTimepicker.prototype.selectMinutes = function selectMinutes(minutes) {
            this.selected.selectMinutes(minutes);
        };

        MdcTimepicker.prototype.selectHours = function selectHours(hours) {
            this.selected.selectHours(hours);
        };

        MdcTimepicker.prototype.togglePeriod = function togglePeriod() {
            this.selected.togglePeriod();
        };

        MdcTimepicker.prototype.show = function show() {
            this.selected.locale = this.locale;
            this.selected.date = this._value ? this._value : new Date();

            this.mdcTimepickerDialog.show();
        };

        MdcTimepicker.prototype.cancel = function cancel() {
            this.value = this.selected.originalDate;
            this.mdcTimepickerDialog.close();
        };

        MdcTimepicker.prototype.ok = function ok() {
            this.value = this.selected.date;
            this.mdcTimepickerDialog.close();
        };

        _createClass(MdcTimepicker, [{
            key: 'value',
            get: function get() {
                if (this._value) {
                    return this._value.toLocaleTimeString(this.locale, {
                        hour: "numeric",
                        minute: "2-digit"
                    });
                }
                return "";
            },
            set: function set(value) {
                this._value = value;
            }
        }]);

        return MdcTimepicker;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'locale', [_dec3], {
        enumerable: true,
        initializer: null
    }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, '_value', [_dec4], {
        enumerable: true,
        initializer: null
    }), _applyDecoratedDescriptor(_class2.prototype, 'value', [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, 'value'), _class2.prototype)), _class2)) || _class) || _class);
    var TimepickerTime = (_dec6 = (0, _aureliaFramework.computedFrom)("_date"), _dec7 = (0, _aureliaFramework.computedFrom)("_locale"), (_class4 = function () {
        function TimepickerTime(date, locale) {
            _classCallCheck(this, TimepickerTime);

            this.styles = {
                needle: "",
                views: {
                    hour: "",
                    minute: ""
                }
            };

            this._origDate = date;
            this.date = new Date(date.getTime());
            this.locale = locale ? locale : 'en';
        }

        TimepickerTime.prototype.setHours = function setHours(hours) {
            this.date.setHours(hours);
            this._format();
            this._calculateStyles({
                set: true,
                hour: true
            });
        };

        TimepickerTime.prototype.setMinutes = function setMinutes(minutes) {
            this.date.setMinutes(minutes);
            this._format();
            this._calculateStyles({
                set: true,
                hour: false
            });
        };

        TimepickerTime.prototype.selectHours = function selectHours(hours) {
            this.setHours(hours);
            this._calculateStyles({
                set: false,
                hour: true
            });
        };

        TimepickerTime.prototype.selectMinutes = function selectMinutes(minutes) {
            this.setMinutes(minutes);
            this._calculateStyles({
                set: false,
                hour: false
            });
        };

        TimepickerTime.prototype.togglePeriod = function togglePeriod() {
            if (this.period.toLowerCase() === 'am') {
                this.setHours(this.date.getHours() + 12);
            } else {
                this.setHours(this.date.getHours() - 12);
            }
        };

        TimepickerTime.prototype._calculateStyles = function _calculateStyles(options) {
            if (options.hour && options.set || !options.hour && !options.set) {
                var hourPosition = parseInt(this.hour) % 12 * 5;

                this.styles.needle = 'mdc-timepicker__view-circular__cell--rotate-to-' + hourPosition;
                if (!this.period && (parseInt(this.hour) > 12 || parseInt(this.hour) === 0)) {
                    this.styles.needle += ' mdc-timepicker__view-needle__pm';
                }

                this.styles.views.hour = '';
                this.styles.views.minute = 'mdc-timepicker--hidden';
            } else {
                this.styles.needle = 'mdc-timepicker__view-circular__cell--rotate-to-' + parseInt(this.minute);

                this.styles.views.hour = 'mdc-timepicker--hidden';
                this.styles.views.minute = '';
            }
        };

        TimepickerTime.prototype.refresh = function refresh(locale) {
            this.locale = locale ? locale : this.locale;

            this._format();
        };

        TimepickerTime.prototype._format = function _format() {
            this.period = undefined;
            for (var _iterator = new Intl.DateTimeFormat(this.locale, {
                hour: "numeric",
                minute: "2-digit"
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

                if (value.type === 'hour') {
                    this.hour = value.value;
                } else if (value.type === 'minute') {
                    this.minute = value.value;
                } else if (value.type === 'dayperiod') {
                    this.period = value.value;
                }
            }
        };

        _createClass(TimepickerTime, [{
            key: 'date',
            get: function get() {
                return this._date;
            },
            set: function set(value) {
                this._origDate = value;
                this._date = new Date(value.getTime());
                this.refresh(this.locale);
                this.setHours(this.hour);
            }
        }, {
            key: 'originalDate',
            get: function get() {
                return this._origDate;
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

        return TimepickerTime;
    }(), (_applyDecoratedDescriptor(_class4.prototype, 'date', [_dec6], Object.getOwnPropertyDescriptor(_class4.prototype, 'date'), _class4.prototype), _applyDecoratedDescriptor(_class4.prototype, 'locale', [_dec7], Object.getOwnPropertyDescriptor(_class4.prototype, 'locale'), _class4.prototype)), _class4));
});