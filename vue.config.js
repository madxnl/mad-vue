module.exports = {
  chainWebpack: config => {
    config.module
    .rule("vue")
    .use("vue-loader")
    .loader("vue-loader")
    .tap(options => {
        // https://stackoverflow.com/questions/51304187/spaces-are-gone-in-html-after-upgrading-to-vue-cli-3/51305324#51305324
        options.compilerOptions.preserveWhitespace = true;
        return options;
      })
  }
}