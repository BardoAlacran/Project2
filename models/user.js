const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email'],
  },
  hashedPassword: {
    type: String,
    required: [true, 'password is required'],
  },
  profilePic: {
    type: String,
    default: '/images/rambo.png',
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
