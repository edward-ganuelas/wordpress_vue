const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: ['babel-polyfill', './src/js/main.js'],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'inline-source-map',
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        }
    },
    devServer: {
        contentBase: './dist'
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            { test: /\.vue$/, loader: 'vue-loader' }
        ]
    },
    node: {
        fs: 'empty'
    }
}