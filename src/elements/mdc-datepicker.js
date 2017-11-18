import { inject, bindable, bindingMode, computedFrom, DOM, customElement } from 'aurelia-framework';
import { dialog, textField } from 'material-components-web';


@customElement('mdc-datepicker')
@inject(DOM.Element)
export class MdcDatepicker {
    @bindable({
        attribute: 'locale',
        defaultBindingMode: bindingMode.twoWay,
        changeHandler: 'localeChangeHandler',
        defaultValue: 'en'
    }) locale;

    @bindable({
        attribute: 'start-week-on',
        defaultBindingMode: bindingMode.twoWay,
        defaultValue: 'sunday'
    }) startWeekOn;

    @bindable({
        attribute: 'value',
        defaultBindingMode: bindingMode.twoWay,
        changeHandler: 'valueChangeHandler'
    }) _value;

    datepickerDialog;
    mdcDatepickerDialog;

    valueDOM;
    mdcValueDOM;

    animating = false;

    constructor(element) {
        this.element = element;
    }

    attached() {
        this.mdcDatepickerDialog = new dialog.MDCDialog(this.datepickerDialog);
        this.mdcValueDOM = new textField.MDCTextField(this.valueDOM);

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

        this.selected = new DatepickerDate((this._value) ? this._value : new Date(), this.locale, shift);


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

        this.trackDOM.addEventListener('transitionend', event => {
            this.animating = false;
        }, false);
    }

    @computedFrom('_value')
    get value() {
        if (this._value) {
            return this._value.toLocaleDateString(this.locale, {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        }
        return '';
    }

    set value(value) {
        this._value = value;
    }

    localeChangeHandler(newValue, oldValue) {
        if (this.selected) {
            this.selected.refresh(newValue);
            this.mdcValueDOM.getDefaultFoundation().adapter_.getNativeInput().value = this.value;
            this.mdcValueDOM.getDefaultFoundation().adapter_.getNativeInput().dispatchEvent(new Event('change', {
                bubbles: true
            }));
            /*
            this.valueDOM.value = this.value;
            this.valueDOM.dispatchEvent(new Event('change', {
                bubbles: true
            }));
            */
        }
    }

    valueChangeHandler(newValue, oldValue) {
        this._value = newValue;

        if (this.mdcValueDOM) {
            this.mdcValueDOM.getDefaultFoundation().adapter_.removeClassFromLabel('mdc-textfield__label--float-above');
            if (newValue instanceof Date) {
                this.mdcValueDOM.getDefaultFoundation().adapter_.addClassToLabel('mdc-textfield__label--float-above');
            }
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
            model.position = 'next';
            return model;
        } else if (model.position === 'current') {
            model.position = 'previous';
            return model;
        } else if (model.position === 'next') {
            model.position = 'current';
            return model;
        }
    }

    getPreviousPosition(model) {
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
    }

    show(evt) {
        this.selected.locale = this.locale;
        this.selected.date = (this._value) ? this._value : new Date();

        this.slideA.refresh(this.locale);
        this.slideB.refresh(this.locale);
        this.slideC.refresh(this.locale);

        this.mdcDatepickerDialog.show();
    }

    cancel(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.value = this.selected.originalDate;
        this.mdcDatepickerDialog.close();
    }

    ok(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.value = this.selected.date;
        this.mdcDatepickerDialog.close();
    }
}

class DatepickerDate {
    _origDate;
    _date;
    weekdays = [];
    matrix = [];
    matrixFlat = [];

    matrixOptions = {
        empty: false
    }

    _position = '';
    styleClasses = '';

    constructor(date, locale, shift, position, selected) {
        this.locale = (locale) ? locale : 'en';
        this.shift = (shift) ? shift : 0;
        this.position = position;
        this._origDate = date;
        this.date = new Date(date.getTime());
        this.selected = selected;
    }


    @computedFrom('_date')
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

    @computedFrom('_position')
    get position() {
        return this._position;
    }

    set position(value) {
        this._calculateStyles(value);
        this._position = value;
    }

    @computedFrom('_locale')
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
        this.locale = (locale) ? locale : this.locale;
        this.shift = (shift) ? shift : this.shift;
        this.position = (position) ? position : this.position;

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
                //era: 'long',
                year: 'numeric',
                month: 'numeric',
                day: 'numeric'
            }).formatToParts(this.date)) {
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
                week.push('');
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
            return new Intl.DateTimeFormat(this.locale, {
                weekday: 'narrow'
            }).format(date);
        });

        if (this.shift > 0) {
            this.weekdays = this.weekdays.concat(this.weekdays.splice(0, this.shift));
        }
    }

    _mod(a, n) {
        return a - (n * Math.floor(a / n));
    }
}
