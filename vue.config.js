module.exports = {
  configureWebpack: {
    plugins: [
      (() => {
        var ImageminPlugin = require('imagemin-webpack-plugin').default
        return new ImageminPlugin({
          disable: process.env.NODE_ENV !== 'production',
          pngquant: {
            quality: '80-100'
          }
        })
      })()
    ]
  },
  pwa: {
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true
    },
    name: 'VeChain Apps',
    appleMobileWebAppCapable: 'yes',
    themeColor: '#2f353b'
  }
}
