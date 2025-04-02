const express = require("express");
const router = express.Router();


const sportsController = require("../../controller/admin/sports.controller");
const uploadSports = require("../../multer/sports.multer");

router.post("/createSports",uploadSports.single("image"), sportsController.createSport);
router.get("/deleteSports/:id", sportsController.deleteSport);
router.get("/allSports/editSports/:id", sportsController.getSportById);
router.post("/updateSports/:id",uploadSports.single("image"), sportsController.updateSport);
router.get("/sports", sportsController.getAllSports);
module.exports = router;