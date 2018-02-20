'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MdcAutocomplete = exports.MdcTimepicker = exports.MdcDatepicker = exports.MdcTarget = undefined;
exports.configure = configure;

var _aureliaPal = require('aurelia-pal');

var _config = require('./config');

var _mdcTarget = require('./mdc-target');

var _mdcDatepicker = require('./elements/mdc-datepicker');

var _mdcTimepicker = require('./elements/mdc-timepicker');

var _mdcAutocomplete = require('./elements/mdc-autocomplete');

var pluginConfig = void 0;

function configure(config, callback) {
    pluginConfig = config.container.get(_config.MdcConfig);

    if (callback !== undefined && typeof callback === 'function') {
        callback(pluginConfig);
    }

    config.globalResources(_aureliaPal.PLATFORM.moduleName('./mdc-target'));

    config.globalResources(_aureliaPal.PLATFORM.moduleName('./elements/mdc-datepicker'));
    config.globalResources(_aureliaPal.PLATFORM.moduleName('./elements/mdc-timepicker'));
    config.globalResources(_aureliaPal.PLATFORM.moduleName('./elements/mdc-autocomplete'));


    config.aurelia.resources.registerViewEngineHooks({
        beforeCompile: beforeViewCompiled
    });
}

function beforeViewCompiled(content) {
    var elements = content.querySelectorAll(pluginConfig.mdcSelectors);
    if (elements.length === 0) return;

    for (var i = 0; i < elements.length; i++) {
        var item = elements.item(i);
        var componentName = pluginConfig.getComponentName(item);
        item.setAttribute(_config.MDC_TARGET_ATTR, componentName);
        if (!item.hasAttribute(_config.MDC_DISABLE_INIT_ATTR)) item.setAttribute(_config.MDC_INIT_ATTR, componentName);
    }
}

exports.MdcTarget = _mdcTarget.MdcTarget;
exports.MdcDatepicker = _mdcDatepicker.MdcDatepicker;
exports.MdcTimepicker = _mdcTimepicker.MdcTimepicker;
exports.MdcAutocomplete = _mdcAutocomplete.MdcAutocomplete;