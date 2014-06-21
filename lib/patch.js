/*
 * piggy-tools
 * http://vipfront.github.io/
 *
 * Copyright (c) 2014 VIP FEG
 * Licensed under the MIT license.
 */

'use strict'

exports.init = function(piggy) {
    var Command = piggy.commander.Command
    var oldActionFn = Command.prototype.action
    Command.prototype.action = function(fn) {
        var newFn = function() {
            piggy.inCommand = true
            fn.apply(this, arguments)
        }
        oldActionFn.apply(this, [newFn])
    }
}
