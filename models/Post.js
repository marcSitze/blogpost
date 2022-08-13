const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true
    },
    publishDate: {
        type: Date,
        // required: true,
        default: Date.now
    },
    path: {
        type: String,
        // required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    description: {
        type: String
    },
    title: {
        type: String,
    },
    updatedAt: {
        type: Date,
        // required: true,
        default: Date.now
    }
});

module.exports = mongoose.model('Post', videoSchema);