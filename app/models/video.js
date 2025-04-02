const mongoose = require("mongoose");


const video = new mongoose.Schema({
   
    title: {
        type: String,
        required: true
    },
    maintopic: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("video", video);