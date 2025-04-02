const express = require("express");
const router = express.Router();

const LatestNewsController = require("../../controller/admin/latestNews.controller");
const uploadlatest = require("../../multer/latestnews.multer");

router.post("/createLatest",uploadlatest.single("image"), LatestNewsController.createNews);
router.get("/deleteLatest/:id", LatestNewsController.deleteNews);   
router.get("/allLatest/editLatest/:id", LatestNewsController.getNewsById);
router.post("/updateLatest/:id",uploadlatest.single("image"), LatestNewsController.updateNews);
router.get("/latest", LatestNewsController.getAllNews);

module.exports = router;