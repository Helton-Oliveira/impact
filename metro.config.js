const {getDefaultConfig} = require("expo/metro-config");
const {withNativeWind} = require('nativewind/metro');
const path = require('path');

const config = getDefaultConfig(__dirname);

config.watchFolders = [
    path.resolve(__dirname, 'mobile'),
];

config.resolver.nodeModulesPaths = [
    path.resolve(__dirname, 'mobile/node_modules'),
    path.resolve(__dirname, 'node_modules'),
];

module.exports = withNativeWind(config, {
    input: "./mobile/styles/global.css",
});