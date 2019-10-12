/**
 * @file webpack.config
 * @author y
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './example/index.ts',
    output: {
        filename: './dist/bundle.js'
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: 'source-map',

    devServer: {
        contentBase: './dist',
        hot: true,
        port: 7474,
        host: '0.0.0.0'
    },

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.ts', '.tsx', '.js']
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {
                test: /\.tsx?$/,
                use: 'awesome-typescript-loader',
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                enforce: 'pre',
                use: 'source-map-loader'
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './example/index.html'
        })
    ]
};
