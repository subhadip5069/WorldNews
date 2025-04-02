const express = require("express");
const router = express.Router();

const sideAdController = require("../../controller/admin/sidead.controller");
const uploadSideAD = require("../../multer/sidead.multer");


router.post("/createSideAd",uploadSideAD.single("image"), sideAdController.createSideAd);
router.get("/deleteSideAd/:id", sideAdController.deleteSideAd);
router.get("/allAds/editSideAd/:id", sideAdController.editSideAd);
router.post("/updateSideAd/:id",uploadSideAD.single("image"), sideAdController.updateSideAd);

module.exports = router;