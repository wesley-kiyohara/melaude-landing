'use strict';

/**
 * Put routes that aren't easily expressible into RESTful groups.
 */
module.exports = function(app) {

    app.get("/", function (req, res) {
      res.redirect("index.html");
    });
};
