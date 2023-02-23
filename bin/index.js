#!/usr/bin/env node
const commander = require('commander')
const { version } = require('../package.json')
const runCommand = require('../lib/utils/command.js')
const create = require('./create.js')

// 1.直接使用单例program
// const {program} = commander
// 2.创建一个新的program
const program = new commander.Command()

program
    .name('ylk-cli')
    .usage('[ build | dev ]')
    .version(`ylk-cli@${version}`)

// command 注册命令
program.command('dev')
    .description('project dev')
    .option('-m, --merge <file>', '合并个性化webpack.config.js文件')
    .action(function (cmdObj) {
        runCommand(true, cmdObj)
    })

program.command('build')
    .description('project build')
    .option('-m, --merge <file>', '合并个性化webpack.config.js文件')
    .action(function (cmdObj) {
        runCommand(false, cmdObj)
    })

program.command('create <ProjectName> [version] [age]')
        .description('创建脚手架目录')
        .option('-m [file]', '合并')
        .action(function(name,version,age, cmdObj){
            console.log(name, version,age, cmdObj)
        })

// addCommand 注册子命令 运行：hsdata-cli service build
// const service = new commander.Command('service');
// service.command('build')
// program.addCommand(service)

program.parse(process.argv)



// 解析参数
// const options = program.opts();


