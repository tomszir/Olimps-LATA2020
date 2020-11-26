const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '/',
    filename: '[name].bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.png', '.jpg', '.css'],
    alias: {
      '~': path.resolve(__dirname, '/'),
      '@': path.resolve(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' },
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpe?g|png)$/,
        loader: 'responsive-loader',
        options: {
          name: '[name]-[width].[hash].[ext]',
          outputPath: 'assets/',
          publicPath: 'assets/',
          sizes: [380, 768, 1024, 1368],
          placeholder: true,
          placeholderSize: 40,
          format: 'jpg',
          quality: 70,
        },
      },
      {
        test: /\.svg$/,
        loader: 'svg-url-loader',
        options: {
          limit: 10 * 1024,
          noquotes: true,
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
};
