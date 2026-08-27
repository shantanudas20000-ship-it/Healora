const appointmentForm =
    document.getElementById("appointmentForm");

const doctorId =
    new URLSearchParams(window.location.search)
        .get("doctor");

const doctorName =
    document.getElementById("doctorName");

const doctorSpecialty =
    document.getElementById("doctorSpecialty");

const doctorHospital =
    document.getElementById("doctorHospital");

const formMessage =
    document.getElementById("formMessage");

const submitBtn =
    document.getElementById("submitBtn");


// ========================================
// LOAD DOCTOR
// ========================================

async function loadDoctor() {

    if (!doctorId) {

        doctorName.textContent =
            "Doctor not selected";

        doctorSpecialty.textContent =
            "Please select a doctor first";

        doctorHospital.textContent =
            "";

        submitBtn.disabled = true;

        return;
    }


    try {

        const response = await fetch(
            `http://localhost:5000/api/doctors/${doctorId}`
        );


        if (!response.ok) {

            throw new Error(
                "Doctor not found"
            );

        }


        const doctor =
            await response.json();


        doctorName.textContent =
            doctor.name || "Doctor Name";


        doctorSpecialty.textContent =
            doctor.specialty || "Specialist";


        doctorHospital.textContent =
            `🏥 ${doctor.hospital || "Hospital information unavailable"}`;


    } catch (error) {

        console.error(
            "Doctor loading error:",
            error
        );


        doctorName.textContent =
            "Unable to load doctor";


        doctorSpecialty.textContent =
            "";


        doctorHospital.textContent =
            "";


        submitBtn.disabled = true;

    }

}


// ========================================
// SET MINIMUM DATE
// ========================================

function setMinimumDate() {

    const dateInput =
        document.getElementById("date");


    const today =
        new Date();


    const year =
        today.getFullYear();


    const month =
        String(today.getMonth() + 1)
            .padStart(2, "0");


    const day =
        String(today.getDate())
            .padStart(2, "0");


    const todayString =
        `${year}-${month}-${day}`;


    dateInput.min =
        todayString;

}


// ========================================
// SUBMIT APPOINTMENT
// ========================================

appointmentForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        if (!doctorId) {

            showMessage(
                "Please select a doctor first.",
                "error"
            );

            return;
        }


        const selectedConsultation =
            document.querySelector(
                'input[name="consultation"]:checked'
            );


        if (!selectedConsultation) {

            showMessage(
                "Please select consultation type.",
                "error"
            );

            return;
        }


        const consultation =
            selectedConsultation.value;


        const date =
            document.getElementById("date").value;


        const time =
            document.getElementById("time").value;


        const name =
            document.getElementById("name")
                .value
                .trim();


        const phone =
            document.getElementById("phone")
                .value
                .trim();


        const email =
            document.getElementById("email")
                .value
                .trim();


        const message =
            document.getElementById("message")
                .value
                .trim();


        if (
            !consultation ||
            !date ||
            !time ||
            !name ||
            !phone ||
            !email
        ) {

            showMessage(
                "Please fill in all required fields.",
                "error"
            );

            return;
        }


        // Disable button

        submitBtn.disabled = true;

        submitBtn.textContent =
            "Booking Appointment...";


        try {

            const response = await fetch(
                "http://localhost:5000/api/appointments",
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        doctor:
                            doctorId,

                        consultation:
                            consultation,

                        date:
                            date,

                        time:
                            time,

                        name:
                            name,

                        phone:
                            phone,

                        email:
                            email,

                        message:
                            message,

                        fee:
                            800,

                        status:
                            "Pending"

                    })

                }
            );


            const data =
                await response.json();


            console.log(
                "Appointment response:",
                data
            );


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Appointment booking failed"
                );

            }


            // ========================================
            // SUCCESS
            // ========================================

            showMessage(
                "✅ Appointment booked successfully!",
                "success"
            );


            submitBtn.textContent =
                "Appointment Confirmed";


            /*
             * IMPORTANT:
             *
             * Redirect to appointment-success.html
             * with MongoDB appointment ID.
             */

            const newAppointmentId =
                data._id ||
                (data.appointment &&
                    data.appointment._id);


            if (!newAppointmentId) {

                throw new Error(
                    "Appointment created but ID was not returned by server."
                );

            }


            // Redirect after 1.5 seconds

            setTimeout(() => {

                window.location.href =
                    `appointment-success.html?id=${newAppointmentId}`;

            }, 1500);


        } catch (error) {

            console.error(
                "Appointment error:",
                error
            );


            showMessage(
                error.message ||
                "Unable to book appointment.",
                "error"
            );


            submitBtn.disabled =
                false;


            submitBtn.textContent =
                "📅 Confirm Appointment";

        }

    }
);


// ========================================
// SHOW MESSAGE
// ========================================

function showMessage(
    message,
    type
) {

    formMessage.textContent =
        message;


    if (type === "success") {

        formMessage.style.color =
            "#16834b";

    } else {

        formMessage.style.color =
            "#d9534f";

    }

}


// ========================================
// INITIAL LOAD
// ========================================

setMinimumDate();

loadDoctor();