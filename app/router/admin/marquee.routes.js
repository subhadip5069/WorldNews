const express = require("express");
const router = express.Router();

const marqueeController = require("../../controller/admin/marqueecontroller");

router.get("/marquee", marqueeController.getMarqueePage);
router.post("/create/topmarquee", marqueeController.savetopMarquee);
router.post("/create/bottommarquee", marqueeController.savebottomMarquee);
router.post("/create/middlemarquee", marqueeController.savemiddleMarquee);


module.exports = router;