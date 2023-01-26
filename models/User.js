const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Unique email for each user
  },

  password: {
    type: String,
    required: true,
  },

  confirmPassword: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },

  gender: {
    type: String,
    required: true,
  },

  phoneNumber: {
    type: String,
    required: true,
  },

  token: {
    type: String,
    required: true,
  },

  plan: {
    type: String,
    required: true,
  },

  modeOfInvestment: {
    type: String,
    required: true,
  },

  account: {
    type: [String],
  },

  referenceId: {
    type: String,
  },
  
  verify: {
    type: Boolean,
    default: true,
  },

  isAdmin: {
    // Role of user it will be (normal or admin )
    type: Boolean,
    default: true,
  },

}, {timestamps: true});

module.exports = User = mongoose.model('User', UserSchema )

