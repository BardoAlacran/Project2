const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
  age: {
    type: Number,
    min: 18,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
