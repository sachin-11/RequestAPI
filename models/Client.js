const Request = require('./Request')
const mongoose = require('mongoose'), Schema = mongoose.Schema;
 
const ClientSchema  = mongoose.Schema({
    code: String,
    description: String,
  requests : [{ type: Schema.Types.ObjectId, ref: 'Request' }]
});
 
module.exports = mongoose.model('Client', ClientSchema);
