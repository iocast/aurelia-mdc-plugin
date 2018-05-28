define(['exports', 'aurelia-pal', './config', './elements/mdc-datepicker', './elements/mdc-timepicker', './elements/mdc-autocomplete', 'material-components-web'], function (exports, _aureliaPal, _config, _mdcDatepicker, _mdcTimepicker, _mdcAutocomplete, _materialComponentsWeb) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.MdcAutocomplete = exports.MdcTimepicker = exports.MdcDatepicker = undefined;
    exports.configure = configure;


    var pluginConfig = void 0;

    function configure(config, callback) {
        pluginConfig = config.container.get(_config.MdcConfig);

        if (callback !== undefined && typeof callback === 'function') {
            callback(pluginConfig);
        }

        config.globalResources(_aureliaPal.PLATFORM.moduleName('./elements/mdc-datepicker'));
        config.globalResources(_aureliaPal.PLATFORM.moduleName('./elements/mdc-timepicker'));
        config.globalResources(_aureliaPal.PLATFORM.moduleName('./elements/mdc-autocomplete'));

        config.aurelia.resources.registerViewEngineHooks({
            beforeCompile: beforeCompiled,
            afterCreate: afterViewCreated
        });
    }

    function beforeCompiled(content) {
        var elements = content.querySelectorAll(pluginConfig.mdcSelectors);
        if (elements.length === 0) return;

        for (var i = 0; i < elements.length; i++) {
            var item = elements.item(i);
            var componentName = pluginConfig.getComponentName(item);

            if (!item.hasAttribute(_config.MDC_DISABLE_INIT_ATTR)) item.setAttribute(_config.MDC_INIT_ATTR, componentName);
        }
    }

    function afterViewCreated(view) {
        (0, _materialComponentsWeb.autoInit)(view.fragment, function () {});
    }

    exports.MdcDatepicker = _mdcDatepicker.MdcDatepicker;
    exports.MdcTimepicker = _mdcTimepicker.MdcTimepicker;
    exports.MdcAutocomplete = _mdcAutocomplete.MdcAutocomplete;
});