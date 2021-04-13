const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

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
            path: __dirname,
            filename: 'index.js',
        },
        devtool: 'source-map',
        
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
                },
                {
                    test: /\.(png|jpg|jpeg|gif|ico')$/,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            outputPath: 'images',
                            name: '[name]-[sha1:hash:7].[ext]'
                        }

                    }]
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