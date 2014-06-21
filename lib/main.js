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
        initYoeman(args, opts)
    }
}

// build your app
piggy.build = function() {
    commander.version(piggy.version)
    loadPlugin('build')
    commander.parse(process.argv)
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

// init yeoman, copy from yo's code
function initYoeman(args, opts) {
    var env = require('yeoman-generator')();

    // alias any single namespace to `*:all` and `webapp` namespace specifically
    // to webapp:app.
    env.alias(/^([^:]+)$/, '$1:all');
    env.alias(/^([^:]+)$/, '$1:app');

    // lookup for every namespaces, within the environments.paths and lookups
    env.lookup();

    env.on('end', function () {
    console.log('Done running sir');
    });

    env.on('error', function (err) {
    console.error('Error', process.argv.slice(2).join(' '), '\n');
    console.error(opts.debug ? err.stack : err.message);
    process.exit(err.code || 1);
    });

    // Note: at some point, nopt needs to know about the generator options, the
    // one that will be triggered by the below args. Maybe the nopt parsing
    // should be done internally, from the args.
    env.run(args, opts);
}
