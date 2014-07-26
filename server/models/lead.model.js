var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Lead currently only asks for an email.  An updated datetime stamp is recorded as well.
 * @type {Schema}
 */
var LeadSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    updated: {
    	type: Date,
    	default: Date.now
    }
});

module.exports = mongoose.model('Lead', LeadSchema);
