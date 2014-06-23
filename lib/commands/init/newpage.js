/*
 * piggy-tools
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
        .command('newpage')
        .description('init a new page')
        .action(function(pageName) {
            var args = ['piggy:newpage']
            var opts = {}
            common.runYoeman(args, opts)
        })
}
