const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();


// ========================================
// REGISTER / SIGN UP
// POST /api/users
// ========================================

router.post("/", async (req, res) => {

    try {

        const {
            name,
            email,
            password,
            phone
        } = req.body;


        // Check required fields

        if (
            !name ||
            !email ||
            !password
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "Name, email and password are required"
            });

        }


        // Clean email

        const cleanEmail =
            email.trim().toLowerCase();


        // Check existing user

        const existingUser =
            await User.findOne({
                email: cleanEmail
            });


        if (existingUser) {

            return res.status(409).json({
                success: false,
                message:
                    "An account with this email already exists"
            });

        }


        // Hash password

        const hashedPassword =
            await bcrypt.hash(
                password,
                10
            );


        // Create user

        const user =
            await User.create({

                name:
                    name.trim(),

                email:
                    cleanEmail,

                password:
                    hashedPassword,

                phone:
                    phone
                        ? phone.trim()
                        : ""

            });


        // Never send password back

        res.status(201).json({

            success: true,

            message:
                "Account created successfully",

            user: {

                id:
                    user._id,

                name:
                    user.name,

                email:
                    user.email,

                phone:
                    user.phone

            }

        });


    } catch (error) {

        console.error(
            "Register Error:",
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
// LOGIN
// POST /api/users/login
// ========================================

router.post("/login", async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;


        // Check fields

        if (
            !email ||
            !password
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Email and password are required"

            });

        }


        // Find user

        const user =
            await User.findOne({

                email:
                    email
                        .trim()
                        .toLowerCase()

            });


        if (!user) {

            return res.status(401).json({

                success: false,

                message:
                    "Invalid email or password"

            });

        }


        // Compare password

        const passwordMatch =
            await bcrypt.compare(
                password,
                user.password
            );


        if (!passwordMatch) {

            return res.status(401).json({

                success: false,

                message:
                    "Invalid email or password"

            });

        }


        // Successful login

        res.json({

            success: true,

            message:
                "Login successful",

            user: {

                id:
                    user._id,

                name:
                    user.name,

                email:
                    user.email,

                phone:
                    user.phone

            }

        });


    } catch (error) {

        console.error(
            "Login Error:",
            error.message
        );


        res.status(500).json({

            success: false,

            message:
                "Server error during login"

        });

    }

});


// ========================================
// GET ALL USERS
// GET /api/users
// ========================================

router.get("/", async (req, res) => {

    try {

        const users =
            await User.find()
                .select("-password");


        res.json(
            users
        );


    } catch (error) {

        console.error(
            "Get Users Error:",
            error.message
        );


        res.status(500).json({

            success: false,

            message:
                error.message

        });

    }

});


module.exports = router;