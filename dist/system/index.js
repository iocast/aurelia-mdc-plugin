'use strict';

System.register(['aurelia-pal', './config', './elements/mdc-datepicker', './elements/mdc-timepicker', './elements/mdc-autocomplete', 'material-components-web'], function (_export, _context) {
    "use strict";

    var PLATFORM, MdcConfig, MDC_INIT_ATTR, MDC_DISABLE_INIT_ATTR, MdcDatepicker, MdcTimepicker, MdcAutocomplete, autoInit, pluginConfig;
    function configure(config, callback) {
        pluginConfig = config.container.get(MdcConfig);

        if (callback !== undefined && typeof callback === 'function') {
            callback(pluginConfig);
        }

        config.globalResources(PLATFORM.moduleName('./elements/mdc-datepicker'));
        config.globalResources(PLATFORM.moduleName('./elements/mdc-timepicker'));
        config.globalResources(PLATFORM.moduleName('./elements/mdc-autocomplete'));

        config.aurelia.resources.registerViewEngineHooks({
            beforeCompile: beforeCompiled,
            afterCreate: afterViewCreated
        });
    }

    _export('configure', configure);

    function beforeCompiled(content) {
        var elements = content.querySelectorAll(pluginConfig.mdcSelectors);
        if (elements.length === 0) return;

        for (var i = 0; i < elements.length; i++) {
            var item = elements.item(i);
            var componentName = pluginConfig.getComponentName(item);

            if (!item.hasAttribute(MDC_DISABLE_INIT_ATTR)) item.setAttribute(MDC_INIT_ATTR, componentName);
        }
    }

    function afterViewCreated(view) {
        autoInit(view.fragment, function () {});
    }

    return {
        setters: [function (_aureliaPal) {
            PLATFORM = _aureliaPal.PLATFORM;
        }, function (_config) {
            MdcConfig = _config.MdcConfig;
            MDC_INIT_ATTR = _config.MDC_INIT_ATTR;
            MDC_DISABLE_INIT_ATTR = _config.MDC_DISABLE_INIT_ATTR;
        }, function (_elementsMdcDatepicker) {
            MdcDatepicker = _elementsMdcDatepicker.MdcDatepicker;
        }, function (_elementsMdcTimepicker) {
            MdcTimepicker = _elementsMdcTimepicker.MdcTimepicker;
        }, function (_elementsMdcAutocomplete) {
            MdcAutocomplete = _elementsMdcAutocomplete.MdcAutocomplete;
        }, function (_materialComponentsWeb) {
            autoInit = _materialComponentsWeb.autoInit;
        }],
        execute: function () {
            pluginConfig = void 0;

            _export('MdcDatepicker', MdcDatepicker);

            _export('MdcTimepicker', MdcTimepicker);

            _export('MdcAutocomplete', MdcAutocomplete);
        }
    };
});