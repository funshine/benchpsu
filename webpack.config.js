var webpack = require('webpack');
var webpackTargetElectronRenderer = require('webpack-target-electron-renderer');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');

var config = {
    entry: {
        mainWindow: ['./app/mainWindow.jsx']
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015'],
                }
            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015'],
                }
            }, {
                test: /\.less$/,
                loader: 'style!css!postcss!less'
            }, {
                test: /\.css/,
                loader: ExtractTextPlugin.extract('style', 'css', 'postcss')
            }, {
                test: /\.(png|jpg)$/,
                loader: 'url?limit=25000'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            DEBUG: process.env.NODE_ENV !== 'production'
        }),
        new ExtractTextPlugin('weui.min.css'),
        new webpack.ExternalsPlugin('commonjs', ['fs']),
        new webpack.IgnorePlugin(/vertx/)
    ]
}

config.target = webpackTargetElectronRenderer(config);
module.exports = config;