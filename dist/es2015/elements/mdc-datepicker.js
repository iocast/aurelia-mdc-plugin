var _dec, _dec2, _dec3, _dec4, _class, _desc, _value, _class2, _descriptor, _descriptor2;

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

import { inject, bindable, bindingMode, DOM, customElement } from 'aurelia-framework';
import { dialog } from 'material-components-web';

export let MdcDatepicker = (_dec = customElement('mdc-datepicker'), _dec2 = inject(DOM.Element), _dec3 = bindable({
    attribute: 'locale',
    defaultBindingMode: bindingMode.twoWay,
    defaultValue: 'en'
}), _dec4 = bindable({
    attribute: 'start-week-on',
    defaultBindingMode: bindingMode.twoWay,
    defaultValue: 'sunday'
}), _dec(_class = _dec2(_class = (_class2 = class MdcDatepicker {

    constructor(element) {
        _initDefineProp(this, 'locale', _descriptor, this);

        _initDefineProp(this, 'startWeekOn', _descriptor2, this);

        this.element = element;
    }

    attached() {
        this.mdcDatepickerDialog = new dialog.MDCDialog(this.datepickerDialog);
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
    }

    next() {
        this.modelA = this.getNextPosition(this.modelA);
        this.modelB = this.getNextPosition(this.modelB);
        this.modelC = this.getNextPosition(this.modelC);
    }
    previous() {
        this.modelA = this.getPreviousPosition(this.modelA);
        this.modelB = this.getPreviousPosition(this.modelB);
        this.modelC = this.getPreviousPosition(this.modelC);
    }

    getNextPosition(model) {
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
    }
    getPreviousPosition(model) {
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
    }

    show() {

        console.log(this);

        this.mdcDatepickerDialog.show();
    }

    cancel() {
        this.mdcDatepickerDialog.close();
    }

    ok() {
        this.mdcDatepickerDialog.close();
    }

    format(date, locale) {
        locale = locale ? locale : 'en';

        let formatted = {
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

        for (let value of new Intl.DateTimeFormat(locale, {
            weekday: 'long',

            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        }).formatToParts(date)) {
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

        for (let value of new Intl.DateTimeFormat(locale, {
            weekday: 'narrow',
            month: 'narrow'
        }).formatToParts(date)) {
            if (value.type === 'month') {
                formatted.monthNarrow = value.value;
            } else if (value.type === 'weekday') {
                formatted.weekdayNarrow = value.value;
            }
        }

        for (let value of new Intl.DateTimeFormat(locale, {
            weekday: 'short',
            month: 'short'
        }).formatToParts(date)) {
            if (value.type === 'month') {
                formatted.monthShort = value.value;
            } else if (value.type === 'weekday') {
                formatted.weekdayShort = value.value;
            }
        }

        for (let value of new Intl.DateTimeFormat(locale, {
            month: 'long'
        }).formatToParts(date)) {
            if (value.type === 'month') {
                formatted.monthLong = value.value;
            }
        }

        return formatted;
    }

    getWeekdays(locale, options) {
        locale = locale ? locale : 'en';

        let date = new Date();
        date.setUTCDate(date.getUTCDate() - date.getUTCDay() - 1);
        let weekdays = Array(7).fill().map(i => {
            date.setUTCDate(date.getUTCDate() + 1);
            return Intl.DateTimeFormat(locale, {
                weekday: 'narrow'
            }).format(date);
        });

        if ("shiftLeft" in options && options.shiftLeft > 0) {
            weekdays = weekdays.concat(weekdays.splice(0, options.shiftLeft));
        }

        return weekdays;
    }

    matrix(year, month, options) {
        let matrix = [];

        let startDate = new Date(Date.UTC(year, month - 1, 1));
        let endDate = new Date(Date.UTC(year, month, 0));

        let matrixStartDate = new Date(Date.UTC(year, month - 1, 1));
        let matrixEndDate = new Date(Date.UTC(year, month, 0));

        let shiftLeft = 0;
        if ("shiftLeft" in options && options.shiftLeft > 0) {
            shiftLeft = options.shiftLeft;
        }

        matrixStartDate.setUTCDate(startDate.getUTCDate() - this.mod(startDate.getUTCDay() - shiftLeft, 7));
        matrixEndDate.setUTCDate(endDate.getUTCDate() + (6 - this.mod(endDate.getUTCDay() - shiftLeft, 7)));

        let currentDate = matrixStartDate;
        let counter = 0;
        let week = [];

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
    }

    flatten(matrix) {
        return [].concat(...matrix);
    }

    mod(a, n) {
        return a - n * Math.floor(a / n);
    }

}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'locale', [_dec3], {
    enumerable: true,
    initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'startWeekOn', [_dec4], {
    enumerable: true,
    initializer: null
})), _class2)) || _class) || _class);