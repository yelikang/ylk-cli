const { mergeWithRules, unique, mergeWithCustomize } = require('webpack-merge')


const findPlugin = (plugins, pluginName) => {
    const index = plugins.findIndex(plugin => {
        return plugin.constructor.name === pluginName
    })
    return {
        index,
        plugin: plugins[index]
    }

}
const adapterPlugin = {
    "MiniCssExtractPlugin": function(defaultPlugins, customPlugins){
        // MiniCssExtractPlugin 合并时不能直接使用全量替换(loader中配置的MiniCssExtractPlugin.loader会与首次初始化的plugin对象关联；这里全量替换后会报错；所以只能增量合并属性)
        // 1.查找自定义配置项中是否配置了MiniCssExtractPlugin
        const {index, plugin } = findPlugin(customPlugins, arguments.callee.name)
        if(index < 0) return 
        const {filename,chunkFilename} = plugin.options

        // 2.找到默认的MiniCssExtractPlugin配置项
        const {plugin: defaultPlugin } = findPlugin(defaultPlugins, arguments.callee.name)
        // 3.替换默认MiniCssExtractPlugin配置项内容
        defaultPlugin.options.filename = filename
        defaultPlugin.options.chunkFilename = chunkFilename
        // 4.移除自定义配置项中的MiniCssExtractPlugin
        customPlugins.splice(index)
    }
}


module.exports = (defaultConfig, customConfig, customDealPlugins = []) => {
    if (customDealPlugins.length) {
        // 需要特殊处理的合并过程的插件类
        customDealPlugins.forEach(pluginName => {
            adapterPlugin[pluginName] && adapterPlugin[pluginName].call(this, defaultConfig.plugins, customConfig.plugins)
        })
    }


    // 默认的plugin配置
    const existPluginName = defaultConfig.plugins.map(plugin => {
        return plugin.constructor && plugin.constructor.name
    })
    // unique 两个plugin只会保留一个(后面的替换前面)
    const config = mergeWithCustomize({
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
    })(defaultConfig, customConfig)

    return config
}