const homeHospitalGrid =
    document.getElementById("homeHospitalGrid");

async function loadHomeHospitals() {

    try {

        const response =
            await fetch(
                "http://localhost:5000/api/hospitals"
            );

        if (!response.ok) {
            throw new Error("Failed to load hospitals");
        }

        const hospitals =
            await response.json();

        homeHospitalGrid.innerHTML = "";

        if (hospitals.length === 0) {

            homeHospitalGrid.innerHTML =
                "<p>No hospitals found.</p>";

            return;
        }

        hospitals.slice(0, 3).forEach((hospital) => {

            const card =
                document.createElement("div");

            card.className = "hospital-card";

            card.innerHTML = `

                <div class="hospital-img">
                    🏥
                </div>

                <div class="hospital-content">

                    <h3>
                        ${hospital.name}
                    </h3>

                    <p>
                        📍 ${hospital.city || "Kolkata"}
                    </p>

                    <div class="rating">
                        ⭐ 4.8
                        <span>Trusted Hospital</span>
                    </div>

                    <a
                        href="hospital-details.html?hospital=${hospital._id}"
                        class="view-hospital-btn"
                    >
                        View Hospital
                    </a>

                </div>

            `;

            homeHospitalGrid.appendChild(card);

        });

    } catch (error) {

        console.error(
            "Home hospital loading error:",
            error
        );

        homeHospitalGrid.innerHTML = `
            <p style="color:red;">
                Unable to load hospitals.
            </p>
        `;
    }
}

loadHomeHospitals();