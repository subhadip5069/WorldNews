const adverticeMent = require("../../models/advertice.ment");
const fs = require("fs");
const path = require("path");




class AdController {
    createAd =async (req, res) => {
        try {
            const {title, link, description} = req.body;
            const image = req.file.path;
            const newAd = new adverticeMent({title, link, description, image});
            await newAd.save();
            console.log(newAd);
            res.redirect("/admin/allAds");
        } catch (error) {
            console.log(error);
            res.redirect("/admin/allAds");
        }
    }
    deleteAd = async (req, res) => {
        try {
            const { id } = req.params;
            const ad = await adverticeMent.findById(id);
            
            if (!ad) {
                return res.redirect("/admin/allAds");
            }

            // Delete image file
            if (fs.existsSync(ad.image)) {
                fs.unlinkSync(ad.image);
            }

            await adverticeMent.findByIdAndDelete(id);
            res.redirect("/admin/allAds");
        } catch (error) {
            console.error("Error deleting ad:", error);
            res.redirect("/admin/allAds");
        }
    };

    // Update Advertisement
    updateAd = async (req, res) => {
        try {
            const { id } = req.params;
            const { title, link, description } = req.body;
            let updateData = { title, link, description };

            const ad = await adverticeMent.findById(id);
            if (!ad) {
                return res.redirect("/admin/allAds");
            }

            // If new image uploaded, delete the old one
            if (req.file) {
                if (fs.existsSync(ad.image)) {
                    fs.unlinkSync(ad.image);
                }
                updateData.image = req.file.path;
            }

            const updatedAd = await adverticeMent.findByIdAndUpdate(id, updateData, { new: true });
            res.redirect("/admin/allAds");

        } catch (error) {
            console.error("Error updating ad:", error);
            res.redirect("/admin/allAds");
        }
    };
    editAd = async (req, res) => {
       try {

        const ad = await adverticeMent.findById(req.params.id);
        res.render("admin/editads", {ad});
       } catch (error) {
            res.redirect("/admin/allAds");
       }

    }

}

    module.exports = new AdController();