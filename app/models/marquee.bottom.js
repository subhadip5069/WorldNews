const mongoose = require("mongoose");

const marqueeBottom = new mongoose.Schema({
   bottommarquee: {
       type: String,
       required: true
   },
   createdAt: {
    type: Date,
    default: Date.now
}
});

module.exports = mongoose.model("marqueebottom", marqueeBottom);