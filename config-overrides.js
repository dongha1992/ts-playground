// /* eslint-disable react-hooks/rules-of-hooks */
// /* eslint-disable @typescript-eslint/no-var-requires */

// const path = require('path');
// const { override, getBabelLoader } = require('customize-cra');
// const webpack = require('webpack');

// module.exports = override(removeBuiltinBabelConfig, enableBabelConfig, addResolveFallback);

// function removeBuiltinBabelConfig(config) {
//   const loader = getBabelLoader(config);

//   loader.options.presets = [];
//   loader.options.plugins = [];

//   return config;
// }

// function enableBabelConfig(config) {
//   const loader = getBabelLoader(config);
//   loader.options.configFile = path.resolve(__dirname, 'babel.config.js');
//   return config;
// }

// function addResolveFallback(config) {
//   const fallback = config.resolve.fallback || {};
//   Object.assign(fallback, {
//     // crypto: require.resolve('crypto-browserify'),
//     // stream: require.resolve('stream-browserify'),
//     // assert: require.resolve('assert'),
//     // http: require.resolve('stream-http'),
//     // https: require.resolve('https-browserify'),
//     // os: require.resolve('os-browserify'),
//     // url: require.resolve('url'),
//     // path: require.resolve('path'),
//     // fs: require.resolve('fs'),
//     path: false,
//     buffer: false,
//     crypto: false,
//     fs: false,
//     module: false,
//     assert: false,
//   });
//   config.resolve.fallback = fallback;
//   config.plugins = (config.plugins || []).concat([
//     new webpack.ProvidePlugin({
//       process: 'process/browser.js',
//       Buffer: ['buffer', 'Buffer'],
//     }),
//   ]);
//   return config;
// }

const { override, addBabelPreset } = require('customize-cra');
module.exports = override(addBabelPreset('@emotion/babel-preset-css-prop'));
