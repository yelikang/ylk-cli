
const path = require('path');
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
// 加载项目env配置，注入环境变量(runcommand启用新的进程，无法使用run.js中注册的环境变量)
// 默认读取当期目录下的.env文件 并添加到process.env上
require('dotenv').config()

module.exports = {
    context: path.resolve(__dirname, '../../'),
    entry: path.resolve('./src/main.js'),
    output: {
        path: path.resolve('./dist'),
        filename: '[name].js'
    },
    cache: {
        type: 'filesystem',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                include: [
                    path.resolve('src')
                ],
                options: {
                    "presets": [require('@vue/babel-preset-jsx')],
                    "plugins": [
                        require('@babel/plugin-transform-runtime'),
                    ]
                }
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true
                }
            },
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader'
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg|mp4|webm|ogg|mp3|wav|flac|aac|woff2?|eot|ttf|otf)(\?.*)?$/,
                type: 'asset/resource',
            },
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new webpack.IgnorePlugin({
            resourceRegExp: /^\.\/locale$/,
            contextRegExp: /moment$/
        }),
    ],
    resolve: {
        extensions: ['.js', '.vue', '.json', '.ts', '.jsx'],
        alias: {
            '@': path.resolve('src'),
            'utils': path.resolve('src/utils'),
            'config': path.resolve('config'),
            'components': path.resolve('src/components')
        }
    },
    externals: {
    }
}