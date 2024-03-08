const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: "/",
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      fallback: {
        crypto: require.resolve('crypto-browserify'),
        util: require.resolve('util/'),
        stream: require.resolve('stream-browserify'),
      }
    },
  },
})
