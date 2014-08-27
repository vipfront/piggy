/*
 * piggy
 * http://vipfront.github.io/
 *
 * Copyright (c) 2014 VIP FEG
 * Licensed under the MIT license.
 */

'use strict'

var pkg = require('../package.json')
var commander = require('commander')
var globSync = require('glob').sync
var patch = require('./patch')
var common = require('./common')
var events = require('events')
var util = require('util')
var log4js = require('log4js')
var touch = require('touch')
var path = require('path');

var logFile = path.join(path.resolve(__dirname, '..', 'logs'), 'error_log');

log4js.configure({
    "appenders": [
        {
            "type": "file",
            "filename": logFile,
            //"maxLogSize": 20480,
            //"backups": 3
        }
    ]
})
var logger = log4js.getLogger()

// exports
function Piggy() {
    events.EventEmitter.call(this)
}
util.inherits(Piggy, events.EventEmitter)
var piggy = module.exports = new Piggy()

// 确保日志文件存在
checkLogFile()

// props
piggy.version = pkg.version
piggy.commander = commander
piggy.globSync = globSync
// is using a command now?
piggy.inCommand = false
piggy.logger = logger

// add patches
patch.init(piggy)

// init an app
piggy.init = function() {
    commander.version(piggy.version)
    loadPlugin('init')
    commander.parse(process.argv)

    // there is no subcommand, init an empty application
    if(!piggy.inCommand) {
        var args = ['piggy']
        var opts = {}
        common.runYoeman(args, opts)
    }
}

// load plugins
function loadPlugin(type) {
    var files = []
    ;['./options/*.js', './options/' + type + '/*.js', './commands/*.js', './commands/' + type + '/*.js'].forEach(function(pattern) {
        files = files.concat(globSync(pattern, {
            cwd: __dirname
        }))
    })
    files.forEach(function(file) {
        require(file).init(piggy)
    })
}

function checkLogFile() {
    // 创建日志文件
    touch(logFile, {}, function(err) {
        if(err) 
            piggy.emit('error', err)
    })
}
