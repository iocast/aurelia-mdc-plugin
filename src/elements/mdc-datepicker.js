import {
    inject,
    bindable,
    bindingMode,
    DOM,
    customElement
} from 'aurelia-framework';
import {
    dialog
} from 'material-components-web';

// TODO: locale as bindable attribute

@customElement('mdc-datepicker')
@inject(DOM.Element)
export class MdcDatepicker {

    datepickerDialog;
    mdcDatepickerDialog;

    today = {}

    constructor(element) {
        this.element = element;
    }

    attached() {
        this.mdcDatepickerDialog = new dialog.MDCDialog(this.datepickerDialog);
    }

    show() {
        this.today = this.format(new Date());

        this.currentMonthMatrix = this.flatten(this.matrix(this.today.year, this.today.month, {
            empty: true
        }))

        this.previousMonthMatrix = this.flatten(this.matrix(this.today.year, (new Date(Date.UTC(this.today.date.getYear(), this.today.date.getUTCMonth() - 1, 1))).getUTCMonth() + 1, {
            empty: true
        }))

        this.nextMonthMatrix = this.flatten(this.matrix(this.today.year, (new Date(Date.UTC(this.today.date.getYear(), this.today.date.getUTCMonth() + 1, 1))).getUTCMonth() + 1, {
            empty: true
        }))

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
        locale = (locale) ? locale : 'en';

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
            weekdayShort: '',
        };

        for (let value of new Intl.DateTimeFormat(locale, {
                weekday: 'long',
                //era: 'long',
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



    matrix(year, month, options) {
        let matrix = [];

        let startDate = new Date(Date.UTC(year, month - 1, 1));
        let endDate = new Date(Date.UTC(year, month, 0));

        let matrixStartDate = new Date(Date.UTC(year, month - 1, 1));
        let matrixEndDate = new Date(Date.UTC(year, month, 0));

        matrixStartDate.setUTCDate(-startDate.getUTCDay() + 1);
        matrixEndDate.setUTCDate(endDate.getUTCDate() + 6 - endDate.getUTCDay());

        let currentDate = matrixStartDate;
        let counter = 0;
        let week = []

        while (currentDate <= matrixEndDate) {
            if (counter > 6) {
                matrix.push(week);
                counter = 0;
                week = [];
            }

            if (options.empty && (currentDate < startDate || currentDate > endDate)) {
                week.push("")
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
        return [].concat(...matrix)
    }


}
