const webpack = require('webpack')
const { merge, mergeWithRules, mergeWithCustomize, customizeArray, unique } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const ExtendHtmlWebpackPlugin = require('./plugin/extend-plugin')
const rule1 = {
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve('index.html'),
            filename: 'index.html',
            inject: 'body'
        }),
        new webpack.DefinePlugin({
            'process.env.test':
            {
                name: "456"
            }
        })
    ]
}

const rule2 = {
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve('index2.html'),
            filename: 'index.html',
            inject: 'head'
        }),
        new webpack.DefinePlugin({
            'process.env.test':
            {
                name: "13"
            }
        }),
        new ExtendHtmlWebpackPlugin({})
    ]
}

const existPluginName = rule1.plugins.map(plugin=>{
    return plugin.constructor && plugin.constructor.name
})
// unique 两个plugin只会保留一个(后面的替换前面)
const rule = mergeWithCustomize({
    customizeArray: unique('plugins', existPluginName, (plugin => plugin.constructor && plugin.constructor.name))
})(rule1, rule2)
console.log(rule)