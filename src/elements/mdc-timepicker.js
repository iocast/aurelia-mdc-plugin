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

    domCircularSurface;
    domNeedle;
    domNeedleDragger;
    domMinuteView;
    domHourView;

    animating = false;

    constructor(element) {
        this.element = element;
    }

    attached() {
        this.mdcTimepickerDialog = new dialog.MDCDialog(this.timepickerDialog);

        this.selected = new TimepickerTime((this._value) ? this._value : new Date(), this.locale);

        this.dragger = new TimepickerDragger(this.domCircularSurface, this.domNeedle, this.domNeedleDragger, this.selected);
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

    toggleView() {
        this.selected.toggleView();
    }

    togglePeriod() {
        this.selected.togglePeriod();
    }

    draggerStart(evt) {
        evt.preventDefault();
        evt.stopPropagation();

        if (evt instanceof TouchEvent) {
            if (evt.touches.length === 1) {
                this.dragger.start(evt.touches[0])
            }

        } else if (evt instanceof MouseEvent) {
            this.dragger.start(evt);
        }

    }
    draggerMove(evt) {
        evt.preventDefault();
        evt.stopPropagation();

        if (evt instanceof TouchEvent) {
            if (evt.touches.length === 1) {
                this.dragger.move(evt.touches[0])
            }

        } else if (evt instanceof MouseEvent) {
            this.dragger.move(evt);
        }
    }
    draggerOut(evt) {
        evt.preventDefault();
        evt.stopPropagation();

        if (evt instanceof TouchEvent) {
            if (evt.touches.length === 1) {
                this.dragger.out(evt.touches[0])
            }

        } else if (evt instanceof MouseEvent) {
            this.dragger.out(evt);
        }
    }
    draggerStop(evt) {
        evt.preventDefault();
        evt.stopPropagation();

        if (evt instanceof TouchEvent) {
            this.dragger.stop()

        } else if (evt instanceof MouseEvent) {
            this.dragger.stop(evt);
        }
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

class TimepickerDragger {

    dragging = false;

    constructor(surface, needle, dragger, time) {
        this.surface = surface;
        this.needle = needle;
        this.dragger = dragger;
        this.time = time;


        this.needle.addEventListener("transitionend", event => {
            this._setToNeedle();
        }, false);

    }

    start(evt) {
        this.needleTransition = this.needle.style.transition;
        this.needle.style.transition = "unset";
        this.dragging = true;
    }

    stop() {
        this.needle.style.transition = this.needleTransition;

        this._setToNeedle();

        this.dragging = false;
    }

    out(evt) {
        const offset = 20;
        const hOffset = this.surface.getBoundingClientRect();

        const xCurrent = evt.clientX - hOffset.left - (hOffset.width / 2)
        const yCurrent = evt.clientY - hOffset.top - (hOffset.height / 2)

        const xDragger = parseInt(this.dragger.style.left);
        const yDragger = parseInt(this.dragger.style.top);

        if (xCurrent > xDragger - offset && xCurrent < xDragger + offset && yCurrent > yDragger - offset && yCurrent < yDragger + offset) {
            this.dragger.setAttribute('style', `left:${xCurrent}px;top:${yCurrent}px`)
            this.move(evt);
            return;
        }

        this.stop(evt);
    }

    move(evt) {
        if (!this.dragging) return;

        window.requestAnimationFrame(() => {
            const hOffset = this.surface.getBoundingClientRect();

            const xPos = evt.clientX - hOffset.left - (hOffset.width / 2)
            const yPos = evt.clientY - hOffset.top - (hOffset.height / 2)

            const cOffset = this.needle.querySelector('.mdc-timepicker__view-needle__circle').getBoundingClientRect();
            this.dragger.setAttribute('style', `left:${evt.clientX - hOffset.left - cOffset.width / 2}px;top:${evt.clientY - hOffset.top - cOffset.height / 2}px`)


            let angle = Math.atan2(-yPos, xPos) * (180 / Math.PI) - 90;

            if (angle < 0) {
                angle = 360 + angle;
            }

            let min = Math.round((360 - angle) / 6);

            if (min > 59) {
                min = 0;
            }

            this.time.setMinutes(min);

        });

    }

    _setToNeedle() {
        const hOffset = this.surface.getBoundingClientRect()
        const cOffset = this.needle.querySelector('.mdc-timepicker__view-needle__circle').getBoundingClientRect();
        this.dragger.setAttribute('style', `left:${cOffset.left - hOffset.left}px;top:${cOffset.top - hOffset.top}px`)

    }



}

class TimepickerTime {

    _origDate;
    _date;
    _locale;

    styles = {
        surface: "",
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

    toggleView() {
        this._calculateStyles({
            set: false,
            hour: (this.styles.views.hour) ? false : true
        });
    }

    refresh(locale) {
        this.locale = (locale) ? locale : this.locale;

        this._format();
    }

    _calculateStyles(options) {
        if (options.hour && options.set || !options.hour && !options.set) {
            let hourPosition = (parseInt(this.hour) % 12) * 5;

            this.styles.surface = `mdc-timepicker-circular--rotate-to-${hourPosition}`;
            this.styles.needle = `mdc-timepicker__view-circular__cell--rotate-to-${hourPosition}`;
            if (!this.period && (parseInt(this.hour) > 12 || parseInt(this.hour) === 0)) {
                this.styles.surface += ' mdc-timepicker__view-needle__pm';
                this.styles.needle += ' mdc-timepicker__view-needle__pm';
            }

            this.styles.views.hour = '';
            this.styles.views.minute = 'mdc-timepicker--hidden';

        } else {
            this.styles.surface = `mdc-timepicker-circular--rotate-to-${parseInt(this.minute)}`;
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