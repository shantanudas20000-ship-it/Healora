const homeDoctorGrid =
    document.getElementById("homeDoctorGrid");

async function loadHomeDoctors() {

    try {

        const response =
            await fetch(
                "http://localhost:5000/api/doctors"
            );

        if (!response.ok) {
            throw new Error("Failed to load doctors");
        }

        const doctors =
            await response.json();

        homeDoctorGrid.innerHTML = "";

        if (doctors.length === 0) {

            homeDoctorGrid.innerHTML =
                "<p>No doctors found.</p>";

            return;
        }

        doctors.slice(0, 3).forEach((doctor) => {

            const card =
                document.createElement("div");

            card.className = "doctor-card";

            card.innerHTML = `

                <div class="doctor-photo">
                    👨‍⚕️
                </div>

                <h3>
                    ${doctor.name}
                </h3>

                <p>
                    ${doctor.specialty || "Specialist"}
                </p>

                <div class="rating">
                    ⭐ 4.8
                </div>

                <span>
                    ${doctor.experience || 0}
                    Years Experience
                </span>

                <a
                    href="doctor-profile.html?doctor=${doctor._id}"
                    class="view-profile-btn"
                >
                    View Profile
                </a>

            `;

            homeDoctorGrid.appendChild(card);

        });

    } catch (error) {

        console.error(
            "Home doctor loading error:",
            error
        );

        homeDoctorGrid.innerHTML = `
            <p style="color:red;">
                Unable to load doctors.
            </p>
        `;
    }
}

loadHomeDoctors();