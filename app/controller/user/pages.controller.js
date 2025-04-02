
const marqueeBottom = require("../../models/marquee.bottom");
const marqueeTop = require("../../models/marquee.top");
const marqueeMiddle = require("../../models/marquee.middle");
const adverticeMent = require("../../models/advertice.ment");
const sponcerd = require("../../models/sponcerd");
const  sideadd  = require("../../models/side.ad");
const international = require("../../models/international");
const latestnews = require("../../models/latestnews");
const sports = require("../../models/sports");
const national = require("../../models/national");
const entertainment = require("../../models/entertaitment");
const health = require("../../models/health");
const video = require("../../models/video");
const weather = require("../../models/weather");
const axios = require("axios");
class UIPagesController {
    index = async (req, res) => {
        const ads = await adverticeMent.find({});  // Oldest ad
        const sideads = await sideadd.findOne({}).sort({ createdAt: -1 });  // Oldest side ad
        const sponcered = await sponcerd.findOne({}).sort({ createdAt: -1 });  // Oldest sponsored ad


        const interNational = await international.find().sort({ Date: -1 }).limit(2);  // Latest international news
        const latestNews = await latestnews.find().sort({ Date: -1 }).limit(2);  // Latest news
        const Sports = await sports.find().sort({ Date: -1 }).limit(2);  // Latest sports news
        const National = await national.find().sort({ Date: -1 }).limit(2);  // Latest national news
        const enter = await entertainment.find().sort({ Date: -1 }).limit(2);  // Latest entertainment news
        const Health = await health.find().sort({ Date: -1 }).limit(2);  // Latest health news
          // Oldest health news
        const latest = await latestnews.find();     
        // marquee   
        const middlemarquee = await marqueeMiddle.findOne({});
        const topmarquee = await marqueeTop.findOne({})
        const bottommarquee = await marqueeBottom.findOne({})
        const videos = await video.findOne();
        // slider
        const iN = await international.find({}).sort({ date: -1 }).limit(2);
        const Sp = await sports.find({}).sort({ date: -1 }).limit(2);
        const lat = await latestnews.find({}).sort({ date: -1 }).limit(2);
        const nat = await national.find({}).sort({ date: -1 }).limit(2);
        const ent = await entertainment.find({}).sort({ date: -1 }).limit(2);
        const hea = await health.find({}).sort({ date: -1 }).limit(2);

        // scrolling news
        const IN = await international.find({});
        const SP = await sports.find({});
        const LAT = await latestnews.find({});
        const NAT = await national.find({});
        const ENT = await entertainment.find({});
        const HEA = await health.find({});
    
        // Find the latest one among them

 
        const weatherReport = await weather.find({}, "name"); // Get only the name field

        // If no records are found
        if (!weatherReport || weatherReport.length === 0) {
            return res.render("weatherPage", { weatherData: [], error: "No locations found" });
        }
        
        // OpenWeather API Key
        const weatherAPIKey = "3d6ff3fe3e01aecf76456580301c8ac7";
        
        // Fetch weather data for multiple locations
        const weatherData = await Promise.all(
            weatherReport.map(async (weather) => {
                try {
                    const response = await fetch(
                        `https://api.openweathermap.org/data/2.5/weather?q=${weather.name}&units=metric&appid=${weatherAPIKey}`
                    );
                    if (!response.ok) throw new Error("Weather data not found");
        
                    const data = await response.json();
                    return {
                        location: data.name, // Display location name
                        temperature: `${data.main.temp}`,
                        condition: data.weather[0].description,
                        humidity: `${data.main.humidity}`, // Added Humidity
                        wind_speed: `${data.wind.speed} `, // Added Wind Speed
                    };
                } catch (error) {
                    console.error(`Error fetching weather for ${weather.name}:`, error);
                    return { 
                        location: weather.name, 
                        temperature: "-", 
                        condition: "Error fetching data",
                        humidity: "-",
                        wind_speed: "-"
                    };
                }
            })
        );
    
        res.render("user/index", { latestNews, middlemarquee, topmarquee, bottommarquee, ads, sideads, sponcered, interNational, Sports, National, enter, Health,latest,videos, iN, Sp, lat, nat, ent, hea, IN, SP, LAT, NAT, ENT, HEA ,weatherData  });
    };
    
    
    details(req, res) {
        res.render("user/details");
    }
    detailNAT=async(req, res)=> {
        const { id } = req.params;
        const sponcered = await sponcerd.findOne({}).sort({ createdAt: -1 });  // Oldest sponsored ad
        const ads = await adverticeMent.find({});  // Oldest ad
        const sideads = await sideadd.findOne({}).sort({ createdAt: -1 });  // Oldest side ad
        const news = await national.findById(id);
        const outherNews = await national.find({ _id: { $ne: id } }).sort({ Date: -1 });
        res.render("user/details", { news, outherNews, sponcered, ads, sideads });
    }
    detailSPO=async(req, res)=> {
        const { id } = req.params;
        const sponcered = await sponcerd.findOne({}).sort({ createdAt: -1 });  // Oldest sponsored ad
        const ads = await adverticeMent.find({});  // Oldest ad
        const sideads = await sideadd.findOne({}).sort({ createdAt: -1 });
        const news = await sports.findById(id);
        const outherNews = await sports.find({ _id: { $ne: id } }).sort({ Date: -1 });
        res.render("user/details", { news, outherNews, sponcered, ads, sideads });
    }
    detailENT=async(req, res)=> {
        const { id } = req.params;
        const sponcered = await sponcerd.findOne({}).sort({ createdAt: -1 });  // Oldest sponsored ad
        const ads = await adverticeMent.find({});  // Oldest ad
        const sideads = await sideadd.findOne({}).sort({ createdAt: -1 });
        const news = await entertainment.findById(id);
        const outherNews = await entertainment.find({ _id: { $ne: id } }).sort({ Date: -1 });
        res.render("user/details", { news, outherNews, sponcered, ads, sideads });
    }
    detailHEA=async(req, res)=> {
        const { id } = req.params;
        const sponcered = await sponcerd.findOne({}).sort({ createdAt: -1 });  // Oldest sponsored ad
        const ads = await adverticeMent.find({});  // Oldest ad
        const sideads = await sideadd.findOne({}).sort({ createdAt: -1 });
        const news = await health.findById(id);
        const outherNews = await health.find({ _id: { $ne: id } }).sort({ Date: -1 });
        res.render("user/details", { news, outherNews, sponcered, ads, sideads });
    }
   
    detailLAT=async(req, res)=> {
        const { id } = req.params;
        const sponcered = await sponcerd.findOne({}).sort({ createdAt: -1 });  // Oldest sponsored ad
        const ads = await adverticeMent.find({});  // Oldest ad
        const sideads = await sideadd.findOne({}).sort({ createdAt: -1 });
        const news = await latestnews.findById(id);
        const outherNews = await latestnews.find({ _id: { $ne: id } }).sort({ Date: -1 });
        res.render("user/details", { news, outherNews, sponcered, ads, sideads });
    }
    detailINT=async(req, res)=> {
        const { id } = req.params;
        const sponcered = await sponcerd.findOne({}).sort({ createdAt: -1 });  // Oldest sponsored ad
        const ads = await adverticeMent.find({});  // Oldest ad
        const sideads = await sideadd.findOne({}).sort({ createdAt: -1 });
        const news = await international.findById(id);
        const outherNews = await international.find({ _id: { $ne: id } }).sort({ Date: -1 });
        res.render("user/details", { news, outherNews , sponcered, ads, sideads });
    }

    National = async (req, res) => {
        
        const sponcered = await sponcerd.findOne({}).sort({ createdAt: -1 });  // Oldest sponsored ad
        const ads = await adverticeMent.find({});  // Oldest ad
        const sideads = await sideadd.findOne({}).sort({ createdAt: -1 });
        const outherNews = await national.find();
        res.render("user/common", {  outherNews , sponcered, ads, sideads });
    }
    International = async (req, res) => {
        const sponcered = await sponcerd.findOne({}).sort({ createdAt: -1 });  // Oldest sponsored ad
        const ads = await adverticeMent.find({});  // Oldest ad
        const sideads = await sideadd.findOne({}).sort({ createdAt: -1 });
        const outherNews = await international.find();
        res.render("user/common", {  outherNews , sponcered, ads, sideads });
    }
    Sports = async (req, res) => {
        const sponcered = await sponcerd.findOne({}).sort({ createdAt: -1 });  // Oldest sponsored ad
        const ads = await adverticeMent.find({});  // Oldest ad
        const sideads = await sideadd.findOne({}).sort({ createdAt: -1 });
        const outherNews = await sports.find();
        res.render("user/common", { outherNews , sponcered, ads, sideads });
    }
    Entertainment = async (req, res) => {
        const sponcered = await sponcerd.findOne({}).sort({ createdAt: -1 });  // Oldest sponsored ad
        const ads = await adverticeMent.find({});  // Oldest ad
        const sideads = await sideadd.findOne({}).sort({ createdAt: -1 });
        const outherNews = await entertainment.find();
        res.render("user/common", { outherNews , sponcered, ads, sideads });
    }
    Health = async (req, res) => {
        const sponcered = await sponcerd.findOne({}).sort({ createdAt: -1 });  // Oldest sponsored ad
        const ads = await adverticeMent.find({});  // Oldest ad
        const sideads = await sideadd.findOne({}).sort({ createdAt: -1 });
        const outherNews = await health.find();
        res.render("user/common", { outherNews , sponcered, ads, sideads });
    }
   Latestnews = async (req, res) => {
        const sponcered = await sponcerd.findOne({}).sort({ createdAt: -1 });  // Oldest sponsored ad
        const ads = await adverticeMent.find({});  // Oldest ad
        const sideads = await sideadd.findOne({}).sort({ createdAt: -1 });
        const outherNews = await latestnews.find();
        res.render("user/common", {  outherNews , sponcered, ads, sideads });
    }
}

module.exports = new UIPagesController();