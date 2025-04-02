const mongoose = require("mongoose");
const { create } = require("./sponcerd");

const schema = mongoose.Schema;

const entertaitment = new schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    Date: {
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
        default: "entertaitment"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("entertaitment", entertaitment);
