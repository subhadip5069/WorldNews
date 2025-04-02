const Sports = require("../../models/sports");
const fs = require("fs");
const path = require("path");

class SportsController {
    // Create a new sport
    createSport = async (req, res) => {
        try {
            const { name, title, location, Date, link, description } = req.body;
            const image = req.file ? req.file.path : null;

            if (!image) {
                return res.status(400).json({ message: "Image is required" });
            }

            const newSport = new Sports({ name, title, location, Date, link, description, image });
            await newSport.save();

            res.redirect("/admin/sports");
        } catch (error) {
            console.error(error);
            res.redirect("/admin/sports");

        }
    };

    // Fetch all sports
    getAllSports = async (req, res) => {
        try {
            const sports = await Sports.find();
            res.render("admin/sports", {  sports });
        } catch (error) {
            console.error(error);
            res.redirect("/admin/sports");

        }
    };
// from here

    // Get a single sport by ID
    getSportById = async (req, res) => {
        try {
            const sport = await Sports.findById(req.params.id);
            if (!sport) {
                res.redirect("/admin/sports");

            }
            res.render("admin/editSport", { sport });
        } catch (error) {
            console.error(error);
            res.redirect("/admin/sports");

        }
    };

    // Update a sport
    updateSport = async (req, res) => {
        try {
            const { name, title, location, Date, link, description } = req.body;
            const sport = await Sports.findById(req.params.id);

            if (!sport) {
                res.redirect("/admin/sports");

            }

            if (req.file) {
                // Delete old image
                if (fs.existsSync(sport.image)) {
                    fs.unlinkSync(sport.image);
                }
                sport.image = req.file.path;
            }

            sport.name = name;
            sport.title = title;
            sport.location = location;
            sport.Date = Date;
            sport.link = link;
            sport.description = description;

            await sport.save();
            res.redirect("/admin/sports#sportsContainer");

        } catch (error) {
            console.error(error);
            res.redirect("/admin/sports#sportsContainer");

        }
    };

    // Delete a sport
    deleteSport = async (req, res) => {
        try {
            const sport = await Sports.findById(req.params.id);

            if (!sport) {
                res.redirect("/admin/sports#sportsContainer");


            }

            // Delete image file
            if (fs.existsSync(sport.image)) {
                fs.unlinkSync(sport.image);
            }

            await Sports.findByIdAndDelete(req.params.id);
            res.redirect("/admin/sports#sportsContainer");


        } catch (error) {
            console.error(error);
            res.redirect("/admin/sports#sportsContainer");


        }
    };
}

module.exports = new SportsController();
