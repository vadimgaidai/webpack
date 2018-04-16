let webpack = require('webpack');
let path = require('path');


//let ExtractTextPlugin = require("extract-text-webpack-plugin");
let autoprefixer = require('autoprefixer');
let CleanWebpackPlugin = require("clean-webpack-plugin");
let MiniCssExtractPlugin = require("mini-css-extract-plugin");
let WebpackMd5Hash = require('webpack-md5-hash');
let HtmlWebpackPlugin = require('html-webpack-plugin');




let conf = {

    entry: './app/source/entry/entry.js',

    output: {
        //path: path.resolve(__dirname, './app/public'),
        filename: 'js/[name].[chunkhash].js',
        path: path.resolve(__dirname, 'build'),
        publicPath: '/'
    },
    stats: { //object
        assets: true,
        colors: true,
        errors: true,
        errorDetails: true,
        hash: true
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

                    use: [
                        {
                            loader: 'style-loader',
                            options: {
                                sourceMap: true

                            }

                        },
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true

                            }

                        },

                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    autoprefixer({
                                        browsers:['ie >= 8', 'last 4 version']
                                    })
                                ],
                                sourceMap: true
                            }
                        },
                        'group-css-media-queries-loader',
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }

                    ]


            },
            {
                test: /\.pug$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].html'
                        }
                    },
                    {
                        loader: 'pug-html-loader',
                        options: {
                            pretty: true
                        }


                    }
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg|ico)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[name].[ext]'
                        }
                    }
                ],
                exclude: [path.resolve(__dirname, 'app', 'public', 'fonts')],
                include: [

                    path.resolve(__dirname, 'app', 'public', 'images')
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)(\?.*$|$)/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'fonts/[name].[ext]',
                            publicPath: '../'
                        }
                    }
                ],
                include: [
                    path.resolve(__dirname, 'node_modules'),
                    path.resolve(__dirname, 'app', 'public', 'fonts')
                ]

            }


        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/style.[contenthash].css',
        }),
        new CleanWebpackPlugin(['build']),
        new WebpackMd5Hash()


    ],


    devtool: "eval-source-map"





};

module.exports = (env, options) => {
    let prodaction = options.mode === 'production';

    conf.devtool = prodaction
                            ?   "source-map"
                            :   "eval-source-map";


    return conf;
}
