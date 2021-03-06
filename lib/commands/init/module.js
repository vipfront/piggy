/*
 * piggy
 * http://vipfront.github.io/
 *
 * Copyright (c) 2014 VIP FEG
 * Licensed under the MIT license.
 */

'use strict'

var common = require('../../common')
exports.init = function(piggy) {
    // define commands
    piggy.commander
        .command('module')
        .description('init a new module')
        .action(function(pageName) {
            var args = ['piggy:module']
            var opts = {}
            common.runYoeman(args, opts)
        })
}
