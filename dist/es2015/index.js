import { PLATFORM } from 'aurelia-pal';
import { MdcConfig, MDC_TARGET_ATTR, MDC_INIT_ATTR } from './config';

import { MdcTarget } from './mdc-target';
import { MdcCheckbox } from './elements/mdc-checkbox';
import { MdcDatepicker } from './elements/mdc-datepicker';
import { MdcTimepicker } from './elements/mdc-timepicker';

export { ensureAttached } from './helpers';

let pluginConfig;

export function configure(config, callback) {
    pluginConfig = config.container.get(MdcConfig);

    if (callback !== undefined && typeof callback === 'function') {
        callback(pluginConfig);
    }

    config.globalResources(PLATFORM.moduleName('./mdc-target'));
    config.globalResources('./elements/mdc-checkbox');
    config.globalResources('./elements/mdc-datepicker');
    config.globalResources('./elements/mdc-timepicker');

    config.aurelia.resources.registerViewEngineHooks({
        beforeCompile: beforeViewCompiled
    });
}

function beforeViewCompiled(content) {
    let elements = content.querySelectorAll(pluginConfig.mdcSelectors);
    if (elements.length === 0) return;

    for (let i = 0; i < elements.length; i++) {
        const item = elements.item(i);
        const componentName = pluginConfig.getComponentName(item);
        item.setAttribute(MDC_TARGET_ATTR, componentName);
        item.setAttribute(MDC_INIT_ATTR, componentName);
    }
}

export { MdcTarget, MdcCheckbox, MdcDatepicker, MdcTimepicker };