'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MdcTimepicker = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _desc, _value, _class2, _descriptor, _descriptor2, _dec6, _dec7, _desc2, _value2, _class5;

var _aureliaFramework = require('aurelia-framework');

var _materialComponentsWeb = require('material-components-web');

function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
        enumerable: descriptor.enumerable,
        configurable: descriptor.configurable,
        writable: descriptor.writable,
        value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

var MdcTimepicker = exports.MdcTimepicker = (_dec = (0, _aureliaFramework.customElement)('mdc-timepicker'), _dec2 = (0, _aureliaFramework.inject)(_aureliaFramework.DOM.Element), _dec3 = (0, _aureliaFramework.bindable)({
    attribute: 'locale',
    defaultBindingMode: _aureliaFramework.bindingMode.twoWay,
    changeHandler: 'localeChangeHandler',
    defaultValue: 'en'
}), _dec4 = (0, _aureliaFramework.bindable)({
    attribute: 'value',
    defaultBindingMode: _aureliaFramework.bindingMode.twoWay,
    changeHandler: 'valueChangeHandler'
}), _dec5 = (0, _aureliaFramework.computedFrom)('_value'), _dec(_class = _dec2(_class = (_class2 = function () {
    function MdcTimepicker(element) {
        _classCallCheck(this, MdcTimepicker);

        _initDefineProp(this, 'locale', _descriptor, this);

        _initDefineProp(this, '_value', _descriptor2, this);

        this.animating = false;

        this.element = element;
    }

    MdcTimepicker.prototype.attached = function attached() {
        this.mdcTimepickerDialog = new _materialComponentsWeb.dialog.MDCDialog(this.timepickerDialog);
        this.mdcValueDOM = new _materialComponentsWeb.textField.MDCTextField(this.valueDOM);

        this.selected = new TimepickerTime(this._value ? this._value : new Date(), this.locale);

        this.dragger = new TimepickerDragger(this.domCircularSurface, this.domNeedle, this.domNeedleDragger, this.selected);
    };

    MdcTimepicker.prototype.localeChangeHandler = function localeChangeHandler(newValue, oldValue) {
        if (this.selected) {
            this.selected.refresh(newValue);
            this.mdcValueDOM.getDefaultFoundation().adapter_.getNativeInput().value = this.value;
            this.mdcValueDOM.getDefaultFoundation().adapter_.getNativeInput().dispatchEvent(new Event('change', {
                bubbles: true
            }));
        }
    };

    MdcTimepicker.prototype.valueChangeHandler = function valueChangeHandler(newValue, oldValue) {
        this._value = newValue;

        if (this.mdcValueDOM) {
            this.mdcValueDOM.getDefaultFoundation().adapter_.removeClassFromLabel('mdc-textfield__label--float-above');
            if (newValue instanceof Date) {
                this.mdcValueDOM.getDefaultFoundation().adapter_.addClassToLabel('mdc-textfield__label--float-above');
            }
        }
    };

    MdcTimepicker.prototype.selectMinutes = function selectMinutes(minutes) {
        this.selected.selectMinutes(minutes);
    };

    MdcTimepicker.prototype.selectHours = function selectHours(hours) {
        this.selected.selectHours(hours);
    };

    MdcTimepicker.prototype.toggleView = function toggleView() {
        this.selected.toggleView();
    };

    MdcTimepicker.prototype.togglePeriod = function togglePeriod() {
        this.selected.togglePeriod();
    };

    MdcTimepicker.prototype.draggerStart = function draggerStart(evt) {
        evt.preventDefault();
        evt.stopPropagation();

        if (evt instanceof MouseEvent) {
            this.dragger.start(evt);
        } else if (evt instanceof TouchEvent) {
            if (evt.touches.length === 1) {
                this.dragger.start(evt.touches[0]);
            }
        }
    };

    MdcTimepicker.prototype.draggerMove = function draggerMove(evt) {
        evt.preventDefault();
        evt.stopPropagation();

        if (evt instanceof MouseEvent) {
            this.dragger.move(evt);
        } else if (evt instanceof TouchEvent) {
            if (evt.touches.length === 1) {
                this.dragger.move(evt.touches[0]);
            }
        }
    };

    MdcTimepicker.prototype.draggerOut = function draggerOut(evt) {
        evt.preventDefault();
        evt.stopPropagation();

        if (evt instanceof MouseEvent) {
            this.dragger.out(evt);
        } else if (evt instanceof TouchEvent) {
            if (evt.touches.length === 1) {
                this.dragger.out(evt.touches[0]);
            }
        }
    };

    MdcTimepicker.prototype.draggerStop = function draggerStop(evt) {
        evt.preventDefault();
        evt.stopPropagation();

        if (evt instanceof MouseEvent) {
            this.dragger.stop(evt);
        } else if (evt instanceof TouchEvent) {
            this.dragger.stop();
        }
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
                    hour: 'numeric',
                    minute: '2-digit'
                });
            }
            return '';
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

var TimepickerDragger = function () {
    function TimepickerDragger(surface, needle, dragger, time) {
        var _this = this;

        _classCallCheck(this, TimepickerDragger);

        this.dragging = false;

        this.surface = surface;
        this.needle = needle;
        this.dragger = dragger;
        this.time = time;

        this.needle.addEventListener('transitionend', function (event) {
            _this._setToNeedle();
        }, false);
    }

    TimepickerDragger.prototype.start = function start(evt) {
        this.needleTransition = this.needle.style.transition;
        this.needle.style.transition = 'unset';
        this.dragging = true;
    };

    TimepickerDragger.prototype.stop = function stop() {
        this.needle.style.transition = this.needleTransition;

        this._setToNeedle();

        this.dragging = false;
    };

    TimepickerDragger.prototype.out = function out(evt) {
        var offset = 20;
        var hOffset = this.surface.getBoundingClientRect();

        var xCurrent = evt.clientX - hOffset.left - hOffset.width / 2;
        var yCurrent = evt.clientY - hOffset.top - hOffset.height / 2;

        var xDragger = parseInt(this.dragger.style.left, 10);
        var yDragger = parseInt(this.dragger.style.top, 10);

        if (xCurrent > xDragger - offset && xCurrent < xDragger + offset && yCurrent > yDragger - offset && yCurrent < yDragger + offset) {
            this.dragger.setAttribute('style', 'left:' + xCurrent + 'px;top:' + yCurrent + 'px');
            this.move(evt);
            return;
        }

        this.stop(evt);
    };

    TimepickerDragger.prototype.move = function move(evt) {
        var _this2 = this;

        if (!this.dragging) return;

        window.requestAnimationFrame(function () {
            var hOffset = _this2.surface.getBoundingClientRect();

            var xPos = evt.clientX - hOffset.left - hOffset.width / 2;
            var yPos = evt.clientY - hOffset.top - hOffset.height / 2;

            var cOffset = _this2.needle.querySelector('.mdc-timepicker__view-needle__circle').getBoundingClientRect();
            _this2.dragger.setAttribute('style', 'left:' + (evt.clientX - hOffset.left - cOffset.width / 2) + 'px;top:' + (evt.clientY - hOffset.top - cOffset.height / 2) + 'px');

            var angle = Math.atan2(-yPos, xPos) * (180 / Math.PI) - 90;

            if (angle < 0) {
                angle = 360 + angle;
            }

            var min = Math.round((360 - angle) / 6);

            if (min > 59) {
                min = 0;
            }

            _this2.time.setMinutes(min);
        });
    };

    TimepickerDragger.prototype._setToNeedle = function _setToNeedle() {
        var hOffset = this.surface.getBoundingClientRect();
        var cOffset = this.needle.querySelector('.mdc-timepicker__view-needle__circle').getBoundingClientRect();
        this.dragger.setAttribute('style', 'left:' + (cOffset.left - hOffset.left) + 'px;top:' + (cOffset.top - hOffset.top) + 'px');
    };

    return TimepickerDragger;
}();

var TimepickerTime = (_dec6 = (0, _aureliaFramework.computedFrom)('_date'), _dec7 = (0, _aureliaFramework.computedFrom)('_locale'), (_class5 = function () {
    function TimepickerTime(date, locale) {
        _classCallCheck(this, TimepickerTime);

        this.styles = {
            surface: '',
            needle: '',
            views: {
                hour: '',
                minute: ''
            }
        };

        this._origDate = date;
        this.date = new Date(date.getTime());
        this.locale = locale ? locale : 'en';
    }

    TimepickerTime.prototype.setHours = function setHours(hours) {
        if (hours < 12 && this.period && this.period.toLowerCase() === 'pm') {
            hours += 12;
        }
        this.date.setHours(hours);
        this.refresh();
        this._calculateStyles({
            set: true,
            hour: true
        });
    };

    TimepickerTime.prototype.setMinutes = function setMinutes(minutes) {
        this.date.setMinutes(minutes);
        this.refresh();
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
            this.date.setUTCHours(this.date.getUTCHours() + 12);
        } else {
            this.date.setUTCHours(this.date.getUTCHours() - 12);
        }
        this.refresh();
    };

    TimepickerTime.prototype.toggleView = function toggleView() {
        this._calculateStyles({
            set: false,
            hour: this.styles.views.hour ? false : true
        });
    };

    TimepickerTime.prototype.refresh = function refresh(locale) {
        this.locale = locale ? locale : this.locale;

        this._format();
    };

    TimepickerTime.prototype._calculateStyles = function _calculateStyles(options) {
        if (options.hour && options.set || !options.hour && !options.set) {
            var hourPosition = parseInt(this.hour, 10) % 12 * 5;

            this.styles.surface = 'mdc-timepicker-circular--rotate-to-' + hourPosition;
            this.styles.needle = 'mdc-timepicker__view-circular__cell--rotate-to-' + hourPosition;
            if (!this.period && (parseInt(this.hour, 10) > 12 || parseInt(this.hour, 10) === 0)) {
                this.styles.surface += ' mdc-timepicker__view-needle__pm';
                this.styles.needle += ' mdc-timepicker__view-needle__pm';
            }

            this.styles.views.hour = '';
            this.styles.views.minute = 'mdc-timepicker--hidden';
        } else {
            this.styles.surface = 'mdc-timepicker-circular--rotate-to-' + parseInt(this.minute, 10);
            this.styles.needle = 'mdc-timepicker__view-circular__cell--rotate-to-' + parseInt(this.minute, 10);

            this.styles.views.hour = 'mdc-timepicker--hidden';
            this.styles.views.minute = '';
        }
    };

    TimepickerTime.prototype._format = function _format() {
        this.period = undefined;
        for (var _iterator = new Intl.DateTimeFormat(this.locale, {
            hour: 'numeric',
            minute: '2-digit'
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
            this.setHours(parseInt(this.hour, 10));
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
}(), (_applyDecoratedDescriptor(_class5.prototype, 'date', [_dec6], Object.getOwnPropertyDescriptor(_class5.prototype, 'date'), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, 'locale', [_dec7], Object.getOwnPropertyDescriptor(_class5.prototype, 'locale'), _class5.prototype)), _class5));