const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// JSON schema for invitation
const InvitationSchema = new Schema({
  code: {
    type: String,
    required: 'code is required'
  },
  category: {
    type: String,
    enum: ['Single', 'Couple', 'Family']
  },
  title: {
    type: String,
    enum: ['Mr.', 'Mrs.', 'Miss']
  },
  name: {
    type: String
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Invitation', InvitationSchema);
