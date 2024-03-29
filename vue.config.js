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
    name: 'App Hub',
    themeColor: '#eee',
    iconPaths: {
      favicon32: 'img/icons/favicon-32x32.png',
      favicon16: 'img/icons/favicon-16x16.png',
      appleTouchIcon: 'img/icons/apple-touch-icon.png',
      maskIcon: null,
      msTileImage: 'img/icons/mstitle-150.png'
    }
  }
}
