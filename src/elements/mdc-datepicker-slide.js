import { bindable } from 'aurelia-framework';

export class MdcDatepickerSlide {
    @bindable slide;

    mod(num, mod) {
        return ((num % mod) + mod) % mod;
    }

    row(idx, div) {
        return Math.floor(idx / div);
    }
}
