const fs = require("fs");
const path = require("path");
const Entertainment = require("../../models/entertaitment");

class EntertainmentController {
    // Get all entertainment news
    getAllNews = async (req, res) => {
        try {
            const news = await Entertainment.find();
            res.render("admin/entartaitment", { news }); // Render EJS page
        } catch (error) {
            console.error("Error fetching entertainment news:", error);
            res.redirect("/admin/entertainment");

        }
    };

    // Create new entertainment news
    createNews = async (req, res) => {
        try {
            const { name, location, Date, link, title, description } = req.body;
            const image = req.file ? req.file.path : null;

            const newNews = new Entertainment({ name, location, Date, link, title, description, image });
            await newNews.save();
            res.redirect("/admin/entertainment#sportsContainer");
        } catch (error) {
            console.error("Error creating entertainment news:", error);
            res.redirect("/admin/entertainment");

        }
    };

    // Get news by ID (for editing)
    getNewsById = async (req, res) => {
        try {
            const news = await Entertainment.findById(req.params.id);
            if (!news) return res.status(404).json({ error: "News not found" });

            res.render("admin/editentertaitment", { news });
        } catch (error) {
            console.error("Error fetching news by ID:", error);
            res.redirect("/admin/entertainment");

        }
    };

    // Update entertainment news
    updateNews = async (req, res) => {
        try {
            const { name, location, Date, link, title, description } = req.body;
            const news = await Entertainment.findById(req.params.id);

            if (!news) return res.status(404).json({ error: "News not found" });

            // Update image if a new one is uploaded
            if (req.file) {
                const oldImagePath = ( news.image)
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
                news.image = req.file.path;
            }

            news.name = name;
            news.location = location;
            news.Date = Date;
            news.link = link;
            news.title = title;
            news.description = description;

            await news.save();
            res.redirect("/admin/entertainment#sportsContainer");
        } catch (error) {
            console.error("Error updating entertainment news:", error);
            res.redirect("/admin/entertainment");

        }
    };

    // Delete entertainment news
    deleteNews = async (req, res) => {
        try {
            const news = await Entertainment.findById(req.params.id);
            if (!news) return res.status(404).json({ error: "News not found" });

            // Delete image if it exists
            const imagePath = ( news.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }

            await Entertainment.findByIdAndDelete(req.params.id);
            res.redirect("/admin/entertainment#sportsContainer");
        } catch (error) {
            console.error("Error deleting entertainment news:", error);
            res.redirect("/admin/entertainment");

        }
    };
}

module.exports = new EntertainmentController();
