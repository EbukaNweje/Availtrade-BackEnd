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

  referenceId: {
    type: String,
  },

  lastDeposit: {
    type: String,
    default: 0.00
  },

  totalDeposit: {
    type: String,
    default: 0.00
  },
  
  totalEarned: {
    type: String,
    default: 0.00
  },

  accountBalance: {
    type: String,
    default: 0.00
  },
  
  startUpDeposit: {
    type: String,
    default: 0.00
  },

  // account: {
  //   type: [String],
  // },

  // referenceId: {
  //   type: String,
  // },
  
  verify: {
    type: Boolean,
    default: true,
  },

  isAdmin: {
    // Role of user it will be (normal or admin )
    type: Boolean,
    default: false,
  },

}, {timestamps: true});

module.exports = User = mongoose.model('User', UserSchema )

