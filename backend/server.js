const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

mongoose.set("bufferCommands", false);

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;


// ================= MONGODB EVENTS =================

mongoose.connection.on("connected", () => {
    console.log("MongoDB EVENT: connected");
});

mongoose.connection.on("error", (err) => {
    console.log("MongoDB EVENT ERROR:", err.message);
});

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB EVENT: disconnected");
});


// ================= START SERVER =================

async function startServer() {

    try {

        // MongoDB connection
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB Connected Successfully");
        console.log(
            "MongoDB State:",
            mongoose.connection.readyState
        );


        // ================= ROUTES =================

        const userRoutes =
            require("./routes/userRoutes");

        const doctorRoutes =
            require("./routes/doctorRoutes");

        const hospitalRoutes =
            require("./routes/hospitalRoutes");

        const appointmentRoutes =
            require("./routes/appointmentRoutes");


        // ================= API =================

        app.use(
            "/api/users",
            userRoutes
        );

        app.use(
            "/api/doctors",
            doctorRoutes
        );

        app.use(
            "/api/hospitals",
            hospitalRoutes
        );

        app.use(
            "/api/appointments",
            appointmentRoutes
        );


        // ================= HOME =================

        app.get("/", (req, res) => {

            res.json({
                message: "Healora Backend is Running"
            });

        });


        // ================= SERVER =================

        app.listen(PORT, () => {

            console.log(
                `Server running on port ${PORT}`
            );

        });

    } catch (error) {

        console.error(
            "MongoDB Connection Error:",
            error.message
        );

        process.exit(1);

    }

}

startServer();