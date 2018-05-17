export const MDC_INIT_ATTR = 'data-mdc-auto-init';
export const MDC_DISABLE_INIT_ATTR = 'disable-mdc-auto-init';

// css class: JS class
let MDC_COMPONENTS = {
    'mdc-checkbox': 'MDCCheckbox',
    'mdc-chip': 'MDCChip',
    'mdc-chip-set': 'MDCChipSet',
    'mdc-dialog': 'MDCDialog',
    'mdc-drawer--permanent': 'MDCPersistentDrawer',
    'mdc-drawer--temporary': 'MDCTemporaryDrawer',
    'mdc-floating-label': 'MDCFloatingLabel',
    'mdc-form-field': 'MDCFormField',
    'mdc-ripple-surface': 'MDCRipple',
    'mdc-grid-list': 'MDCGridList',
    'mdc-icon-toggle': 'MDCIconToggle',
    'mdc-line-ripple': 'MDCLineRipple',
    'mdc-linear-progress': 'MDCLinearProgress',
    'mdc-notched-outline': 'MDCNotchedOutline',
    'mdc-radio': 'MDCRadio',
    'mdc-snackbar': 'MDCSnackbar',
    'mdc-tab': 'MDCTab',
    'mdc-tab-bar': 'MDCTabBar',
    'mdc-text-field': 'MDCTextField',
    'mdc-menu': 'MDCMenu',
    'mdc-select': 'MDCSelect',
    'mdc-slider': 'MDCSlider',
    'mdc-toolbar': 'MDCToolbar',
    'mdc-top-app-bar': 'MDCTopAppBar'
    //'mdc-switch': ''
};

export class MdcConfig {
    addComponents(items) {
        if (typeof items !== 'object') {
            throw Error('Invalid argument, expected an Object');
        }

        MDC_COMPONENTS = Object.assign(MDC_COMPONENTS, items);
        return this;
    }

    get mdcClasses() {
        return Object.keys(MDC_COMPONENTS);
    }

    get mdcSelectors() {
        return this.mdcClasses.map(selector => `.${selector}`).join();
    }

    getComponentName(item) { //this is ugly
        let component;

        this.mdcClasses.forEach(selector => {
            if (item.classList.contains(selector)) {
                component = MDC_COMPONENTS[selector];
            }
        });

        return component;
    }
}
