const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
  sessionid: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  }
});

module.exports = { Session: mongoose.model('Session', SessionSchema) };
