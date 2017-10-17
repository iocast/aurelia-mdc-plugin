var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _dec7, _dec8, _dec9, _desc2, _value2, _class4;

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

import { inject, bindable, bindingMode, computedFrom, DOM, customElement } from 'aurelia-framework';
import { dialog } from 'material-components-web';

export let MdcDatepicker = (_dec = customElement('mdc-datepicker'), _dec2 = inject(DOM.Element), _dec3 = bindable({
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
    defaultBindingMode: bindingMode.twoWay
}), _dec6 = computedFrom("_value"), _dec(_class = _dec2(_class = (_class2 = class MdcDatepicker {

    constructor(element) {
        _initDefineProp(this, 'locale', _descriptor, this);

        _initDefineProp(this, 'startWeekOn', _descriptor2, this);

        _initDefineProp(this, '_value', _descriptor3, this);

        this.animating = false;

        this.element = element;
    }

    attached() {
        this.mdcDatepickerDialog = new dialog.MDCDialog(this.datepickerDialog);

        let shift = 0;
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

        this.slideA = new DatepickerDate(new Date(), this.locale, shift, "current", this.selected);
        this.slideB = new DatepickerDate(new Date(Date.UTC(this.slideA.date.getFullYear(), this.slideA.date.getMonth() - 1, 1)), this.locale, shift, "previous", this.selected);
        this.slideC = new DatepickerDate(new Date(Date.UTC(this.slideA.date.getFullYear(), this.slideA.date.getMonth() + 1, 1)), this.locale, shift, "next", this.selected);

        this.slideA.calculateCalendar({
            empty: true
        });
        this.slideB.calculateCalendar({
            empty: true
        });
        this.slideC.calculateCalendar({
            empty: true
        });

        this.trackDOM.addEventListener("transitionend", event => {
            this.animating = false;
        }, false);
    }

    get value() {
        if (this._value) {
            return this._value.toLocaleDateString(this.locale, {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric"
            });
        }
        return "";
    }
    set value(value) {
        this._value = value;
    }

    localeChangeHandler(newValue, oldValue) {
        if (this.selected) {
            this.selected.refresh(newValue);
            this.valueDOM.value = this.value;
            this.valueDOM.dispatchEvent(new Event('change', {
                bubbles: true
            }));
        }
    }

    next() {
        if (this.animating) return;

        this.animating = true;

        this.slideA = this.getNextPosition(this.slideA);
        this.slideB = this.getNextPosition(this.slideB);
        this.slideC = this.getNextPosition(this.slideC);
    }
    previous() {
        if (this.animating) return;

        this.animating = true;

        this.slideA = this.getPreviousPosition(this.slideA);
        this.slideB = this.getPreviousPosition(this.slideB);
        this.slideC = this.getPreviousPosition(this.slideC);
    }

    getNextPosition(model) {
        if (model.position === 'previous') {
            model.date = new Date(Date.UTC(model.date.getFullYear(), model.date.getMonth() + 3, 1));
            model.position = "next";
            return model;
        } else if (model.position === 'current') {
            model.position = "previous";
            return model;
        } else if (model.position === 'next') {
            model.position = "current";
            return model;
        }
    }
    getPreviousPosition(model) {
        if (model.position === 'previous') {
            model.position = "current";
            return model;
        } else if (model.position === 'current') {
            model.position = "next";
            return model;
        } else if (model.position === 'next') {
            model.date = new Date(Date.UTC(model.date.getFullYear(), model.date.getMonth() - 3, 1));
            model.position = "previous";
            return model;
        }
    }

    show() {
        this.selected.locale = this.locale;
        this.selected.date = this._value ? this._value : new Date();

        this.slideA.refresh(this.locale);
        this.slideB.refresh(this.locale);
        this.slideC.refresh(this.locale);

        this.mdcDatepickerDialog.show();
    }

    cancel() {
        this.value = this.selected.originalDate;
        this.mdcDatepickerDialog.close();
    }

    ok() {
        this.value = this.selected.date;
        this.mdcDatepickerDialog.close();
    }

}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'locale', [_dec3], {
    enumerable: true,
    initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'startWeekOn', [_dec4], {
    enumerable: true,
    initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, '_value', [_dec5], {
    enumerable: true,
    initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, 'value', [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, 'value'), _class2.prototype)), _class2)) || _class) || _class);

let DatepickerDate = (_dec7 = computedFrom("_date"), _dec8 = computedFrom("_position"), _dec9 = computedFrom("_locale"), (_class4 = class DatepickerDate {

    constructor(date, locale, shift, position, selected) {
        this.weekdays = [];
        this.matrix = [];
        this.matrixFlat = [];
        this.matrixOptions = {
            empty: false
        };
        this._position = "";
        this.styleClasses = "";

        this.locale = locale ? locale : 'en';
        this.shift = shift ? shift : 0;
        this.position = position;
        this._origDate = date;
        this.date = new Date(date.getTime());
        this.selected = selected;
    }

    get date() {
        this._date.setUTCHours(this.originalDate.getUTCHours());
        this._date.setUTCMinutes(this.originalDate.getUTCMinutes());
        this._date.setUTCSeconds(this.originalDate.getUTCSeconds());
        this._date.setUTCMilliseconds(this.originalDate.getUTCMilliseconds());
        return this._date;
    }
    set date(value) {
        this._origDate = value;
        this._date = new Date(value.getTime());
        this.refresh(this.locale, this.shift, this.position);
    }

    setDate(year, month, day) {
        this._date.setFullYear(year);
        this._date.setMonth(month);
        this._date.setDate(day);

        this.refresh(this.locale, this.shift, this.position);
    }

    get originalDate() {
        return this._origDate;
    }

    get position() {
        return this._position;
    }
    set position(value) {
        this._calculateStyles(value);
        this._position = value;
    }

    get locale() {
        return this._locale;
    }
    set locale(value) {
        this._locale = value;
    }

    select(day) {
        if (this.selected) {
            this.selected.setDate(this.date.getFullYear(), this.date.getMonth(), day);
        }
    }

    calculateCalendar(options) {
        this.matrixOptions = options;
        this._weekdays();
        this._matrix();
        this._flatten();
    }

    refresh(locale, shift, position) {
        this.locale = locale ? locale : this.locale;
        this.shift = shift ? shift : this.shift;
        this.position = position ? position : this.position;

        this._format();

        if (this.matrix.length > 0) {
            this.calculateCalendar(this.matrixOptions);
        }
    }

    _calculateStyles(newPosition) {
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
    }

    _format() {
        for (let value of new Intl.DateTimeFormat(this.locale, {
            weekday: 'long',

            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        }).formatToParts(this.date)) {
            if (value.type === 'year') {
                this.year = parseInt(value.value);
            } else if (value.type === 'month') {
                this.month = parseInt(value.value);
            } else if (value.type === 'day') {
                this.day = parseInt(value.value);
            } else if (value.type === 'weekday') {
                this.weekdayLong = value.value;
            }
        }

        for (let value of new Intl.DateTimeFormat(this.locale, {
            weekday: 'narrow',
            month: 'narrow'
        }).formatToParts(this.date)) {
            if (value.type === 'month') {
                this.monthNarrow = value.value;
            } else if (value.type === 'weekday') {
                this.weekdayNarrow = value.value;
            }
        }

        for (let value of new Intl.DateTimeFormat(this.locale, {
            weekday: 'short',
            month: 'short'
        }).formatToParts(this.date)) {
            if (value.type === 'month') {
                this.monthShort = value.value;
            } else if (value.type === 'weekday') {
                this.weekdayShort = value.value;
            }
        }

        for (let value of new Intl.DateTimeFormat(this.locale, {
            month: 'long'
        }).formatToParts(this.date)) {
            if (value.type === 'month') {
                this.monthLong = value.value;
            }
        }

        return this;
    }

    _matrix() {
        this.matrix = [];

        let startDate = new Date(Date.UTC(this.year, this.month - 1, 1));
        let endDate = new Date(Date.UTC(this.year, this.month, 0));

        let matrixStartDate = new Date(Date.UTC(this.year, this.month - 1, 1));
        let matrixEndDate = new Date(Date.UTC(this.year, this.month, 0));

        matrixStartDate.setUTCDate(startDate.getUTCDate() - this._mod(startDate.getUTCDay() - this.shift, 7));
        matrixEndDate.setUTCDate(endDate.getUTCDate() + (6 - this._mod(endDate.getUTCDay() - this.shift, 7)));

        let currentDate = matrixStartDate;
        let counter = 0;
        let week = [];

        while (currentDate <= matrixEndDate) {
            if (counter > 6) {
                this.matrix.push(week);
                counter = 0;
                week = [];
            }

            if (this.matrixOptions.empty && (currentDate < startDate || currentDate > endDate)) {
                week.push("");
            } else {
                week.push(currentDate.getDate());
            }

            counter++;
            currentDate.setUTCDate(currentDate.getUTCDate() + 1);
        }

        this.matrix.push(week);
    }

    _flatten() {
        this.matrixFlat = [].concat(...this.matrix);
    }

    _weekdays() {
        let date = new Date();
        date.setUTCDate(date.getUTCDate() - date.getUTCDay() - 1);
        this.weekdays = Array(7).fill().map(i => {
            date.setUTCDate(date.getUTCDate() + 1);
            return Intl.DateTimeFormat(this.locale, {
                weekday: 'narrow'
            }).format(date);
        });

        if (this.shift > 0) {
            this.weekdays = this.weekdays.concat(this.weekdays.splice(0, this.shift));
        }
    }

    _mod(a, n) {
        return a - n * Math.floor(a / n);
    }

}, (_applyDecoratedDescriptor(_class4.prototype, 'date', [_dec7], Object.getOwnPropertyDescriptor(_class4.prototype, 'date'), _class4.prototype), _applyDecoratedDescriptor(_class4.prototype, 'position', [_dec8], Object.getOwnPropertyDescriptor(_class4.prototype, 'position'), _class4.prototype), _applyDecoratedDescriptor(_class4.prototype, 'locale', [_dec9], Object.getOwnPropertyDescriptor(_class4.prototype, 'locale'), _class4.prototype)), _class4));