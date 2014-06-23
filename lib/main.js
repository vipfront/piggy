/*
 * piggy-tools
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

// exports
var piggy = module.exports = function() {
}

// props
piggy.version = pkg.version
piggy.commander = commander
piggy.globSync = globSync
// is using a command now?
piggy.inCommand = false

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

// build your app
piggy.build = function() {
    commander.version(piggy.version)
    loadPlugin('build')
    commander.parse(process.argv)

    // there is no subcommand, run grunt
    if(!piggy.inCommand) {
        require('grunt').cli()
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

