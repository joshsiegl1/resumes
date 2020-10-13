const path = require('path'); 
const webpack = require('webpack'); 
const HtmlWebpackPlugin = require('html-webpack-plugin'); 

module.exports = { 
    mode: 'development', 
    entry: path.join(__dirname, 'src/index.tsx'), 
    output: { 
        filename: '[name].js', 
        path: path.resolve(__dirname, 'dev'), 
        publicPath: '/'
    }, 
    module: { 
        rules: [ 
            { 
                test: /\.jsx?$/, 
                exclude: /node_modules/, 
                use: ['babel-loader']
            }, 
            { 
                test: /\.tsx?$/,
                use: 'ts-loader', 
                exclude: '/node_modules/'
            }, 
            { 
                test: /\.css$/, 
                use: ['style-loader', { loader: 'css-loader'}]
            }
        ]
    }, 
    resolve: { 
        modules: [path.join(__dirname, 'src'), 'node_modules'], 
        extensions: ['*', '.js', '.jsx', '.ts', '.tsx']
    }, 
    devtool: 'inline-source-map', 
    devServer: { 
        contentBase: path.join(__dirname, 'dev'), 
        historyApiFallback: true, 
        hot: true
    }, 
    plugins: [ 
        new webpack.HotModuleReplacementPlugin(), 
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/index.html')
        })
    ]
}