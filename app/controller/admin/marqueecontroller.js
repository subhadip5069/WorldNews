const MarqueeBottom = require("../../models/marquee.bottom");
const MarqueeTop = require("../../models/marquee.top");
const MarqueeMiddle = require("../../models/marquee.middle");

class MarqueeController {
    // Render the form page with existing marquee data (if available)
    getMarqueePage = async (req, res) => {
        try {
            const marquee = await MarqueeBottom.findOne();
            const topmarquee = await MarqueeTop.findOne();
            const middlemarquee = await MarqueeMiddle.findOne(); // Assuming only one exists
            res.render("admin/marquee", { marquee, topmarquee, middlemarquee });
        } catch (error) {
            console.error(error);
            res.redirect("/admin/marquee");
        }
    };
    createMarquee = async (req, res) => {
        try {
            const { middlemarquee } = req.body;
            const marquee = new MarqueeMiddle({ middlemarquee });
            await marquee.save();
            res.redirect("/admin/marquee");
        } catch (error) {
            console.error(error);
            res.redirect("/admin/marquee");
        }
    };

    // Create or Update marquee text
    savebottomMarquee = async (req, res) => {
        try {
            const { bottommarquee } = req.body;

            let marquee = await MarqueeBottom.findOne();
            if (marquee) {
                marquee.bottommarquee = bottommarquee;
                await marquee.save();
            } else {
                marquee = new MarqueeBottom({ bottommarquee });
                await marquee.save();
            }

            res.redirect("/admin/marquee"); // Redirect back to the same page
        } catch (error) {
            console.error(error);
            res.redirect("/admin/marquee");
        }
    };
    savetopMarquee = async (req, res) => {
        try {
            const { topmarquee } = req.body;

            let marquee = await MarqueeTop.findOne();
            if (marquee) {  
                marquee.topmarquee = topmarquee;
                await marquee.save();
            } else {
                marquee = new MarqueeTop({ topmarquee });
                await marquee.save();
            }

            res.redirect("/admin/marquee"); // Redirect back to the same page
        } catch (error) {
            console.error(error);
            res.redirect("/admin/marquee");
        }
    };
    savemiddleMarquee = async (req, res) => {
        try {
            const { middlemarquee } = req.body;

            let marquee = await MarqueeMiddle.findOne();    
            if (marquee) {
                marquee.middlemarquee = middlemarquee;
                await marquee.save();
            } else {
                marquee = new MarqueeMiddle({ middlemarquee });
                await marquee.save();
            }

            res.redirect("/admin/marquee"); // Redirect back to the same page



        } catch (error) {
            console.error(error);
            res.redirect("/admin/marquee");
        }
    };
}

module.exports = new MarqueeController();
