module.exports = {
  // configureWebpack: config => {
  //   config.output.chunkFilename = '[name].bundle.js'
  //   config.optimization = { splitChunks: { chunks: 'all' } }
  // },
  // whitespace: 'preserve',
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        // https://stackoverflow.com/questions/51304187/spaces-are-gone-in-html-after-upgrading-to-vue-cli-3/51305324#51305324
        options.compilerOptions.preserveWhitespace = true
        return options
      })
  }
}
