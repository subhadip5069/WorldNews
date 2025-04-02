const mongoose = require("mongoose");

const marqueeTop = new mongoose.Schema({
    topmarquee: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("marqueetop", marqueeTop);