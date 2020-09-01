const mongoose = require('mongoose');
var { nanoid } = require("nanoid");

const shortUrlSchema = new mongoose.Schema({
  full: {
    type: String,
    required: true
  },
  short: {
    type: String,
    required: true,
    default: () => nanoid()
  },
  clicks: {
    type: Number,
    required: true,
    default: 0
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ShortUrl', shortUrlSchema);