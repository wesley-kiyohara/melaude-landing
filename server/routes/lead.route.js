'use strict';

var Lead = require('../models/lead.model');

module.exports = function(app) {

    app.route('/beta-signup/lead')

        /*
         * Create a new lead.
         */
        .post(function(req, res) {

            // Validate email from request
            req.assert('email', 'A valid email is required').isEmail();

            var errors = req.validationErrors(),
                lead;

            if (!errors) {

                // Instantiate a new Lead.
                lead = new Lead();

                // Set email of new lead.
                lead.email = req.body.email;

                // Save new lead into database.
                lead.save(function(err) {

                    if (err) {
                        res.status(400).json([err]);
                    }
                    else {

                         // Send a response message that the lead was successfully created. Needs to be
                         // valid JSON for ajax request to succeed.
                        res.status(200).json({ status: 'ok' });
                    }
                });
            }
            else {

                // Send a response of all errors.
                res.status(400).json(errors);
            }
        });

};
