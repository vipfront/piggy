#!/usr/bin/env node

var piggy = require('../lib/main.js')

// 记录错误日志
piggy.on('error', function(e) {
    log(e)
})

process.on('uncaughtException', function(e) {
    log(e)
})

function log(e) {
    piggy.logger.error(e.stack || e.message)
    console.error(e.stack || e.message)
    process.exit(e.code || 1)
}

piggy.init()
