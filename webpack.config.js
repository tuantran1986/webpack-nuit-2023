const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');

// CYDB - CÚ PHÁP : exports - bản chất là 1 OBJECT !!!
    // entry    : đầu vào
    // output   : đầu ra
    // module   : 
        // RULE 1 = chuyển REQUIRE sang IMPORT = 'babel-loader'
        // RULE 2 = import CSS = 'style-loader','css-loader'

const VENDOR_LIBS = [
    'axios',
    'bootstrap',
    'jquery',
    'react',
    'react-dom',
    'react-redux',
    'react-router-dom',
    'redux',
    'redux-thunk'
];

// cau hinh - webpack-dev-server
const devServer = {
    port: 4000,
    open: true,
    disableHostCheck: true,
    historyApiFallback: true,
    overlay: true,
    compress: true,
    contentBase: '/'
}


module.exports = {
    entry: {
        bundle: './src/index.js',
        vendor: VENDOR_LIBS
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
        // filename: '[name].js'
        // filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.js$/,
                exclude: '/node_modules/'
            },
            {
                use: [
                    'style-loader',
                    'css-loader'
                ],
                test: /\.css$/
            },
            {
                loader: 'file-loader',
                test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.woff2$|\.eot$|\.ttf$|\.wav$|\.mp3$|\.ico$/ 
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            '$': 'jquery',
            'jQuery': 'jquery',
            'window.$': 'jquery',
            'window.jQuery': 'jquery'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
            // name: 'vendor'
        }),
        new htmlWebpackPlugin({
            // lấy TEMPLATE tại địa chỉ ''src/index.html' ==> để tạo ra file INDEX.HTML (trong DIST)
            template: 'src/index.html'
        })
    ],
    devServer
}