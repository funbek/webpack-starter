const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, './src'),
    entry: {
        app: './app.js',
        admin: './admin.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist', // Need for devServer

    },
    devServer: {
        contentBase: path.resolve(__dirname, './src'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: { presets: ['es2015'] }
                }],
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader','sass-loader']
                })
            },
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'commons',
            filename: 'commons.js',
            nimChunks: 2,
        }),
        // new HtmlWebpackPlugin({
        //     chunks: ['app', 'commons'],
        //     filename: 'index.html'
        // }),
        new ExtractTextPlugin('styles.css', {
            allChunks: true
        })
    ]
}
