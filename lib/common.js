/*
 * piggy
 * http://vipfront.github.io/
 *
 * Copyright (c) 2014 VIP FEG
 * Licensed under the MIT license.
 */

exports.runYoeman = function(args, opts) {
    var env = require('yeoman-generator')()

    // alias any single namespace to `*:all` and `webapp` namespace specifically
    // to webapp:app.
    env.alias(/^([^:]+)$/, '$1:all')
    env.alias(/^([^:]+)$/, '$1:app')

    var oldNodePath = process.env.NODE_PATH;
    // env.lookup在查找插件时会考虑process.env.NODE_PATH的值
    process.env.NODE_PATH = __dirname + '/../node_modules/';
    // lookup for every namespaces, within the environments.paths and lookups
    env.lookup()
    process.env.NODE_PATH = oldNodePath;

    env.on('end', function () {
        console.log('Done running sir')
    })

    env.on('error', function (err) {
        console.error('Error', process.argv.slice(2).join(' '), '\n')
        console.error(opts.debug ? err.stack : err.message)
        process.exit(err.code || 1)
    })

    // Note: at some point, nopt needs to know about the generator options, the
    // one that will be triggered by the below args. Maybe the nopt parsing
    // should be done internally, from the args.
    env.run(args, opts)
}
