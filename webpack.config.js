let webpack = require('webpack');
let path = require('path');
let ExtractTextPlugin = require("extract-text-webpack-plugin");


let extractStyle = new ExtractTextPlugin({
    filename: "css/[name].bundle.css"

});


let conf = {
    entry: './app/source/entry/entry.js',
    output: {
        path: path.resolve(__dirname, './app/public/'),
        filename: 'js/[name].bundle.js',
        publicPath: 'app/public'

    },
    devServer:{
        compress: true,
        overlay: true,
        open: true
    },
    module:{
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                //execlude: '/node_modules/'
            },
            {
                test: /\.(css|sass)$/i,
                use: extractStyle.extract({
                    use: [{
                        loader: "css-loader"

                    }, {
                        loader: "sass-loader"
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            }
        ]
    },

    plugins: [
        extractStyle
    ],


    devtool: "eval-sourcemap"





};

module.exports = (env, options) => {
    let prodaction = options.mode === 'production';

    conf.devtool = prodaction
                            ?   "source-map"
                            :   "eval-sourcemap";


    return conf;
}
