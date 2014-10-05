'use strict';

var Lead = require('../models/lead.model'),
    request = require('request'),
    config = require('../config/config');

function saveLeadCallback(email, res) {
    return function(err) {
        if (err) {
            res.status(400).json([err]);
        }
        else {

            // Subscribes email to newsletter (mailchimp) list.
            subscribe(email, subscribeCallback(res));
        }
    };
}

function subscribe(email, callback) {
    request({
        url: 'https://us9.api.mailchimp.com/2.0/lists/subscribe',
        method: 'POST',
        form: {
            apikey: config.mailchimp.apiKey,
            id: config.mailchimp.listId,
            email: {
                email: email
            },
            double_optin: false,
            send_welcome: true
        }
    }, callback);
}

function subscribeCallback(res) {
    return function(err, response, body) {
        if (!err && response.statusCode === 200) {

            // Send a response message that the lead was successfully created and added to mailchimp list. Needs to be
            // valid JSON for ajax request to succeed.
            res.status(200).json({ status: 'ok' });
        }
        else {
            res.status(400).json([err]);
        }
    };
}


module.exports = function(app) {

    app.route('/beta-signup/lead')

        /*
         * Create a new lead.
         */
        .post(function(req, res) {

            // Validate email from request
            req.assert('email', 'A valid e/mail is required').isEmail();

            var errors = req.validationErrors(),
                lead;

            if (!errors) {

                // Instantiate a new Lead.
                lead = new Lead();

                // Set email of new lead.
                lead.email = req.body.email;

                // Save new lead into database.
                lead.save(saveLeadCallback(lead.email, res));
            }
            else {

                // Send a response of all errors.
                res.status(400).json(errors);
            }
        });

};
