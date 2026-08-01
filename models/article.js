const mongoose = require('mongoose');
const articleSchema = new mongoose.Schema({
 title: { type: String, required: true, minlength: 5 },
 content: { type: String, required: true, minlength: 20 },
author: { type: String, default: 'Guest' },
slug: { type: String },
category: { type: String, default: 'General'},
published: { type: Boolean, default: false},
}, { timestamps: true });

module.exports = mongoose.model('Article', articleSchema);