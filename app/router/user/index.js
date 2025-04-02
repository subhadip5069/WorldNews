const express = require("express");
const router = express.Router();
// routes
// ui pages
const UIIndexController = require("./page.routes");
router.use("/", UIIndexController);
// 





























// exports
module.exports = router;

