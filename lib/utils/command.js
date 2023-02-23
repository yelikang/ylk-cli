/*
 * @Description: 
 * @Autor: Yelikang
 * @Date: 2023-02-09 17:03:46
 */
'use strict';
const path = require('path');

const runCommand = (command, args) => {
    const child = require("child_process");
    return new Promise((resolve, reject) => {
        const executedCommand = child.spawn(command, args, {
            stdio: "inherit",
            shell: true
        });

        executedCommand.on("error", error => {
            reject(error);
        });

        executedCommand.on("exit", code => {
            if (code === 0) {
                resolve();
            } else {
                reject();
            }
        });
    });
};

module.exports = (isDev, options) => {
    const { merge } = options
    if (merge) {
        let mergeConfigFilePath = path.resolve(merge)
        process.env.mergeConfig = mergeConfigFilePath
    }

    if (isDev) {
        const webpackDevPath = require.resolve('webpack/bin/webpack')
        const devConf = '--config ' + path.resolve(__dirname, './../build/dev.config.js')
        runCommand('node', ['--max_old_space_size=4000', webpackDevPath, ' serve --progress --profile ', devConf])
    } else {
        const buildConfig = path.resolve(__dirname, './../build/pro.config.js')
        runCommand('node', ['--max_old_space_size=4000', buildConfig])


    }

}

