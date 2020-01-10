const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('./paths');
const rules = require('./rules');

module.exports = {
    entry: paths.entryPath,
    module: {
        rules
    },
    resolve: {
        modules: ['src', 'node_modules'],
        extensions: ['*', '.js', '.scss', '.css']
    },
    plugins: [
        new Dotenv({
            safe: true,
            systemvars: true,
            silent: true,
            defaults: false,
          }), 
      
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
            template: paths.templatePath,
            minify: {
                collapseInlineTagWhitespace: true,
                collapseWhitespace: true,
                preserveLineBreaks: true,
                minifyURLs: true,
                removeComments: true,
                removeAttributeQuotes: true
            }
        })
    ]
};
