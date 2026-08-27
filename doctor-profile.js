const doctorId =
    new URLSearchParams(window.location.search).get("doctor");

const loading = document.getElementById("loading");
const error = document.getElementById("error");
const doctorProfile = document.getElementById("doctorProfile");
const doctorAbout = document.getElementById("doctorAbout");

async function loadDoctor() {

    if (!doctorId) {
        showError();
        return;
    }

    try {

        const response = await fetch(
            `http://localhost:5000/api/doctors/${doctorId}`
        );

        if (!response.ok) {
            throw new Error("Doctor not found");
        }

        const doctor = await response.json();

        document.getElementById("doctorName").textContent =
            doctor.name || "Doctor Name";

        document.getElementById("doctorSpecialty").textContent =
            doctor.specialty || "Specialist";

        document.getElementById("doctorQualification").textContent =
            doctor.qualification || "Qualification not available";

        document.getElementById("doctorHospital").textContent =
            doctor.hospital || "Hospital information unavailable";

        document.getElementById("doctorExperience").textContent =
            doctor.experience
                ? `${doctor.experience} Years`
                : "Experience not available";

        document.getElementById("doctorPhone").textContent =
            doctor.phone || "Not available";

        document.getElementById("doctorEmail").textContent =
            doctor.email || "Not available";


        // Book Appointment button
        document.getElementById("bookAppointment").href =
            `appointment.html?doctor=${doctor._id}`;


        loading.classList.add("hidden");

        doctorProfile.classList.remove("hidden");

        doctorAbout.classList.remove("hidden");

    } catch (err) {

        console.error(
            "Doctor profile error:",
            err
        );

        showError();
    }
}


function showError() {

    loading.classList.add("hidden");

    doctorProfile.classList.add("hidden");

    doctorAbout.classList.add("hidden");

    error.classList.remove("hidden");
}


loadDoctor();