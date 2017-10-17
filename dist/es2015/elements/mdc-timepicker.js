var _dec, _dec2, _dec3, _dec4, _dec5, _class, _desc, _value, _class2, _descriptor, _descriptor2, _dec6, _dec7, _desc2, _value2, _class4;

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

export let MdcTimepicker = (_dec = customElement('mdc-timepicker'), _dec2 = inject(DOM.Element), _dec3 = bindable({
    attribute: 'locale',
    defaultBindingMode: bindingMode.twoWay,
    changeHandler: 'localeChangeHandler',
    defaultValue: 'en'
}), _dec4 = bindable({
    attribute: 'value',
    defaultBindingMode: bindingMode.twoWay
}), _dec5 = computedFrom("_value"), _dec(_class = _dec2(_class = (_class2 = class MdcTimepicker {

    constructor(element) {
        _initDefineProp(this, 'locale', _descriptor, this);

        _initDefineProp(this, '_value', _descriptor2, this);

        this.animating = false;

        this.element = element;
    }

    attached() {
        this.mdcTimepickerDialog = new dialog.MDCDialog(this.timepickerDialog);

        this.selected = new TimepickerTime(this._value ? this._value : new Date(), this.locale);
    }

    get value() {
        if (this._value) {
            return this._value.toLocaleTimeString(this.locale, {
                hour: "numeric",
                minute: "2-digit"
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

    selectMinutes(minutes) {
        this.selected.selectMinutes(minutes);
    }
    selectHours(hours) {
        this.selected.selectHours(hours);
    }

    togglePeriod() {
        this.selected.togglePeriod();
    }

    show() {
        this.selected.locale = this.locale;
        console.log(this._value);
        this.selected.date = this._value ? this._value : new Date();

        this.mdcTimepickerDialog.show();
    }

    cancel() {
        this.value = this.selected.originalDate;
        this.mdcTimepickerDialog.close();
    }

    ok() {
        this.value = this.selected.date;
        this.mdcTimepickerDialog.close();
    }

}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'locale', [_dec3], {
    enumerable: true,
    initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, '_value', [_dec4], {
    enumerable: true,
    initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, 'value', [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, 'value'), _class2.prototype)), _class2)) || _class) || _class);

let TimepickerTime = (_dec6 = computedFrom("_date"), _dec7 = computedFrom("_locale"), (_class4 = class TimepickerTime {

    constructor(date, locale) {
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

    get date() {
        return this._date;
    }
    set date(value) {
        this._origDate = value;
        this._date = new Date(value.getTime());
        this.refresh(this.locale);
        this.setHours(parseInt(this.hour));
    }

    get originalDate() {
        return this._origDate;
    }

    get locale() {
        return this._locale;
    }
    set locale(value) {
        this._locale = value;
    }

    setHours(hours) {
        if (hours < 12 && this.period && this.period.toLowerCase() === 'pm') {
            hours += 12;
        }
        this.date.setHours(hours);
        this.refresh();
        this._calculateStyles({
            set: true,
            hour: true
        });
    }
    setMinutes(minutes) {
        this.date.setMinutes(minutes);
        this.refresh();
        this._calculateStyles({
            set: true,
            hour: false
        });
    }

    selectHours(hours) {
        this.setHours(hours);
        this._calculateStyles({
            set: false,
            hour: true
        });
    }
    selectMinutes(minutes) {
        this.setMinutes(minutes);
        this._calculateStyles({
            set: false,
            hour: false
        });
    }

    togglePeriod() {
        if (this.period.toLowerCase() === 'am') {
            this.date.setUTCHours(this.date.getUTCHours() + 12);
        } else {
            this.date.setUTCHours(this.date.getUTCHours() - 12);
        }
        this.refresh();
    }

    refresh(locale) {
        this.locale = locale ? locale : this.locale;

        this._format();
    }

    _calculateStyles(options) {
        if (options.hour && options.set || !options.hour && !options.set) {
            let hourPosition = parseInt(this.hour) % 12 * 5;

            this.styles.needle = `mdc-timepicker__view-circular__cell--rotate-to-${hourPosition}`;
            if (!this.period && (parseInt(this.hour) > 12 || parseInt(this.hour) === 0)) {
                this.styles.needle += ' mdc-timepicker__view-needle__pm';
            }

            this.styles.views.hour = '';
            this.styles.views.minute = 'mdc-timepicker--hidden';
        } else {
            this.styles.needle = `mdc-timepicker__view-circular__cell--rotate-to-${parseInt(this.minute)}`;

            this.styles.views.hour = 'mdc-timepicker--hidden';
            this.styles.views.minute = '';
        }
    }

    _format() {
        this.period = undefined;
        for (let value of new Intl.DateTimeFormat(this.locale, {
            hour: "numeric",
            minute: "2-digit"
        }).formatToParts(this.date)) {
            if (value.type === 'hour') {
                this.hour = value.value;
            } else if (value.type === 'minute') {
                this.minute = value.value;
            } else if (value.type === 'dayperiod') {
                this.period = value.value;
            }
        }
    }

}, (_applyDecoratedDescriptor(_class4.prototype, 'date', [_dec6], Object.getOwnPropertyDescriptor(_class4.prototype, 'date'), _class4.prototype), _applyDecoratedDescriptor(_class4.prototype, 'locale', [_dec7], Object.getOwnPropertyDescriptor(_class4.prototype, 'locale'), _class4.prototype)), _class4));