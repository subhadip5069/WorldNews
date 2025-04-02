const mongoose = require("mongoose");

const schema  = mongoose.Schema;

const health = new schema({
    name: {
        type: String,
        required: true
    },
    Date: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    path: {
        type: String,
        default: "health"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("health", health);
