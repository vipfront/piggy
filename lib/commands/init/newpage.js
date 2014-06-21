/*
 * piggy-tools
 * http://vipfront.github.io/
 *
 * Copyright (c) 2014 VIP FEG
 * Licensed under the MIT license.
 */

'use strict'

exports.init = function(piggy) {
    // define commands
    piggy.commander
        .command('newpage <pageName>')
        .description('init a new page')
        .action(function(pageName) {
            console.log(pageName)
        })
}
