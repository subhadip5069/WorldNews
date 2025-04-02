const express = require("express");
const router = express.Router();

const internationalController = require("../../controller/admin/international.controller");
const uploadinternational = require("../../multer/international.multer");

router.post("/createInternational",uploadinternational.single("image"), internationalController.createNews);
router.get("/deleteInternational/:id", internationalController.deleteNews);
router.get("/allInternational/editInternational/:id", internationalController.getNewsById);
router.post("/updateInternational/:id",uploadinternational.single("image"), internationalController.updateNews);
router.get("/international", internationalController.getAllNews);

module.exports = router;