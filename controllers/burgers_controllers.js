var express = require("express");
// Import the model to use its db functions for burger.js
var burger = require("../models/burger");

// Create the router for the app, and export the router at the end of your file.
var router = express.Router();
// Create routes and set up logic where required.
// Get, Post, Put, and Delete routes
router.get("/", function (req, res) {
    burger.selectAll(function (data) {
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});
// Add new burger to the db.
router.post("/api/burgers", function (req, res) {
    burger.insertOne(["burger_name", "devoured"], [req.body.burger_name, req.body.devoured], function (result) {
        // Send back the ID of the new burger
        res.json({ id: result.insertId });
    });
});
// Set burger devoured status to true.
router.put("/api/burgers/:id", function (req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.updateOne({ devoured: req.body.devoured }, condition, function (result) {
        if (result.changedRows === 0) {
            // If no rows were changed, then the ID must not exist, so 404.
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});
// Delete burger from db.
router.delete("/api/burgers/:id", function (req, res) {
    var condition = "id = " + req.params.id;
    console.log("condition", condition);

    burger.deleteOne(condition, function (result) {
        if (result.changedRows === 0) {
            // If no rows were changed, then the ID must not exist, so 404.
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

module.exports = router;