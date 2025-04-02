const express = require("express");
const app = express.Router();

// pages routes

app.use("/", require("./adminh.pages.routes"));
app.use("/", require("./ad.routes"));
app.use("/", require("./sidead.routes"));
app.use("/", require("./sponcered.routes"));
app.use("/", require("./marquee.routes"));
app.use("/", require("./sports"));
app.use("/", require("./national.routes"));
app.use("/", require("./international.routes"));
app.use("/", require("./entertaitment.routes"));
app.use("/", require("./health.routes"));
app.use("/", require("./latest.routes"));
app.use("/", require("./weather.routes"));
app.use("/", require("./vide.routes"));

module.exports = app;