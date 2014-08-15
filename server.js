/**
 * TODO Pull middleware to a separate module.
 */

var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    expressValidator = require('express-validator'),
    config = require('./server/config/config')
    ;

// Initialize express app.
var app = express();

// Tell mongoose to connect with the MongoHQ database.
mongoose.connect(config.db);

// Used to support json-encoded request bodies.
app.use(bodyParser.json());

// Used to support URL-encoded request bodies.
app.use(bodyParser.urlencoded({
    extended: true
}));

// Tell express to use the "expressValidator" as middleware.
// This allows you to make assertions for requests.
// NOTE Make sure to keep this immediately after bodyParser.
app.use(expressValidator());

// Node will automatically look for a file named "index.js".
var routes = require('./server/routes')(app);

// Set the default path of static files.
app.use(express.static(__dirname + '/public'));

// Redirect of nothing else sent a response.
app.use(otherwiseRedirect);

// Redirect all unmatched URLs to the default page.
function otherwiseRedirect(req, res) {
  res.redirect("/");
}

// Let er' rip
app.listen(config.port, config.hostname);

console.log('Express server started on port ' + config.port + '\n');
console.log('Press Ctrl + C to stop.');
