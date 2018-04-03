const webpack = require('webpack');
const path = require('path');

//plugins
const ExtractTextPlugin = require("extract-text-webpack-plugin");




const extractSass = new ExtractTextPlugin({
    filename: 'css/[name].css'
});



const sassExtractor = () => {
    return extractSass.extract({
        use: [{
            loader: "css-loader",
            options: {
                sourceMap: true

                //minimize: (process.env.NODE_ENV === 'production')
            }
        }, {
            loader: "sass-loader",
            options: {
                sourceMap: true,
                root: path.resolve(__dirname, 'src'),
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
    context: path.resolve(__dirname, "src"),

    //настройки точки входа js
    entry: {
        //основной файл приложения
        app: [path.resolve(__dirname, 'src',  'app.js')]

    },
    //путь дял собранных файлов
    output: {
        filename: 'js/[name].js',
        chunkFilename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '../'
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
                test: /\.sass$/,
                use: sassExtractor()
            },
            {
                test: /\.css$/,
                use: sassExtractor()
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    presets: ["env"]
                }
            }
               /* test: /\.(sass)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                    ],
                    fallback: 'style-loader'
                })*/


        ]
    },
    resolve: {
        // options for resolving module requests
        // (does not apply to resolving to loaders)

       /* modules: [
            path.resolve(__dirname, "node_modules"),
            path.resolve(__dirname, "resources")
        ],*/


        extensions: ['.js','.es6', '.css', '.sass']
    },


   /* plugins: [
        new ExtractTextPlugin("main.css")
    ],*/


    devtool: "source-map",


    //конфигурация devServer
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 8080,
        compress: true,
        open: false

    }
}