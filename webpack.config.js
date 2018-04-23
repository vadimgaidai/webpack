let webpack = require('webpack');
let path = require('path');



let autoprefixer = require('autoprefixer');
let CleanWebpackPlugin = require("clean-webpack-plugin");
let MiniCssExtractPlugin = require("mini-css-extract-plugin");
let WebpackMd5Hash = require('webpack-md5-hash');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');




let conf = {

    entry: './app/source/entry/entry.js',

    output: {
        //path: path.resolve(__dirname, './app/public'),
        filename: 'js/[name].[hash].js',
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
                exclude: /(node_modules)/,
                loader: 'babel-loader'

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
                test: /\.(jpe?g|png|gif|ico)(\?.*)?$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[name].[ext]'
                        }
                    },

                    //'img-loader',
                    {
                        loader: 'img-loader',
                        options: {
                            enabled: process.env === 'production',
                            gifsicle: {
                                interlaced: false
                            },
                            mozjpeg: {
                                progressive: true,
                                arithmetic: false
                            },
                            optipng: false, // disabled
                            pngquant: {
                                floyd: 0.5,
                                speed: 2
                            }

                        }
                    }
                    //'img-loader',
                ],
                exclude: [path.resolve(__dirname, 'app', 'public', 'fonts')],

            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)(\?.*$|$)/,
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

            },
            {
                test: /\.pug$/,
                use: [


                    {
                        loader: 'pug-loader',
                        options: {
                            pretty: true

                        }

                    }
                ],
                include: [
                    path.resolve(__dirname, 'app')

                ]



            }
            /*{ test: /\.html$/, loader: 'html-loader', exclude: /index\.html$/ },
            {
                test: /index\.html$/,
                loader: 'html',
                query: {
                    interpolate: true,
                    minimize: false,
                    ignoreCustomFragments: [/\{\{.*?}}/],
                    attrs: ['img:src', 'link:href']
                }
            }*/



        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/style.[contenthash].css',
        }),
        new CleanWebpackPlugin(['build']),
        new WebpackMd5Hash(),
        new HtmlWebpackPlugin({
            // Required
            inject: false,

            template: 'app/source/pages/index.pug',
            //template: require('html-webpack-template-pug'),
            //template: '!!pug-loader?attrs=img:src?pretty=true!app/source/pages/index.pug',
            // Optional
            mobile: true


        }),

       new SVGSpritemapPlugin({
            src: 'app/public/svg/!*.svg',
            filename: 'sprite/sprite.svg',
            prefix: 'icon-',
            gutter: 2,
            svgo:{
                removeDoctype: false,
                removeViewBox: false,
                removeUnusedNS: true
            },
            svg4everybody: {
                nosvg: true, // shiv <svg> and <use> elements and use image fallbacks
                polyfill: true // polyfill <use> elements for External Content

            }

        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })

    ],


    devtool: "eval"





};


module.exports = (env, options) => {
    let prodaction = options.mode === 'production';

    conf.devtool = prodaction
                            ?   "source-map"
                            :   "eval";


    return conf;
}
