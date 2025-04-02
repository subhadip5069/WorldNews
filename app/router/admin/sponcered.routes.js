const exoress = require("express");
const router = exoress.Router();



const sponcerController = require("../../controller/admin/sponcer.controller");
const uploadSponceredAD = require("../../multer/sponcerdad.multre");

router.post("/createSponcer",uploadSponceredAD.single("image"), sponcerController.createSponcerd);
router.get("/deleteSponcer/:id", sponcerController.deleteSponcerd);
router.get("/allAds/editSponcer/:id", sponcerController.editrSponcerd);
router.post("/updateSponcer/:id",uploadSponceredAD.single("image"), sponcerController.updateSponcerd);

module.exports = router;