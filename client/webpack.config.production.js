const path = require('path'); 
const webpack = require('webpack'); 
const HtmlWebpackPlugin = require('html-webpack-plugin'); 

module.exports = { 
    mode: 'production', 
    entry: { 
        main: path.join(__dirname, 'src/index.tsx')
    }, 
    output: { 
        path: path.resolve(__dirname, 'build'), 
        filename: '[name]-[hash].js', 
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
                use: [ 
                    'style-loader', 
                    { 
                        loader: 'css-loader', 
                        options: { sourceMap: true }
                    }
                ]
            }
        ]
    }, 
    resolve: { 
        modules: [path.join(__dirname, 'src'), 'node_modules'], 
        extensions: ['*', '.js', '.jsx', '.css', '.ts', '.tsx']
    }, 
    plugins: [ 
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/index.html')
        })
    ]
}