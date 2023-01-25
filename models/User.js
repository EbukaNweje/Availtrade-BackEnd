const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
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
  
  isAdmin: {
    // Role of user it will be (normal or admin )
    type: Boolean,
    default: true,
  },

}, {timestamps: true});

module.exports = User = mongoose.model('User', UserSchema )

