const express = require("express");
const router = express.Router();
const adminPagesController = require("../../controller/admin/admin.pages.controller");

router.get("/", adminPagesController.index);
router.get("/addlist", adminPagesController.addlist);
router.get("/ad", adminPagesController.ad);
router.get("/sidead", adminPagesController.sideadd);
router.get("/sponcer", adminPagesController.sponcer);
router.get("/allAds", adminPagesController.allAds);

module.exports = router;