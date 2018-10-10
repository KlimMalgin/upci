const path              = require('path');
const webpack           = require('webpack');
const UglifyJSPlugin    = require('uglifyjs-webpack-plugin');
let options = {};

module.exports = {
    entry  : { index: path.resolve( __dirname, 'src/index.js' ) },
    output : {
        path       : path.resolve( __dirname, './dist/' ),
        publicPath : '/dist/',
        filename   : '[name].js',
    },
    module : {
        rules : [
            {
                test   : /\.css$/,
                loader : 'style-loader!css-loader',
            },

            {
                test   : /\.less$/,
                loader : 'style-loader!css-loader!less-loader',
            },

            {
                test : /\.scss$/,
                use  : [
                    'style-loader', // creates style nodes from JS strings
                    'css-loader', // translates CSS into CommonJS
                    'sass-loader', // compiles Sass to CSS
                ],
            },

            {
                test    : /\.(ttf|eot|woff|woff2)$/,
                loaders : [
                    'file-loader?name=[name].[hash].[ext]',
                ],
            },

            {
                test    : /\.js$/,
                loader  : 'babel-loader',
                exclude : /node_modules/,
            },
            {
                test    : /\.(png|jpg|gif|svg)$/,
                loader  : 'file-loader',
                options : { name: '[name].[ext]?[hash]' },
            },

        ],
    },
    resolve : {
        unsafeCache : true,
        modules     : [
            path.resolve('./node_modules'),
        ],
    },
    devServer : {
        historyApiFallback : true,
        noInfo             : true,
    },
    performance : { hints: false },
    devtool     : '#eval-source-map',
};

if ( process.env.NODE_ENV === 'production' ) {
    options.devtool = '#source-map';

    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = ( module.exports.plugins || [] ).concat( [
        new webpack.DefinePlugin( { 'process.env': { NODE_ENV: `"${process.env.NODE_ENV}"` } } ),
        new webpack.optimize.UglifyJsPlugin( { sourceMap: options.devtool && options.devtool.indexOf('source-map') >= 0 } ),
    ] );
}
