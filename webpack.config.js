const path = require('path');

module.exports = {
    entry: ['./src/js/main.js'],
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
    module:{
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
          ]
    }
}