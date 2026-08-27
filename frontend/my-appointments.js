// ========================================
// HEALORA - MY APPOINTMENTS
// ========================================

const container =
    document.getElementById("appointmentsContainer");


// ========================================
// LOAD APPOINTMENTS
// ========================================

async function loadAppointments() {

    try {

        const response =
            await fetch(
                "http://localhost:5000/api/appointments"
            );


        if (!response.ok) {
            throw new Error(
                "Failed to load appointments"
            );
        }


        const appointments =
            await response.json();


        console.log(
            "Appointments:",
            appointments
        );


        container.innerHTML = "";


        // ========================================
        // NO APPOINTMENTS
        // ========================================

        if (appointments.length === 0) {

            container.innerHTML = `
                <div class="empty-appointments">

                    <div class="empty-icon">
                        📅
                    </div>

                    <h2>
                        No Appointments Yet
                    </h2>

                    <p>
                        You haven't booked any appointments yet.
                    </p>

                    <a
                        href="doctors.html"
                        class="confirm-btn"
                    >
                        Find a Doctor →
                    </a>

                </div>
            `;

            return;
        }


        // ========================================
        // DISPLAY APPOINTMENTS
        // ========================================

        appointments.forEach(
            (appointment) => {

                const doctor =
                    appointment.doctor;


                const consultation =
                    appointment.consultation === "clinic"
                        ? "🏥 Clinic Visit"
                        : "💻 Online Consultation";


                const status =
                    appointment.status ||
                    "Pending";


                const statusClass =
                    status.toLowerCase();


                const card =
                    document.createElement("div");


                card.className =
                    "appointment-card";


                card.innerHTML = `

                    <div class="appointment-card-header">

                        <div class="appointment-doctor">

                            <div class="appointment-doctor-photo">
                                👨‍⚕️
                            </div>

                            <div>

                                <h2>
                                    ${doctor?.name || "Doctor"}
                                </h2>

                                <p>
                                    ${doctor?.specialty || "Specialist"}
                                </p>

                            </div>

                        </div>


                        <span
                            class="appointment-status ${statusClass}"
                        >
                            ${status}
                        </span>

                    </div>


                    <div class="appointment-card-body">

                        <div class="appointment-info">

                            <span>
                                📅 Date
                            </span>

                            <strong>
                                ${appointment.date}
                            </strong>

                        </div>


                        <div class="appointment-info">

                            <span>
                                ⏰ Time
                            </span>

                            <strong>
                                ${appointment.time}
                            </strong>

                        </div>


                        <div class="appointment-info">

                            <span>
                                🏥 Consultation
                            </span>

                            <strong>
                                ${consultation}
                            </strong>

                        </div>


                        <div class="appointment-info">

                            <span>
                                💰 Fee
                            </span>

                            <strong>
                                ₹${appointment.fee || 0}
                            </strong>

                        </div>

                    </div>


                    <div class="appointment-card-footer">

                        <span>
                            Booking ID:
                            ${appointment._id}
                        </span>

                        <button
                            class="cancel-btn"
                            onclick="cancelAppointment('${appointment._id}')"
                        >
                            Cancel Appointment
                        </button>

                    </div>

                `;


                container.appendChild(card);

            }
        );


    } catch (error) {

        console.error(
            "Appointment loading error:",
            error
        );


        container.innerHTML = `

            <div class="error-appointments">

                <div class="empty-icon">
                    ⚠️
                </div>

                <h2>
                    Unable to Load Appointments
                </h2>

                <p>
                    Please make sure the backend server is running.
                </p>

            </div>

        `;

    }

}


// ========================================
// CANCEL APPOINTMENT
// ========================================

async function cancelAppointment(id) {

    const confirmCancel =
        confirm(
            "Are you sure you want to cancel this appointment?"
        );


    if (!confirmCancel) {
        return;
    }


    try {

        const response =
            await fetch(
                `http://localhost:5000/api/appointments/${id}`,
                {
                    method: "PATCH",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        status: "Cancelled"
                    })
                }
            );


        const result =
            await response.json();


        if (!response.ok) {

            throw new Error(
                result.message ||
                "Unable to cancel appointment"
            );

        }


        alert(
            "Appointment cancelled successfully."
        );


        loadAppointments();


    } catch (error) {

        console.error(
            "Cancel appointment error:",
            error
        );


        alert(
            "Unable to cancel appointment: " +
            error.message
        );

    }

}


// ========================================
// INITIAL LOAD
// ========================================

loadAppointments();