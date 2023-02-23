const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin')
const { merge } = require('webpack-merge')
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');

const ora = require('ora');
const rm = require('rimraf');
const chalk = require('chalk');
const baseWebpackConfig = require('./base.config')
process.env.NODE_ENV = 'production';

const loaderUtil = require('./loader');
const config = require('../config');
const mergeConfig = require('../utils/merge')


let webpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
    devtool: false,
    output: {
        path: config.build.assetsRoot,
        filename: loaderUtil.assetsPath('js/[name].[chunkhash:8].js'),
        chunkFilename: loaderUtil.assetsPath('js/[name].[chunkhash:8].js'),
        clean: true
    },
    plugins: [
        // new webpack.DefinePlugin({
        //     'process.env': require('../config/pro.env')
        //   }),
        new HtmlWebpackPlugin({
            template: path.resolve('./public/index.html'),
            timestamp: new Date().getTime(),
            filename: 'index.html',
            inject: 'body',
            cache: false
        }),
        new MiniCssExtractPlugin({
            filename: path.posix.join(config.build.assetsSubDirectory, './css/[name]-[fullhash:8].css'),
            chunkFilename: path.posix.join(config.build.assetsSubDirectory, './css/[id]-[chunkhash:8].css'),
            ignoreOrder: true
        }),
        new CopyPlugin([{
            from: path.resolve('./public/static'),
            to: path.resolve('./dist/static'),
        }]
        ),
        new SimpleProgressWebpackPlugin()
    ],
    module: {
        rules: loaderUtil.styleLoaders({
            sourceMap: config.build.productionSourceMap,
            extract: true,
            usePostCSS: true
        })
    },
})
if (!webpackConfig.plugins) {
    webpackConfig.plugins = []
}

if (process.env.mergeConfig) {
    const mergeOption = require(process.env.mergeConfig)
    webpackConfig = mergeConfig(webpackConfig, mergeOption, ['MiniCssExtractPlugin'])
}


const spinner = ora('正在打包编译...');
spinner.start();

const staticFilePath = path.posix.join(config.build.assetsRoot, config.build.assetsSubDirectory)
rm(staticFilePath, err => {
    if (err) throw err;
    webpack(webpackConfig, (err, stats) => {
        spinner.stop();
        if (err) throw err;
        process.stdout.write(
            stats.toString({
                colors: true,
                modules: false,
                children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
                chunks: false,
                chunkModules: false
            }) + '\n\n'
        );

        if (stats.hasErrors()) {
            console.log(chalk.red('  Build failed with errors.\n'));
            process.exit(1);
        }

        console.log(chalk.cyan('  打包编译结束.\n'));
        console.log(
            chalk.yellow(
                '  Tip: built files are meant to be served over an HTTP server.\n' +
                "  Opening index.html over file:// won't work.\n"
            )
        );
    });
});
