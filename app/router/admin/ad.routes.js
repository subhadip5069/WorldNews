const express = require("express");
const router = express.Router();
const AdController = require("../../controller/admin/ad.controler");
const uploadAD = require("../../multer/ad.multer");


router.post("/createAd", uploadAD.single("image"), AdController.createAd);
router.get("/deleteAd/:id", AdController.deleteAd);
router.get("/allAds/editAd/:id", AdController.editAd);
router.post("/updateAd/:id",uploadAD.single("image"), AdController.updateAd);

module.exports = router;