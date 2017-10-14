'use strict';

System.register(['aurelia-pal', './config', './mdc-target', './elements/mdc-checkbox', './elements/mdc-datepicker', './helpers'], function (_export, _context) {
    "use strict";

    var PLATFORM, MdcConfig, MDC_TARGET_ATTR, MDC_INIT_ATTR, MdcTarget, MdcCheckbox, MdcDatepicker, pluginConfig;
    function configure(config, callback) {
        pluginConfig = config.container.get(MdcConfig);

        if (callback !== undefined && typeof callback === 'function') {
            callback(pluginConfig);
        }

        config.globalResources(PLATFORM.moduleName('./mdc-target'));
        config.globalResources('./elements/mdc-checkbox');
        config.globalResources('./elements/mdc-datepicker');

        config.aurelia.resources.registerViewEngineHooks({
            beforeCompile: beforeViewCompiled
        });
    }

    _export('configure', configure);

    function beforeViewCompiled(content) {
        var elements = content.querySelectorAll(pluginConfig.mdcSelectors);
        if (elements.length === 0) return;

        for (var i = 0; i < elements.length; i++) {
            var item = elements.item(i);
            var componentName = pluginConfig.getComponentName(item);
            item.setAttribute(MDC_TARGET_ATTR, componentName);
            item.setAttribute(MDC_INIT_ATTR, componentName);
        }
    }

    return {
        setters: [function (_aureliaPal) {
            PLATFORM = _aureliaPal.PLATFORM;
        }, function (_config) {
            MdcConfig = _config.MdcConfig;
            MDC_TARGET_ATTR = _config.MDC_TARGET_ATTR;
            MDC_INIT_ATTR = _config.MDC_INIT_ATTR;
        }, function (_mdcTarget) {
            MdcTarget = _mdcTarget.MdcTarget;
        }, function (_elementsMdcCheckbox) {
            MdcCheckbox = _elementsMdcCheckbox.MdcCheckbox;
        }, function (_elementsMdcDatepicker) {
            MdcDatepicker = _elementsMdcDatepicker.MdcDatepicker;
        }, function (_helpers) {
            var _exportObj = {};
            _exportObj.ensureAttached = _helpers.ensureAttached;

            _export(_exportObj);
        }],
        execute: function () {
            pluginConfig = void 0;

            _export('MdcTarget', MdcTarget);

            _export('MdcCheckbox', MdcCheckbox);

            _export('MdcDatepicker', MdcDatepicker);
        }
    };
});