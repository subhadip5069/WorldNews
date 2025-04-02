const express = require("express");
const router = express.Router();

const healthController = require("../../controller/admin/health.controller");
const uploadHealth = require("../../multer/health.multer");


router.post("/createHealth",uploadHealth.single("image"), healthController.createNews);

router.get("/deleteHealth/:id", healthController.deleteNews);
router.get("/allHealth/editHealth/:id", healthController.getNewsById);
router.post("/updateHealth/:id",uploadHealth.single("image"), healthController.updateNews);
router.get("/health", healthController.getAllNews);   




module.exports = router;