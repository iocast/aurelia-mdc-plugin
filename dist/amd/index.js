define(['exports', 'aurelia-pal', './config', './mdc-target', './elements/mdc-checkbox', './elements/mdc-datepicker', './elements/mdc-timepicker', './elements/mdc-autocomplete'], function (exports, _aureliaPal, _config, _mdcTarget, _mdcCheckbox, _mdcDatepicker, _mdcTimepicker, _mdcAutocomplete) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.MdcAutocomplete = exports.MdcTimepicker = exports.MdcDatepicker = exports.MdcCheckbox = exports.MdcTarget = undefined;
    exports.configure = configure;


    var pluginConfig = void 0;

    function configure(config, callback) {
        pluginConfig = config.container.get(_config.MdcConfig);

        if (callback !== undefined && typeof callback === 'function') {
            callback(pluginConfig);
        }

        config.globalResources(_aureliaPal.PLATFORM.moduleName('./mdc-target'));
        config.globalResources('./elements/mdc-checkbox');
        config.globalResources('./elements/mdc-datepicker');
        config.globalResources('./elements/mdc-timepicker');
        config.globalResources('./elements/mdc-autocomplete');

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
            item.setAttribute(_config.MDC_INIT_ATTR, componentName);
        }
    }

    exports.MdcTarget = _mdcTarget.MdcTarget;
    exports.MdcCheckbox = _mdcCheckbox.MdcCheckbox;
    exports.MdcDatepicker = _mdcDatepicker.MdcDatepicker;
    exports.MdcTimepicker = _mdcTimepicker.MdcTimepicker;
    exports.MdcAutocomplete = _mdcAutocomplete.MdcAutocomplete;
});