const doctorGrid =
    document.getElementById("doctorGrid");


// ========================================
// LOAD ALL DOCTORS
// ========================================

async function loadDoctors() {

    try {

        const response =
            await fetch(
                "http://localhost:5000/api/doctors"
            );


        if (!response.ok) {

            throw new Error(
                "Failed to fetch doctors"
            );

        }


        const doctors =
            await response.json();


        doctorGrid.innerHTML = "";


        if (!doctors.length) {

            doctorGrid.innerHTML = `
                <p class="loading-message">
                    No doctors found.
                </p>
            `;

            return;
        }


        doctors.forEach(
            (doctor) => {

                const card =
                    document.createElement("div");

                card.className =
                    "doctor-card";


                // Hospital name

                let hospitalName =
                    "Hospital information unavailable";


                if (
                    doctor.hospital &&
                    typeof doctor.hospital === "object"
                ) {

                    hospitalName =
                        doctor.hospital.name ||
                        hospitalName;

                }


                card.innerHTML = `

                    <div class="doctor-photo">
                        👨‍⚕️
                    </div>


                    <h2>
                        ${doctor.name}
                    </h2>


                    <div class="doctor-speciality">
                        ${doctor.specialty}
                    </div>


                    <div class="doctor-hospital">
                        🏥 ${hospitalName}
                    </div>


                    <div class="doctor-rating">
                        ⭐ 4.8
                    </div>


                    <p>
                        ${doctor.experience || 0}
                        Years Experience
                    </p>


                    <a
                        href="doctor-profile.html?doctor=${doctor._id}"
                        class="view-profile-btn"
                    >
                        View Profile
                    </a>

                `;


                doctorGrid.appendChild(card);

            }
        );

    } catch (error) {

        console.error(
            "Doctor loading error:",
            error
        );


        doctorGrid.innerHTML = `

            <p class="error-message">
                Unable to load doctors.
                Please make sure the server is running.
            </p>

        `;
    }
}


// ========================================
// START
// ========================================

loadDoctors();