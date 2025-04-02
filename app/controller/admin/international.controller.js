const fs = require("fs");
const path = require("path");
const International = require("../../models/international");

class InternationalController {
    // Get all international news
    getAllNews = async (req, res) => {
        try {
            const news = await International.find();
            res.render("admin/international", { news }); // Render EJS page
        } catch (error) {
            console.error("Error fetching international news:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    };

    // Create new international news
    createNews = async (req, res) => {
        try {
            const { country, name, Date, location, link, title, description } = req.body;
            const image = req.file ? req.file.path : null;

            const newNews = new International({ country, name, Date, location, link, title, description, image });
            await newNews.save();
            res.redirect("/admin/international");
        } catch (error) {
            console.error("Error creating international news:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    };

    // Get news by ID (for editing)
    getNewsById = async (req, res) => {
        try {
            const news = await International.findById(req.params.id);
            if (!news) return res.status(404).json({ error: "News not found" });

            res.render("admin/editinternational", { news });
        } catch (error) {
            console.error("Error fetching news by ID:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    };

    // Update international news
    updateNews = async (req, res) => {
        try {
            const { country, name, Date, location, link, title, description } = req.body;
            const news = await International.findById(req.params.id);

            if (!news) return res.status(404).json({ error: "News not found" });

            // Update image if a new one is uploaded
            if (req.file) {
                const oldImagePath = path.join(__dirname, "../../", news.image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
                news.image = req.file.path;
            }

            news.country = country;
            news.name = name;
            news.Date = Date;
            news.location = location;
            news.link = link;
            news.title = title;
            news.description = description;

            await news.save();
            res.redirect("/admin/international");
        } catch (error) {
            console.error("Error updating international news:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    };

    // Delete international news
    deleteNews = async (req, res) => {
        try {
            const news = await International.findById(req.params.id);
            if (!news) return res.status(404).json({ error: "News not found" });

            // Delete image if it exists
            const imagePath = path.join(__dirname, "../../", news.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }

            await International.findByIdAndDelete(req.params.id);
            res.redirect("/admin/international");
        } catch (error) {
            console.error("Error deleting international news:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    };
}

module.exports = new InternationalController();
