/*
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

    module.exports = merge(common, {
        devtool: 'inline-source-map',
        devServer: {
            contentBase: './development/public/'
        }
    });*/
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    context: __dirname + "/src",
    entry: "./index",
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ]
});