const mongoose = require('mongoose'), Schema = mongoose.Schema;
 
const RequestSchema = mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: [true, 'Please add a  firstName'],
      },
      lastName: {
        type: String,
        required: [true, 'Please add a lastName'],
      },
      description: {
          type: String,
          trim: true,
          required: [true, 'Please add a description']
      }

}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  });

//Reverse populate with virtuals
RequestSchema.virtual('clients', {
  ref: 'Client',
  localField: '_id',
  foreignField: 'requests',
  justOne: false
})



 
module.exports = mongoose.model('Request', RequestSchema);