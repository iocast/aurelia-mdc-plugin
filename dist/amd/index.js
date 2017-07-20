define(['exports', './helpers', 'aurelia-pal', './config', './mdc-target', './elements/mdc-checkbox'], function (exports, _helpers, _aureliaPal, _config, _mdcTarget, _mdcCheckbox) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.MdcCheckbox = exports.MdcTarget = exports.ensureAttached = undefined;
    Object.defineProperty(exports, 'ensureAttached', {
        enumerable: true,
        get: function () {
            return _helpers.ensureAttached;
        }
    });
    exports.configure = configure;


    var pluginConfig = void 0;

    function configure(config, callback) {
        pluginConfig = config.container.get(_config.MdcConfig);

        if (callback !== undefined && typeof callback === 'function') {
            callback(pluginConfig);
        }

        config.globalResources(_aureliaPal.PLATFORM.moduleName('./mdc-target'));
        config.globalResources('./elements/mdc-checkbox');

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
});