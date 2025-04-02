const fs = require("fs");
const path = require("path");
const LatestNews = require("../../models/latestnews");

class LatestNewsController {
    // Get all latest news
    getAllNews = async (req, res) => {
        try {
            const news = await LatestNews.find();
            res.render("admin/latestnews", { news }); // Render EJS page
        } catch (error) {
            console.error("Error fetching latest news:", error);
            res.redirect("/admin/latest");
        }
    };

    // Create new latest news
    createNews = async (req, res) => {
        try {
            const { name, Date, location, link, title, description } = req.body;
            const image = req.file ? req.file.path : null;

            const newNews = new LatestNews({ name, Date, location, link, title, description, image });
            await newNews.save();
            res.redirect("/admin/latest");
        } catch (error) {
            console.error("Error creating latest news:", error);
            res.redirect("/admin/latest");
        }
    };

    // Get news by ID (for editing)
    getNewsById = async (req, res) => {
        try {
            const news = await LatestNews.findById(req.params.id);
            if (!news) return res.status(404).json({ error: "News not found" });

            res.render("admin/editLatestNews", { news });
        } catch (error) {
            console.error("Error fetching latest news by ID:", error);
            res.redirect("/admin/latest");
        }
    };

    // Update latest news
    updateNews = async (req, res) => {
        try {
            const { name, Date, location, link, title, description } = req.body;
            const news = await LatestNews.findById(req.params.id);

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
            res.redirect("/admin/latest");
        } catch (error) {
            console.error("Error updating latest news:", error);
            res.redirect("/admin/latest");
        }
    };

    // Delete latest news
    deleteNews = async (req, res) => {
        try {
            const news = await LatestNews.findById(req.params.id);
            if (!news) return res.status(404).json({ error: "News not found" });

            // Delete image if it exists
            const imagePath = ( news.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }

            await LatestNews.findByIdAndDelete(req.params.id);
            res.redirect("/admin/latest");
        } catch (error) {
            console.error("Error deleting latest news:", error);
            res.redirect("/admin/latest");
        }
    };
}

module.exports = new LatestNewsController();
