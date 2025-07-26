const path = require('path');

module.exports = {
  entry: './index.web.js',
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'web'),
    },
    compress: true,
    port: 3000,
    hot: true,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.web.js'],
    alias: {
      'react-native$': 'react-native-web',
    },
  },
  output: {
    path: path.resolve(__dirname, 'web'),
    filename: 'bundle.js',
  },
};