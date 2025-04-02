const sponcerd = require("../../models/sponcerd");
const ad = require("../../models/advertice.ment");
const sideadd = require("../../models/side.ad");
class AdminpagesController {
    index = (req, res) => {
        res.render("admin/index");
    };
    addlist = (req, res) => {
        res.render("admin/addlist");
    };
    ad=(req, res) => {
        res.render("admin/ad");
    };
    sideadd=(req, res) => {
        res.render("admin/sidead");
    };
    sponcer=(req, res) => {
        res.render("admin/sponcered");
    };
    allAds=async(req, res) => {
        const sponcered = await sponcerd.find();
        const ads = await ad.find();
        const allAds = await sideadd.find();
        res.render("admin/allAds", {title: "All Ads", sponsoredAds: sponcered,advertisements: ads, sideAds: allAds });
    };
}

module.exports = new AdminpagesController();