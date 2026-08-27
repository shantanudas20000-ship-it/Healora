const express = require("express");
const Hospital = require("../models/Hospital");

const router = express.Router();


// ========================================
// CREATE HOSPITAL
// POST /api/hospitals
// ========================================

router.post("/", async (req, res) => {

    try {

        const hospital =
            await Hospital.create(req.body);

        res.status(201).json(hospital);

    } catch (error) {

        console.error(
            "Create Hospital Error:",
            error.message
        );

        res.status(400).json({
            message: error.message,
        });

    }

});


// ========================================
// GET ALL HOSPITALS
// GET /api/hospitals
// ========================================

router.get("/", async (req, res) => {

    try {

        const hospitals =
            await Hospital.find();

        res.json(hospitals);

    } catch (error) {

        console.error(
            "Get Hospitals Error:",
            error.message
        );

        res.status(500).json({
            message: error.message,
        });

    }

});


// ========================================
// GET SINGLE HOSPITAL
// GET /api/hospitals/:id
// ========================================

router.get("/:id", async (req, res) => {

    try {

        const hospital =
            await Hospital.findById(
                req.params.id
            );


        if (!hospital) {

            return res.status(404).json({
                message: "Hospital not found",
            });

        }


        res.json(hospital);


    } catch (error) {

        console.error(
            "Get Single Hospital Error:",
            error.message
        );


        res.status(400).json({
            message: "Invalid hospital ID",
        });

    }

});


module.exports = router;