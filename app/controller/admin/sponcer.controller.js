const fs = require("fs");
const path = require("path");
const Sponcerd = require("../../models/sponcerd");

class SponcerController {
    // Create a new sponsored entry
    createSponcerd = async (req, res) => {
        try {
            const { name, title, link, description } = req.body;
            const image = req.file.path;

            const newSponcer = new Sponcerd({ name, title, link, description, image });
            await newSponcer.save();

            console.log(newSponcer);
            res.redirect("/admin/allAds");
        } catch (error) {
            console.error(error);
           res.redirect("/admin/allAds");
        }
    };

    // Update a sponsored entry
    updateSponcerd = async (req, res) => {
        try {
            const { id } = req.params;
            const { name, title, link, description } = req.body;
            const sponcer = await Sponcerd.findById(id);

            if (!sponcer) {
                res.redirect("/admin/allAds");
            }

            // Delete old image if a new one is uploaded
            if (req.file) {
                const oldImagePath = sponcer.image;
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
                sponcer.image = req.file.path;
            }

            // Update fields
            sponcer.name = name || sponcer.name;
            sponcer.title = title || sponcer.title;
            sponcer.link = link || sponcer.link;
            sponcer.description = description || sponcer.description;

            await sponcer.save();

            res.redirect("/admin/allAds");
        } catch (error) {
            console.error(error);
            res.redirect("/admin/allAds");
        }
    };

    // Delete a sponsored entry
    deleteSponcerd = async (req, res) => {
        try {
            const { id } = req.params;
            const sponcer = await Sponcerd.findById(id);

            if (!sponcer) {
                res.redirect("/admin/allAds");
            }

            // Delete the associated image
            if (fs.existsSync(sponcer.image)) {
                fs.unlinkSync(sponcer.image);
            }

            await Sponcerd.findByIdAndDelete(id);

            res.redirect("/admin/allAds");
        } catch (error) {
            console.error(error);
            res.redirect("/admin/allAds");
        }
    };
    editrSponcerd = async (req, res) => {
        try {
           
            
            const sponcer = await Sponcerd.findById(req.params.id);
            res.render("admin/editsponcered", { sponcer });
        } catch (error) {
            console.error(error);
            res.redirect("/admin/allAds");
        }
    };
}

module.exports = new SponcerController();
