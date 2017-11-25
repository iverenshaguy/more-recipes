module.exports = {
  watch: true,
  stats: {
    colors: true
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: [/node_modules/],
        use: [{ 
          loader: "sass-loader",
          options: {
            includePaths: ['src/']
          }
        }]
      }
    ]
  }
};
