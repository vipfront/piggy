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
        .command('build')
        .description('build your app')
        .action(function() {
            var cli = require('grunt').cli;
            cli.tasks = ['default'];
            cli();
        })
}
