const path = require('path'); /* eslint-disable-line */

module.exports = {
  lintOnSave: false,
  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import "~@/assets/style/_variables.scss";',
      },
    },
  },
};
