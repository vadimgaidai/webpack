const webpack = require('webpack');
const path = require('path');

//plugins
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: '../css/[name].css'

});





const sassExtractor = () => {
    return extractSass.extract({
        use: [{
            loader: "css-loader",
            options: {
                sourceMap: true,
                root: path.resolve(__dirname, 'app')
                //minimize: (process.env.NODE_ENV === 'production')
            }
        }, {
            loader: "sass-loader",
            options: {
                sourceMap: true,

                includePaths: [
                    'node_modules/'

                ]
            }
        }],
        fallback: "style-loader"
    })
};






//modules settings


module.exports = {
    //базовый путь к проекту
    context: path.resolve(__dirname, "app"),

    //настройки точки входа entry
    entry: {
        //основной файл приложения
        app: [path.resolve(__dirname,  'app', 'source', 'entry', 'app.js')]

    },
    //путь собранных файлов
    output: {
        filename: 'js/[name].js',
        chunkFilename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'app', 'public')

    },
    stats: {
        assets: true,
        colors: true,
        errors: true,
        errorDetails: true,
        hash: true
    },
    module: {
        //правила обработки
        rules: [

            {
                test: /\.(sass|css)$/i,
                use: sassExtractor()
            },

            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    presets: ["env"]
                }
            }

        ]
    },
    resolve: {

        extensions: ['.entry','.es6', '.css', '.sass']
    },


    plugins: [
        //new ExtractTextPlugin("main.css")
       // extractSass
    ],


    devtool: "source-map",


    //конфигурация devServer
    devServer: {
        contentBase: path.join(__dirname, 'app', 'public'),
        port: 8080,
        compress: true,
        open: false

    }
}