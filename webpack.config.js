const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: [
    './client/index.js'
  ],
  
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-react'
          ]
        }
      },
      {
        test: /\.css$/,
        use: [{loader:'style-loader'}, {loader:'css-loader'}, {loader:'postcss-loader'}]
      },
      {
        test: /\.png$/,
        use: [{loader:'file-loader'}]
      }
    ]
  },
  plugins: [
    new Dotenv({
      systemvars: true
    }),
  ],
}
