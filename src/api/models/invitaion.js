const { mongoose, Schema } = require('mongoose');

// JSON schema for invitation
const invitationSchema = new Schema({
  code: {
    type: String,
    required: 'code is required',
    index: {      
      unique: true,
      dropDups: true
    }
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

const Invitation = mongoose.model('Invitation', invitationSchema);

module.exports = Invitation;
