'use strict';

var Lead = require('../models/lead.model');

module.exports = function(app) {

    app.route('/lead')

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
                    if (err) { res.send(err); }

                    // Send a response message that the lead was successfully created.
                    res.json({ message: 'Email sent!'});
                })
            }
            else {

                // Send a response of all errors.
                res.json({ errors: errors });
            }
        });

};
