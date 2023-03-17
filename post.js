const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    acronym: String,
    definition: String,
});
module.exports.postSchema = postSchema;
module.exports.Post = mongoose.model('post', postSchema);