const express = require("express");
const bodyParser = require("body-parser");
const { Deal } = require("./model");

const app = express();
app.use(bodyParser.json());

// Route to get contract by id
app.get("/deals", async (req, res, next) => {
    try {

        const hubSpotDeals = await Deal.findAll();

        if (!hubSpotDeals) {
            return res.status(404).json({ message: "No Deals available", data: null });
        }

        res.status(200).json({message: "Deals fetched successfully", data: hubSpotDeals});
    } catch (error) {
        next(error);
    }
});


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.message, err.stack);                                                                                                             

    res.status(500).json({
        message: "An error occurred",
		data: null
    });
});

module.exports = app;
