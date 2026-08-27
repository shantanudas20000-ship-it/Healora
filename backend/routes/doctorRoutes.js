const express = require("express");
const Doctor = require("../models/Doctor");

const router = express.Router();


// ========================================
// CREATE DOCTOR
// POST /api/doctors
// ========================================

router.post("/", async (req, res) => {

    try {

        const doctor =
            await Doctor.create(req.body);


        res.status(201).json({

            success: true,

            message:
                "Doctor created successfully",

            doctor

        });


    } catch (error) {

        console.error(
            "Create Doctor Error:",
            error.message
        );


        res.status(400).json({

            success: false,

            message:
                error.message

        });

    }

});


// ========================================
// GET ALL DOCTORS
// GET /api/doctors
// ========================================

router.get("/", async (req, res) => {

    try {

        const doctors =
            await Doctor
                .find()
                .sort({
                    createdAt: -1
                });


        res.json(
            doctors
        );


    } catch (error) {

        console.error(
            "Get Doctors Error:",
            error.message
        );


        res.status(500).json({

            success: false,

            message:
                error.message

        });

    }

});


// ========================================
// GET SINGLE DOCTOR
// GET /api/doctors/:id
// ========================================

router.get("/:id", async (req, res) => {

    try {

        const doctor =
            await Doctor.findById(
                req.params.id
            );


        if (!doctor) {

            return res.status(404).json({

                success: false,

                message:
                    "Doctor not found"

            });

        }


        console.log(
            "Doctor found:",
            doctor
        );


        res.json(
            doctor
        );


    } catch (error) {

        console.error(
            "Get Single Doctor Error:",
            error.message
        );


        res.status(400).json({

            success: false,

            message:
                "Invalid doctor ID"

        });

    }

});


module.exports = router;