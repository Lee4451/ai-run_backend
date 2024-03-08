const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  auth_code:{ type: String, required: false },
  access_token:{ type: String, required: false },
  refresh_token:{ type: String, required: false },
});

const User = mongoose.model('User', userSchema);

module.exports = User;