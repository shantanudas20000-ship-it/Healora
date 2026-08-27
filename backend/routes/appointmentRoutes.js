const express = require("express");
const Appointment = require("../models/Appointment");

const router = express.Router();


// ========================================
// CREATE APPOINTMENT
// POST /api/appointments
// ========================================

router.post("/", async (req, res) => {

    try {

        const appointment =
            await Appointment.create(req.body);


        // Get doctor information also
        const populatedAppointment =
            await Appointment
                .findById(appointment._id)
                .populate(
                    "doctor",
                    "name specialty qualification experience hospital phone email"
                );


        res.status(201).json(
            populatedAppointment
        );


    } catch (error) {

        console.error(
            "Create Appointment Error:",
            error.message
        );


        res.status(400).json({
            message: error.message,
        });

    }

});


// ========================================
// GET ALL APPOINTMENTS
// GET /api/appointments
// ========================================

router.get("/", async (req, res) => {

    try {

        const appointments =
            await Appointment
                .find()
                .populate(
                    "doctor",
                    "name specialty qualification experience hospital phone email"
                )
                .sort({
                    createdAt: -1
                });


        res.json(
            appointments
        );


    } catch (error) {

        console.error(
            "Get Appointments Error:",
            error.message
        );


        res.status(500).json({
            message: error.message,
        });

    }

});


// ========================================
// GET SINGLE APPOINTMENT
// GET /api/appointments/:id
// ========================================

router.get("/:id", async (req, res) => {

    try {

        const appointment =
            await Appointment
                .findById(req.params.id)
                .populate(
                    "doctor",
                    "name specialty qualification experience hospital phone email"
                );


        if (!appointment) {

            return res.status(404).json({
                message: "Appointment not found",
            });

        }


        res.json(
            appointment
        );


    } catch (error) {

        console.error(
            "Get Single Appointment Error:",
            error.message
        );


        res.status(400).json({
            message: "Invalid appointment ID",
        });

    }

});


// ========================================
// UPDATE APPOINTMENT STATUS
// PATCH /api/appointments/:id/status
// ========================================

router.patch("/:id/status", async (req, res) => {

    try {

        const {
            status
        } = req.body;


        if (!status) {

            return res.status(400).json({
                message: "Status is required",
            });

        }


        const appointment =
            await Appointment
                .findByIdAndUpdate(
                    req.params.id,
                    {
                        status: status
                    },
                    {
                        new: true,
                        runValidators: true
                    }
                )
                .populate(
                    "doctor",
                    "name specialty qualification experience hospital phone email"
                );


        if (!appointment) {

            return res.status(404).json({
                message: "Appointment not found",
            });

        }


        res.json(
            appointment
        );


    } catch (error) {

        console.error(
            "Update Appointment Status Error:",
            error.message
        );


        res.status(400).json({
            message: error.message,
        });

    }

});


module.exports = router;