const coffee = require('coffeescript')
const babelJest = require('babel-jest')
const babelPresentEnv = require('@babel/preset-env')
const babelTransformRuntime = require('@babel/plugin-transform-runtime')

module.exports = {
  process: (src, path) => {
    if (coffee.helpers.isCoffee(path)) {
       const result = coffee.compile(src, {
        bare: true,
        sourceMap: true,
        filename: path,
        transpile: {presets: [babelPresentEnv],
        plugins:  [[babelTransformRuntime, {
            "regenerator": true
          }
        ]]
      }})

      return {
        code: result.js,
        map: result.v3SourceMap
      }
    }
    if (!/node_modules/.test(path)) {
      return babelJest.process(src, path);
    }
    return src;
  }
};


