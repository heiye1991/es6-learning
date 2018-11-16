/**
 * created by : heiye1991
 * created time: 2018-11-16
 * description:
 */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    index: path.join(__dirname, './src/index.js'), // 入口文件
  },
  output: {
    path: path.join(__dirname, './dist'), // 打包文件的输出目录
    filename: '[name].js' // 打包生成的文件
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
        include: [path.resolve(__dirname, './src')]
      }
    ]
  },
  plugins: [
    // 生成html
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './index.html'),
      filename: 'index.html',
      minify: {
        removeComments: true, //删除注释
        collapseWhitespace: true // 去除空格
      }
    })
  ],
  devServer: {
    port: '8080',
    contentBase: path.join(__dirname, './index.html'),
    open: true // 自动打开浏览器
  }
}