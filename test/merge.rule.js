const { mergeWithRules, unique, mergeWithCustomize } = require('webpack-merge')
const webpack = require('webpack')
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const rule1 = {
    entry: '1',
    module: {
        rules: [{
            test: '1',
            include: ['1'],
            options: {
                presets: '123',
                plugin: [
                    'babel-plugin-components'
                ]
            }
        }]
    },
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
    entry: '2',
    module: {
        rules: [{
            test: '1',
            include: ['2222'],
            options: {
                plugin: [
                    'babel-plugin-import'
                ]
            }
        }]
    },
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
        })
    ]
}


const rule = mergeWithRules({
    module: {
        rules: {
            test: 'match',
            include: 'replace',
            options: 'merge'
        }
    }
})(rule1, rule2)

const existPluginName = rule1.plugins.map(plugin => {
    return plugin.constructor && plugin.constructor.name
})
// unique 两个plugin只会保留一个(后面的替换前面)
const plugin = mergeWithCustomize({
    customizeArray: unique(
        "plugins",
        existPluginName,
        (plugin) => {
            return plugin.constructor && plugin.constructor.name
        }
    ),
    customizeObject: (a, b, key) => {
        if (key === 'module') {
            const result = mergeWithRules({
                rules: {
                    test: 'match',
                    include: 'replace',
                    options: 'merge'
                }
            })(a, b)
            return result
        }

    }
})(rule1, rule2)

console.log(rule, plugin)