const { Schema, model } = require('mongoose');

const Post = new Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  url: {type: String, required: false},
  date: { type: Date, default: Date.now },
  user: {type: String, required: true},
});

module.exports = model('Post', Post);