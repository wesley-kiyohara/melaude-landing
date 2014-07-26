'use strict';

// Load utility library. Swiss army of javascript functions.
var _ = require('lodash');

// TODO Extend the base configuration in all.js with environment specific configuration
module.exports = _.extend(
    require('./env/default'),
    {}
);
