const express = require("express");
const router = express.Router();

const nationalController = require("../../controller/admin/national");
const uploadnational = require("../../multer/national.multer");

router.post("/createNational",uploadnational.single("image"), nationalController.createNational);
router.get("/deleteNational/:id", nationalController.deleteNational);
router.get("/allNational/editNational/:id", nationalController.getNationalById);
router.post("/updateNational/:id",uploadnational.single("image"), nationalController.updateNational);
router.get("/national", nationalController.getAllNational);


module.exports = router;