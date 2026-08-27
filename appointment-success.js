// ========================================
// APPOINTMENT SUCCESS PAGE
// Healora
// ========================================


// Get appointment ID from URL
const urlParams = new URLSearchParams(
    window.location.search
);

const appointmentId = urlParams.get("id");


// Elements
const loading =
    document.getElementById("loading");

const errorBox =
    document.getElementById("error");

const successCard =
    document.getElementById("successCard");


// ========================================
// LOAD APPOINTMENT
// ========================================

async function loadAppointment() {

    // Check appointment ID
    if (!appointmentId) {

        showError(
            "Appointment ID is missing."
        );

        return;
    }


    try {

        const response = await fetch(
            `http://localhost:5000/api/appointments/${appointmentId}`
        );


        if (!response.ok) {

            throw new Error(
                "Appointment not found"
            );

        }


        const appointment =
            await response.json();


        console.log(
            "Appointment:",
            appointment
        );


        // ========================================
        // DOCTOR DATA
        // ========================================

        const doctor =
            appointment.doctor || {};


        // ========================================
        // APPOINTMENT ID
        // ========================================

        document.getElementById(
            "appointmentId"
        ).textContent =
            appointment._id || "-";


        // ========================================
        // DOCTOR
        // ========================================

        document.getElementById(
            "doctorName"
        ).textContent =
            doctor.name ||
            "Doctor information unavailable";


        // ========================================
        // HOSPITAL
        // ========================================

        document.getElementById(
            "hospitalName"
        ).textContent =
            doctor.hospital ||
            "Hospital information unavailable";


        // ========================================
        // CONSULTATION TYPE
        // ========================================

        let consultationText = "-";


        if (
            appointment.consultation ===
            "clinic"
        ) {

            consultationText =
                "Clinic Visit";

        } else if (
            appointment.consultation ===
            "online"
        ) {

            consultationText =
                "Online Consultation";

        }


        document.getElementById(
            "consultation"
        ).textContent =
            consultationText;


        // ========================================
        // DATE
        // ========================================

        document.getElementById(
            "appointmentDate"
        ).textContent =
            appointment.date || "-";


        // ========================================
        // TIME
        // ========================================

        document.getElementById(
            "appointmentTime"
        ).textContent =
            appointment.time || "-";


        // ========================================
        // FEE
        // ========================================

        document.getElementById(
            "appointmentFee"
        ).textContent =
            `₹${appointment.fee ?? 800}`;


        // ========================================
        // STATUS
        // ========================================

        const statusElement =
            document.getElementById(
                "appointmentStatus"
            );


        statusElement.textContent =
            appointment.status ||
            "Pending";


        // ========================================
        // PATIENT NAME
        // ========================================

        document.getElementById(
            "patientName"
        ).textContent =
            appointment.name || "-";


        // ========================================
        // PATIENT PHONE
        // ========================================

        document.getElementById(
            "patientPhone"
        ).textContent =
            appointment.phone || "-";


        // ========================================
        // PATIENT EMAIL
        // ========================================

        document.getElementById(
            "patientEmail"
        ).textContent =
            appointment.email || "-";


        // ========================================
        // SHOW SUCCESS CARD
        // ========================================

        loading.classList.add(
            "hidden"
        );

        errorBox.classList.add(
            "hidden"
        );

        successCard.classList.remove(
            "hidden"
        );


    } catch (error) {

        console.error(
            "Appointment loading error:",
            error
        );


        showError(
            "Unable to load appointment information."
        );

    }

}


// ========================================
// SHOW ERROR
// ========================================

function showError(message) {

    loading.classList.add(
        "hidden"
    );

    successCard.classList.add(
        "hidden"
    );

    errorBox.textContent =
        message;

    errorBox.classList.remove(
        "hidden"
    );

}


// ========================================
// START
// ========================================

loadAppointment();