const { Schema, model } = require('mongoose');

const Post = new Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  image: {type: String, required: false},
  date: { type: Date, default: Date.now },
});

module.exports = model('Post', Post);