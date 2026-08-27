const mongoose = require("mongoose");
require("dotenv").config();

const Doctor = require("./models/Doctor");
const Hospital = require("./models/Hospital");

const doctors = [
  {
    name: "Dr. Rahul Sharma",
    specialty: "Cardiology",
    qualification: "MBBS, MD",
    experience: 10,
    hospital: "Healora Hospital",
    phone: "9876543210",
    email: "rahul@healora.com",
  },
  {
    name: "Dr. Priya Sen",
    specialty: "Dermatology",
    qualification: "MBBS, MD Dermatology",
    experience: 8,
    hospital: "City Care Hospital",
    phone: "9876543211",
    email: "priya@citycare.com",
  },
];

const hospitals = [
  {
    name: "Healora Hospital",
    address: "Park Street",
    city: "Kolkata",
    phone: "03340000001",
    email: "info@healora.com",
    specialties: ["Cardiology", "Neurology", "Orthopedics"],
    emergency: true,
  },
  {
    name: "City Care Hospital",
    address: "Salt Lake",
    city: "Kolkata",
    phone: "03340000002",
    email: "info@citycare.com",
    specialties: ["Dermatology", "Pediatrics", "General Medicine"],
    emergency: true,
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    await Doctor.deleteMany();
    await Hospital.deleteMany();

    await Doctor.insertMany(doctors);
    await Hospital.insertMany(hospitals);

    console.log("Doctor data inserted successfully");
    console.log("Hospital data inserted successfully");

    await mongoose.disconnect();

    console.log("Database seeding completed");
  } catch (error) {
    console.error("Seed Error:", error.message);
    process.exit(1);
  }
}

seedDatabase();