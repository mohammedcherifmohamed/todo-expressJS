

const mongoose = require('mongoose');

const schema = mongoose.Schema

const articleSchema = new schema({
    title: String,
    description: String,
    likes: Number,
}) 

const Article = mongoose.model('Article',articleSchema)

// exports.Article = Article ;

module.exports = Article ; 