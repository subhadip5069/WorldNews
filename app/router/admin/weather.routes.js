const express = require("express");
const app = express.Router();
const Weather = require("../../models/weather"); // Ensure this file path is correct


app.post("/create/weather", async (req, res) => {
    try {

        const weather = new Weather({
            name: req.body.name
        });
        await weather.save();
        res.redirect("/admin/weather");
    } catch (error) {
        res.redirect("/admin/weather");
    }
});

// Read all weather entries
app.get("/weather", async (req, res) => {
    try {
        const weatherList = await Weather.find();
       res.render("admin/weather", { weatherList });
    } catch (error) {
       res.redirect("/admin/weather");
    }
});
app.get('/cities', async (req, res) => {
    try {
      const cities = await Weather.find(); // Fetch all cities from the database
      res.json(cities); // Return the cities as JSON
    } catch (error) {
      res.status(500).send('Error fetching cities');
    }
  });


// Delete a weather entry
app.post("/delete/weather/:id", async (req, res) => {
    try {
        // Attempt to delete the weather entry by its ID
        const deletedWeather = await Weather.findByIdAndDelete(req.params.id);
        console.log(deletedWeather);

        if (!deletedWeather) {
            return res.status(404).json({ error: "Weather entry not found" });
        }

        // Redirect to the weather list after successful deletion
        res.redirect("/admin/weather");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while deleting the weather entry." });
    }
});

module.exports = app;