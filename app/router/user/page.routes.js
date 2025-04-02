const express = require("express");
const router = express.Router();


const UIPagesController = require("../../controller/user/pages.controller");

router.get("/", UIPagesController.index);
router.get("/details", UIPagesController.details);
router.get("/international/:id", UIPagesController.detailINT);
router.get("/national/:id", UIPagesController.detailNAT);
router.get("/entertaitment/:id", UIPagesController.detailENT);
router.get("/sports/:id", UIPagesController.detailSPO);
router.get("/health/:id", UIPagesController.detailHEA);
router.get("/latestnews/:id", UIPagesController.detailLAT);
// pages routes
router.get("/international", UIPagesController.International);
router.get("/national", UIPagesController.National);
router.get("/entertaitment", UIPagesController.Entertainment);
router.get("/sports", UIPagesController.Sports);
router.get("/health", UIPagesController.Health);
router.get("/latestnews", UIPagesController.Latestnews);

module.exports = router;