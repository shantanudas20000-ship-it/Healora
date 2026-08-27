let allHospitals = [];

async function loadHospitals() {
    const hospitalList = document.getElementById("hospitalList");

    try {
        const response = await fetch(
            "http://localhost:5000/api/hospitals"
        );

        if (!response.ok) {
            throw new Error("Failed to load hospitals");
        }

        allHospitals = await response.json();

        displayHospitals(allHospitals);

    } catch (error) {

        console.error("Hospital loading error:", error);

        hospitalList.innerHTML = `
            <p style="text-align:center;color:red;">
                Unable to load hospitals
            </p>
        `;

    }
}


function displayHospitals(hospitals) {

    const hospitalList =
        document.getElementById("hospitalList");

    const hospitalCount =
        document.getElementById("hospitalCount");

    hospitalList.innerHTML = "";

    hospitalCount.textContent =
        `${hospitals.length} hospitals found`;


    if (hospitals.length === 0) {

        hospitalList.innerHTML = `
            <p style="text-align:center;">
                No hospitals found.
            </p>
        `;

        return;
    }


    hospitals.forEach((hospital) => {

        const card =
            document.createElement("div");

        card.className =
            "hospital-card";


        const specialties =
            hospital.specialties || [];


        card.innerHTML = `

            <div class="hospital-image">
                🏥
            </div>


            <div class="hospital-details">

                <div class="verified-hospital">
                    ✓ Verified Hospital
                </div>


                <h3>
                    ${hospital.name}
                </h3>


                <p class="hospital-location">
                    📍 ${hospital.city || ""}
                    ${hospital.address || ""}
                </p>


                <div class="hospital-rating">
                    ⭐ 4.8
                    <span>
                        Trusted Hospital
                    </span>
                </div>


                <div class="hospital-specialities">

                    ${
                        specialties.length
                        ? specialties.map(
                            item =>
                            `<span>${item}</span>`
                          ).join("")
                        : "<span>General Care</span>"
                    }

                </div>


                <div class="facilities">

                    ${
                        hospital.emergency
                        ? "<span>🚑 Emergency</span>"
                        : ""
                    }

                    <span>
                        🏥 Healthcare
                    </span>

                </div>

            </div>


            <div class="hospital-actions">

                <a
                    href="hospital-details.html?hospital=${hospital._id}"
                    class="view-hospital-btn"
                >
                    View Doctors
                </a>


                <a
                    href="appointment.html?hospital=${hospital._id}"
                    class="book-hospital-btn"
                >
                    Book Now
                </a>

            </div>

        `;


        hospitalList.appendChild(card);

    });

}


function searchHospitals() {

    const location =
        document
        .getElementById("locationSearch")
        .value
        .toLowerCase();

    const search =
        document
        .getElementById("hospitalSearch")
        .value
        .toLowerCase();


    const filtered =
        allHospitals.filter((hospital) => {

            const name =
                (hospital.name || "")
                .toLowerCase();

            const city =
                (hospital.city || "")
                .toLowerCase();

            const specialties =
                (hospital.specialties || [])
                .join(" ")
                .toLowerCase();


            return (
                (!location ||
                    city.includes(location)) &&

                (!search ||
                    name.includes(search) ||
                    specialties.includes(search))
            );

        });


    displayHospitals(filtered);

}


function applyFilters() {

    const location =
        document
        .getElementById("locationFilter")
        .value
        .toLowerCase();


    const speciality =
        document
        .getElementById("specialityFilter")
        .value
        .toLowerCase();


    const emergency =
        document
        .getElementById("emergencyFilter")
        .checked;


    const filtered =
        allHospitals.filter((hospital) => {

            const city =
                (hospital.city || "")
                .toLowerCase();


            const specialties =
                (hospital.specialties || [])
                .map(item => item.toLowerCase());


            return (

                (!location ||
                    city === location) &&

                (!speciality ||
                    specialties.includes(speciality)) &&

                (!emergency ||
                    hospital.emergency === true)

            );

        });


    displayHospitals(filtered);

}


loadHospitals();