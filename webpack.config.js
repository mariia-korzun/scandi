const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = (env, argv) => {

    const isProd = argv.mode === 'production'

    const getStyleLoaders = () => {
        return [
            isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader'
        ]
    }

    return {
        output: {
            path: path.resolve(__dirname, 'root'),
            filename: 'index.js',
        },
        mode: "development",
        devServer: {
            open: true
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                },
                {
                    test: /\.(css)$/,
                    use: getStyleLoaders()
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'Carousel React App',
                template: 'public/index.html'
            }),
            new MiniCssExtractPlugin()
        ]
    }
}