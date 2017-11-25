// this file will be used by default by babel@7 once it is released
module.exports = () => {
    return {
        "presets": [['es2015', { loose: true }], 'stage-1'],
        "plugins": [
            "transform-decorators-legacy",
            "transform-class-properties"
        ]
    }
}
