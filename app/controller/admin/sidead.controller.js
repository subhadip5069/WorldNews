const fs = require("fs");
const path = require("path");
const SideAd = require("../../models/side.ad");

class SideAdController {
    // Create a new side ad
    createSideAd = async (req, res) => {
        try {
            const { title, link, description } = req.body;
            const image = req.file.path;

            const newAd = new SideAd({ title, link, description, image });
            await newAd.save();

            console.log(newAd);
        res.redirect("/admin/allAds");
        } catch (error) {
            console.error(error);
        res.redirect("/admin/allAds");        }
    };

    // Update a side ad
    updateSideAd = async (req, res) => {
        try {
            const { id } = req.params;
            const { title, link, description } = req.body;
            const ad = await SideAd.findById(id);

            if (!ad) {
    res.redirect("/admin/allAds");
            }

            // Delete old image if a new one is uploaded
            if (req.file) {
                const oldImagePath = ad.image;
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
                ad.image = req.file.path;
            }

            // Update fields
            ad.title = title || ad.title;
            ad.link = link || ad.link;
            ad.description = description || ad.description;

            await ad.save();
            res.redirect("/admin/allAds");

        } catch (error) {
            console.error(error);
            res.redirect("/admin/allAds");}
    };

    // Delete a side ad
    deleteSideAd = async (req, res) => {
        try {
            const { id } = req.params;
            const ad = await SideAd.findById(id);

            if (!ad) {
                return res.status(404).json({ message: "Side ad not found" });
            }

            // Delete the associated image
            if (fs.existsSync(ad.image)) {
                fs.unlinkSync(ad.image);
            }

            await SideAd.findByIdAndDelete(id);

            res.redirect("/admin/allAds");
        } catch (error) {
            console.error(error);
           res.redirect("/admin/allAds");
        }
    };
    editSideAd = async (req, res) => {
        try {
            const ad = await SideAd.findById(req.params.id);
            res.render("admin/editsideads", { ad });
        } catch (error) {
            console.error(error);
            res.redirect("/admin/allAds");
        }
    };

          
}

module.exports = new SideAdController();
