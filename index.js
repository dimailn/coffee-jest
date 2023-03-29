const coffee = require('coffeescript')
const babelJest = require('babel-jest')

module.exports = {
  process: (src, path, options) => {
    if (coffee.helpers.isCoffee(path)) {
       const js = coffee.compile(src, {
        bare: true,
        inlineMap: true,
        filename: path
      })

      const result = babelJest.createTransformer().process(js, path, options)

      return {
        code: result.code
      }
    }
    if (!/node_modules/.test(path)) {
      return babelJest.process(src, path);
    }
    return src;
  }
};


