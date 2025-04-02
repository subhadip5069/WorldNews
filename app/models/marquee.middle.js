const mongoose = require("mongoose");

const marqueeMiddle = new mongoose.Schema({
    middlemarquee: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("marqueemiddle", marqueeMiddle);