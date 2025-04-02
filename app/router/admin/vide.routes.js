const express = require("express");
const router = express.Router();
const Video = require("../../models/video");
const { create } = require("../../models/sponcerd");

// GET all videos and render them
router.get("/video", async (req, res) => {
    try {
        const videos = await Video.findOne();
        res.render("admin/video", { videos });
    } catch (error) {
        res.redirect("/admin/video");
    }
});

// UPDATE a video using findOneAndUpdate
router.post("/update/:id", async (req, res) => {
    try {
        const { title, maintopic, link } = req.body;

        let video = await Video.findOne({ _id: req.params.id });

        if (video) {
            video.title = title;
            video.maintopic = maintopic;
            video.link = link;
            await video.save();
        }

        res.redirect("/admin/video");
    } catch (error) {
        console.error(error);
        res.redirect("/admin/video");
    }
});
// create


module.exports = router;
