const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

/*
run `rm -rf node_modules/webpack/node_modules/uglifyjs-webpack-plugin` after `npm install`
see https://stackoverflow.com/questions/42375468/uglify-syntaxerror-unexpected-token-punc
*/

module.exports = {
    entry: [
        './main.js'
    ],
    output: {
        path: path.resolve(__dirname, 'bundles'),
        publicPath: '/bundles/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                    }
                ]
            }
        ]
    },
    plugins: [
        new UglifyJSPlugin()
    ],
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        }
    },
    devServer: {
        contentBase: './'
    }
};