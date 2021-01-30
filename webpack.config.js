module.exports = {
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: ['vue-loader', 'vue-svg-loader']
      }
    ]
  }
}
