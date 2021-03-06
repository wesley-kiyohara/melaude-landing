'use strict';

var path = require('path');
var rootPath = path.normalize(__dirname + '/../../..');

module.exports = {
    root: rootPath,
    port: process.env.PORT || 3000,
    hostname: process.env.HOST || process.env.HOSTNAME,
    mailchimp: {
        apiKey: '52b2db3ff7056b2ec6c43e989bc1efde-us9'
    }
};

switch (process.env.NODE_ENV) {
    case 'production':
        module.exports.db = 'mongodb://melaude:melaude@kahana.mongohq.com:10029/melaude_landing_production';
        module.exports.mailchimp.listId = 'dab7b3ce07';
        break;
    case 'testing':
        module.exports.db = 'mongodb://melaude:melaude@kahana.mongohq.com:10030/melaude_landing_testing';
        module.exports.mailchimp.listId = '5d309597d9';
        break;
    default:
        module.exports.db = 'mongodb://melaude:melaude@kahana.mongohq.com:10031/melaude_landing_development';
        module.exports.mailchimp.listId = '1549de63af';
}
