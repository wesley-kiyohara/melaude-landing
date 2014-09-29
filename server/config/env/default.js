'use strict';

var path = require('path');
var rootPath = path.normalize(__dirname + '/../../..');

module.exports = {
    root: rootPath,
    port: process.env.PORT || 3000,
    hostname: process.env.HOST || process.env.HOSTNAME
};

switch (process.env.NODE_ENV) {
    case 'production':
        module.exports.db = 'mongodb://melaude:melaude@kahana.mongohq.com:10029/melaude_landing_production';
        break;
    case 'testing':
        module.exports.db = 'mongodb://melaude:melaude@kahana.mongohq.com:10030/melaude_landing_testing';
        break;
    default:
        module.exports.db = 'mongodb://melaude:melaude@kahana.mongohq.com:10031/melaude_landing_development';
}
