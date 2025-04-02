const National = require("../../models/national");
const fs = require("fs");
const path = require("path");

class NationalController {
    
    // Create National News
    createNational = async (req, res) => {
        try {
            const { name, location, Date, title, link, description } = req.body;
            const image = req.file ? req.file.path : null;

            const newNational = new National({ name, location, Date, title, link, description, image });
            await newNational.save();
            res.redirect("/admin/national");
        } catch (error) {
            console.error("Error creating national news:", error);
            res.redirect("/admin/national");
        }
    };

    // Get All National News
    getAllNational = async (req, res) => {
        try {
            const nationalNews = await National.find();
            res.render("admin/national", { nationalNews });
        } catch (error) {
            console.error("Error fetching national news:", error);
            res.redirect("/admin/national");
        }
    };

    // Get National News by ID for Edit
    getNationalById = async (req, res) => {
        try {
            const national = await National.findById(req.params.id);
            if (!national) return res.status(404).json({ error: "National news not found" });

            res.render("admin/editnational", { national });
        } catch (error) {
            console.error("Error fetching national news:", error);
        res.redirect("/admin/national");
        }
    };

    // Update National News
    updateNational = async (req, res) => {
        try {
            const { name, location, Date, title, link, description } = req.body;
            const national = await National.findById(req.params.id);

            if (!national) return res.status(404).json({ error: "National news not found" });

            // Delete old image if new one is uploaded
            if (req.file) {
                fs.unlinkSync( national.image);
                national.image = req.file.path;
            }

            national.name = name;
            national.location = location;
            national.Date = Date;
            national.title = title;
            national.link = link;
            national.description = description;

            await national.save();
            res.redirect("/admin/national");
        } catch (error) {
            console.error("Error updating national news:", error);
            res.redirect("/admin/national");
        }
    };

    // Delete National News
    deleteNational = async (req, res) => {
        try {
            const national = await National.findById(req.params.id);
            if (!national) return res.status(404).json({ error: "National news not found" });

            // Delete the image file
            fs.unlinkSync(path.join( national.image));

            await National.findByIdAndDelete(req.params.id);
            res.redirect("/admin/national");
        } catch (error) {
            console.error("Error deleting national news:", error);
            res.redirect("/admin/national");
        }
    };
}

module.exports = new NationalController();
