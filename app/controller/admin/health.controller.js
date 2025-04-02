const fs = require("fs");
const path = require("path");
const Health = require("../../models/health");

class HealthController {
    // Get all health news
    getAllNews = async (req, res) => {
        try {
            const news = await Health.find();
            res.render("admin/health", { news }); // Render EJS page
        } catch (error) {
            console.error("Error fetching health news:", error);
            res.redirect("/admin/health");
        }
    };

    // Create new health news
    createNews = async (req, res) => {
        try {
            const { name, Date, location, link, title, description } = req.body;
            const image = req.file ? req.file.path : null;

            const newNews = new Health({ name, Date, location, link, title, description, image });
            await newNews.save();
            res.redirect("/admin/health#sportsContainer");
        } catch (error) {
            console.error("Error creating health news:", error);
            res.redirect("/admin/health");
        }
    };

    // Get news by ID (for editing)
    getNewsById = async (req, res) => {
        try {
            const news = await Health.findById(req.params.id);
            if (!news) return res.status(404).json({ error: "News not found" });

            res.render("admin/edithealth", { news });
        } catch (error) {
            console.error("Error fetching health news by ID:", error);
            res.redirect("/admin/health");
        }
    };

    // Update health news
    updateNews = async (req, res) => {
        try {
            const { name, Date, location, link, title, description } = req.body;
            const news = await Health.findById(req.params.id);

            if (!news) return res.status(404).json({ error: "News not found" });

            // Update image if a new one is uploaded
            if (req.file) {
                const oldImagePath = ( news.image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
                news.image = req.file.path;
            }

            news.name = name;
            news.Date = Date;
            news.location = location;
            news.link = link;
            news.title = title;
            news.description = description;

            await news.save();
            res.redirect("/admin/health#sportsContainer");
        } catch (error) {
            console.error("Error updating health news:", error);
            res.redirect("/admin/health");
        }
    };

    // Delete health news
    deleteNews = async (req, res) => {
        try {
            const news = await Health.findById(req.params.id);
            if (!news) return res.status(404).json({ error: "News not found" });

            // Delete image if it exists
            const imagePath = ( news.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }

            await Health.findByIdAndDelete(req.params.id);
            res.redirect("/admin/health");
        } catch (error) {
            console.error("Error deleting health news:", error);
            res.redirect("/admin/health");
        }
    };
}

module.exports = new HealthController();
