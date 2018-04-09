let webpack = require('webpack');
let path = require('path');


let ExtractTextPlugin = require("extract-text-webpack-plugin");
let autoprefixer = require('autoprefixer');


let extractStyle = new ExtractTextPlugin({
    filename: "css/[name].bundle.css"
    //disable: (process.env.NODE_ENV === 'development')
});


let conf = {
    entry: './app/source/entry/entry.js',
    output: {
        path: path.resolve(__dirname, './app/public/'),
        filename: 'js/[name].bundle.js',
        publicPath: 'app/public'

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
                use: extractStyle.extract({
                    use: [
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

                    ],
                    // use style-loader in development
                    fallback: "style-loader"
                })
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
                        loader: 'extract-loader'
                    },
                    {
                        loader: "html-loader",
                        /*options: {
                            ignoreCustomFragments: [/\{\{.*?}}/],
                            root: path.resolve(__dirname, 'resources'),
                            interpolate: 'require',
                            attrs: ['img:src']
                        }*/
                    },
                    {
                        loader: 'pug-loader',
                        options: {
                            pretty: true
                        }

                    }
                ]
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
