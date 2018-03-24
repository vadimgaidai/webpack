const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');



module.exports = {
    entry: {
        index: './index.js'
    },
    plugins: [
        new CleanWebpackPlugin(['production']),
    ],
    output: {
       filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'production')
    }
 };