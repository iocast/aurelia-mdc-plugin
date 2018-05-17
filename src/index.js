import { PLATFORM } from 'aurelia-pal';
import { MdcConfig, MDC_INIT_ATTR, MDC_DISABLE_INIT_ATTR } from './config';

import { MdcDatepicker } from './elements/mdc-datepicker';
import { MdcTimepicker } from './elements/mdc-timepicker';
import { MdcAutocomplete } from './elements/mdc-autocomplete';

import { autoInit } from 'material-components-web';

let pluginConfig;

export function configure(config, callback) {
    pluginConfig = config.container.get(MdcConfig);

    if (callback !== undefined && typeof (callback) === 'function') {
        callback(pluginConfig);
    }

    config.globalResources(PLATFORM.moduleName('./elements/mdc-datepicker'));
    config.globalResources(PLATFORM.moduleName('./elements/mdc-timepicker'));
    config.globalResources(PLATFORM.moduleName('./elements/mdc-autocomplete'));

    config.aurelia.resources
        .registerViewEngineHooks({
            afterCreate: afterViewCreated
        });
}

function afterViewCreated(view) {
    let elements = view.fragment.querySelectorAll(pluginConfig.mdcSelectors);
    if (elements.length === 0) return;

    for (let i = 0; i < elements.length; i++) {
        const item = elements.item(i);
        const componentName = pluginConfig.getComponentName(item);

        if (!item.hasAttribute(MDC_DISABLE_INIT_ATTR)) item.setAttribute(MDC_INIT_ATTR, componentName);
    }
    autoInit(view.fragment, () => { });
}

export {
    MdcDatepicker,
    MdcTimepicker,
    MdcAutocomplete
};
