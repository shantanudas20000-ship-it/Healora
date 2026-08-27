// ========================================
// HEALORA DASHBOARD
// ========================================


// ========================================
// GET CURRENT USER
// ========================================

function getCurrentUser() {

    const localLogin =
        localStorage.getItem("healoraLogin");

    const sessionLogin =
        sessionStorage.getItem("healoraLogin");


    if (localLogin) {
        return JSON.parse(localLogin);
    }

    if (sessionLogin) {
        return JSON.parse(sessionLogin);
    }

    return null;
}


const currentUser =
    getCurrentUser();


// ========================================
// CHECK LOGIN
// ========================================

if (!currentUser) {

    alert(
        "Please login to access your dashboard."
    );

    window.location.href =
        "login.html";

}


// ========================================
// PROFILE
// ========================================

if (currentUser) {

    document.getElementById(
        "userName"
    ).textContent =
        currentUser.name || "User";


    document.getElementById(
        "profileName"
    ).textContent =
        currentUser.name || "-";


    document.getElementById(
        "profileEmail"
    ).textContent =
        currentUser.email || "-";


    const savedUser =
        localStorage.getItem(
            "healoraUser"
        );


    if (savedUser) {

        try {

            const user =
                JSON.parse(savedUser);

            document.getElementById(
                "profilePhone"
            ).textContent =
                user.phone || "-";

        } catch (error) {

            document.getElementById(
                "profilePhone"
            ).textContent =
                currentUser.phone || "-";

        }

    } else {

        document.getElementById(
            "profilePhone"
        ).textContent =
            currentUser.phone || "-";

    }

}


// ========================================
// GET APPOINTMENTS
// ========================================

function getAppointments() {

    const saved =
        localStorage.getItem(
            "healoraAppointments"
        );


    if (!saved) {
        return [];
    }


    try {

        const data =
            JSON.parse(saved);

        return Array.isArray(data)
            ? data
            : [];

    } catch (error) {

        return [];

    }

}


// ========================================
// SAVE APPOINTMENTS
// ========================================

function saveAppointments(
    appointments
) {

    localStorage.setItem(
        "healoraAppointments",
        JSON.stringify(
            appointments
        )
    );

}


// ========================================
// LOAD APPOINTMENTS
// ========================================

function loadAppointments() {

    const list =
        document.getElementById(
            "appointmentsList"
        );


    const appointments =
        getAppointments();


    const userAppointments =
        appointments.filter(
            function(appointment) {

                return (
                    appointment.email ===
                    currentUser.email
                );

            }
        );


    if (
        userAppointments.length === 0
    ) {

        list.innerHTML = `

            <div class="empty-appointments">

                <div style="font-size:40px;">
                    📅
                </div>

                <p>
                    You don't have any appointments yet.
                </p>

                <a
                    href="doctors.html"
                    class="book-btn"
                >
                    Find a Doctor
                </a>

            </div>

        `;

        return;

    }


    list.innerHTML = "";


    userAppointments.forEach(
        function(appointment) {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "appointment-card";


            if (
                appointment.status ===
                "Cancelled"
            ) {

                card.classList.add(
                    "cancelled"
                );

            }


            const isCancelled =
                appointment.status ===
                "Cancelled";


            const statusClass =
                isCancelled
                    ? "status-cancelled"
                    : "status-confirmed";


            const statusText =
                appointment.status ||
                "Confirmed";


            card.innerHTML = `

                <div class="appointment-top">

                    <div>

                        <div class="appointment-doctor">

                            ${escapeHTML(
                                appointment.doctor ||
                                "Doctor"
                            )}

                        </div>

                        <div class="appointment-speciality">

                            ${escapeHTML(
                                appointment.speciality ||
                                "Specialist"
                            )}

                        </div>

                    </div>


                    <span
                        class="appointment-status ${statusClass}"
                    >

                        ${statusText}

                    </span>

                </div>


                <div class="appointment-details">


                    <div class="detail-box">

                        <small>
                            📅 Date
                        </small>

                        <strong>
                            ${escapeHTML(
                                appointment.date || "-"
                            )}
                        </strong>

                    </div>


                    <div class="detail-box">

                        <small>
                            🕐 Time
                        </small>

                        <strong>
                            ${escapeHTML(
                                appointment.time || "-"
                            )}
                        </strong>

                    </div>


                    <div class="detail-box">

                        <small>
                            🏥 Hospital
                        </small>

                        <strong>
                            ${escapeHTML(
                                appointment.hospital || "-"
                            )}
                        </strong>

                    </div>


                </div>


                ${
                    !isCancelled
                    ? `

                        <div class="appointment-actions">

                            <button
                                class="action-btn reschedule-btn"
                                onclick="openReschedule('${appointment.id}')"
                            >
                                🔄 Reschedule
                            </button>


                            <button
                                class="action-btn cancel-btn"
                                onclick="cancelAppointment('${appointment.id}')"
                            >
                                ❌ Cancel
                            </button>

                        </div>

                    `
                    : ""
                }

            `;


            list.appendChild(card);

        }
    );

}


// ========================================
// CANCEL APPOINTMENT
// ========================================

function cancelAppointment(
    appointmentId
) {

    const confirmCancel =
        confirm(
            "Are you sure you want to cancel this appointment?"
        );


    if (!confirmCancel) {
        return;
    }


    const appointments =
        getAppointments();


    const index =
        appointments.findIndex(
            function(appointment) {

                return (
                    appointment.id ===
                    appointmentId &&
                    appointment.email ===
                    currentUser.email
                );

            }
        );


    if (index === -1) {

        alert(
            "Appointment not found."
        );

        return;

    }


    appointments[index].status =
        "Cancelled";


    appointments[index].cancelledAt =
        new Date().toISOString();


    saveAppointments(
        appointments
    );


    alert(
        "Appointment cancelled successfully."
    );


    loadAppointments();

}


// ========================================
// RESCHEDULE
// ========================================

let selectedAppointmentId =
    null;


function openReschedule(
    appointmentId
) {

    selectedAppointmentId =
        appointmentId;


    const appointment =
        getAppointments().find(
            function(item) {

                return (
                    item.id ===
                    appointmentId &&
                    item.email ===
                    currentUser.email
                );

            }
        );


    if (!appointment) {

        alert(
            "Appointment not found."
        );

        return;

    }


    document.getElementById(
        "newDate"
    ).value =
        appointment.date || "";


    document.getElementById(
        "newTime"
    ).value =
        appointment.time || "";


    document.getElementById(
        "rescheduleModal"
    ).classList.add(
        "show"
    );

}


// ========================================
// CLOSE MODAL
// ========================================

document
    .getElementById(
        "closeModal"
    )
    .addEventListener(
        "click",
        function() {

            closeReschedule();

        }
    );


function closeReschedule() {

    selectedAppointmentId =
        null;


    document.getElementById(
        "rescheduleModal"
    ).classList.remove(
        "show"
    );

}


// ========================================
// SAVE RESCHEDULE
// ========================================

document
    .getElementById(
        "saveReschedule"
    )
    .addEventListener(
        "click",
        function() {

            if (
                !selectedAppointmentId
            ) {

                return;

            }


            const newDate =
                document.getElementById(
                    "newDate"
                ).value;


            const newTime =
                document.getElementById(
                    "newTime"
                ).value;


            if (
                !newDate ||
                !newTime
            ) {

                alert(
                    "Please select both date and time."
                );

                return;

            }


            const selectedDate =
                new Date(
                    newDate + "T" + newTime
                );


            if (
                selectedDate <=
                new Date()
            ) {

                alert(
                    "Please select a future date and time."
                );

                return;

            }


            const appointments =
                getAppointments();


            const index =
                appointments.findIndex(
                    function(appointment) {

                        return (
                            appointment.id ===
                            selectedAppointmentId &&
                            appointment.email ===
                            currentUser.email
                        );

                    }
                );


            if (index === -1) {

                alert(
                    "Appointment not found."
                );

                closeReschedule();

                return;

            }


            appointments[index].date =
                newDate;


            appointments[index].time =
                newTime;


            appointments[index].status =
                "Confirmed";


            appointments[index].rescheduledAt =
                new Date().toISOString();


            saveAppointments(
                appointments
            );


            closeReschedule();


            alert(
                "Appointment rescheduled successfully."
            );


            loadAppointments();

        }
    );


// ========================================
// LOGOUT
// ========================================

document
    .getElementById(
        "logoutBtn"
    )
    .addEventListener(
        "click",
        function() {

            localStorage.removeItem(
                "healoraLogin"
            );


            sessionStorage.removeItem(
                "healoraLogin"
            );


            window.location.href =
                "login.html";

        }
    );


// ========================================
// SECURITY HELPER
// ========================================

function escapeHTML(
    value
) {

    return String(value)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


// ========================================
// INITIAL LOAD
// ========================================

if (currentUser) {

    loadAppointments();

}