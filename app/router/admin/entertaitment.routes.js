const express = require("express");
const router = express.Router();


const entertainmentController = require("../../controller/admin/entertainment.controller");
const uploadentertaitment = require("../../multer/entertaitment.multer");


router.post("/createEntertainment",uploadentertaitment.single("image"), entertainmentController.createNews);
router.get("/deleteEntertainment/:id", entertainmentController.deleteNews);
router.get("/allEntertainment/editEntertainment/:id", entertainmentController.getNewsById);
router.post("/updateEntertainment/:id",uploadentertaitment.single("image"), entertainmentController.updateNews);
router.get("/entertainment", entertainmentController.getAllNews);

module.exports = router;