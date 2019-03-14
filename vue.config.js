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
  }
}
