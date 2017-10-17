import {
    inject,
    bindable,
    bindingMode,
    computedFrom,
    DOM,
    customElement
} from 'aurelia-framework';
import {
    dialog
} from 'material-components-web';


@customElement('mdc-timepicker')
@inject(DOM.Element)
export class MdcTimepicker {

    @bindable({
        attribute: 'locale',
        defaultBindingMode: bindingMode.twoWay,
        changeHandler: 'localeChangeHandler',
        defaultValue: 'en'
    }) locale;

    @bindable({
        attribute: 'value',
        defaultBindingMode: bindingMode.twoWay
    }) _value;

    timepickerDialog;
    mdcTimepickerDialog;

    domNeedle;
    domMinuteView;
    domHourView;

    animating = false;

    constructor(element) {
        this.element = element;
    }

    attached() {
        this.mdcTimepickerDialog = new dialog.MDCDialog(this.timepickerDialog);

        this.selected = new TimepickerTime((this._value) ? this._value : new Date(), this.locale);
    }


    @computedFrom("_value")
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
        this.selected.date = (this._value) ? this._value : new Date();

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

}


class TimepickerTime {

    _origDate;
    _date;
    _locale;

    styles = {
        needle: "",
        views: {
            hour: "",
            minute: ""
        }
    }

    constructor(date, locale) {
        this._origDate = date;
        this.date = new Date(date.getTime());
        this.locale = (locale) ? locale : 'en';
    }

    @computedFrom("_date")
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

    @computedFrom("_locale")
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
        this.locale = (locale) ? locale : this.locale;

        this._format();
    }

    _calculateStyles(options) {
        if (options.hour && options.set || !options.hour && !options.set) {
            let hourPosition = (parseInt(this.hour) % 12) * 5;

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

}
