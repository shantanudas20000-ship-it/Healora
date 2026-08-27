// ========================================
// HEALORA HOSPITAL DETAILS
// ========================================


// Get Hospital ID from URL

const params =
    new URLSearchParams(window.location.search);

const hospitalId =
    params.get("hospital");


const API_URL =
    "http://localhost:5000/api";


// ========================================
// ELEMENTS
// ========================================

const hospitalName =
    document.getElementById("hospitalName");

const hospitalLocation =
    document.getElementById("hospitalLocation");

const hospitalAddress =
    document.getElementById("hospitalAddress");

const hospitalPhone =
    document.getElementById("hospitalPhone");

const hospitalEmail =
    document.getElementById("hospitalEmail");

const hospitalTags =
    document.getElementById("hospitalTags");

const departmentGrid =
    document.getElementById("departmentGrid");

const doctorList =
    document.getElementById("doctorList");

const facilityGrid =
    document.getElementById("facilityGrid");

const aboutHospital =
    document.getElementById("aboutHospital");

const callHospital =
    document.getElementById("callHospital");

const hospitalMap =
    document.getElementById("hospitalMap");

const directionBtn =
    document.getElementById("directionBtn");


// ========================================
// LOAD HOSPITAL
// ========================================

async function loadHospital() {

    try {

        if (!hospitalId) {

            throw new Error(
                "Hospital ID not found in URL"
            );

        }


        const response =
            await fetch(
                `${API_URL}/hospitals/${hospitalId}`
            );


        if (!response.ok) {

            throw new Error(
                "Hospital not found"
            );

        }


        const hospital =
            await response.json();


        console.log(
            "Hospital:",
            hospital
        );


        // ========================================
        // BASIC INFORMATION
        // ========================================

        hospitalName.textContent =
            hospital.name;


        hospitalLocation.textContent =
            `📍 ${hospital.city || "Location unavailable"}`;


        hospitalAddress.textContent =
            `📍 ${hospital.address || ""}, ${hospital.city || ""}`;


        hospitalPhone.textContent =
            `📞 ${hospital.phone || "Phone unavailable"}`;


        hospitalEmail.textContent =
            `✉️ ${hospital.email || "Email unavailable"}`;


        // ========================================
        // ABOUT
        // ========================================

        aboutHospital.textContent =
            `${hospital.name} is a trusted healthcare centre in ${
                hospital.city || "the region"
            }, providing quality medical care through experienced doctors and modern healthcare facilities.`;


        // ========================================
        // PHONE BUTTON
        // ========================================

        if (hospital.phone) {

            callHospital.href =
                `tel:${hospital.phone}`;

        } else {

            callHospital.href =
                "#";

        }


        // ========================================
        // SPECIALITIES
        // ========================================

        const specialties =
            hospital.specialties || [];


        hospitalTags.innerHTML = "";

        departmentGrid.innerHTML = "";


        if (specialties.length === 0) {

            hospitalTags.innerHTML = `
                <span>General Healthcare</span>
            `;

            departmentGrid.innerHTML = `
                <p>
                    General healthcare services available.
                </p>
            `;

        } else {

            specialties.forEach(
                (specialty) => {

                    // Header tags

                    const tag =
                        document.createElement("span");

                    tag.textContent =
                        specialty;

                    hospitalTags.appendChild(tag);


                    // Department card

                    const department =
                        document.createElement("div");

                    department.className =
                        "department";


                    let icon = "🩺";


                    const lower =
                        specialty.toLowerCase();


                    if (
                        lower.includes("cardio") ||
                        lower.includes("heart")
                    ) {

                        icon = "❤️";

                    } else if (
                        lower.includes("neuro")
                    ) {

                        icon = "🧠";

                    } else if (
                        lower.includes("ortho") ||
                        lower.includes("bone")
                    ) {

                        icon = "🦴";

                    } else if (
                        lower.includes("pediatric") ||
                        lower.includes("child")
                    ) {

                        icon = "👶";

                    } else if (
                        lower.includes("derma") ||
                        lower.includes("skin")
                    ) {

                        icon = "🧴";

                    } else if (
                        lower.includes("eye") ||
                        lower.includes("ophthal")
                    ) {

                        icon = "👁️";

                    }


                    department.innerHTML = `

                        <div style="font-size:30px;">
                            ${icon}
                        </div>

                        <h3>
                            ${specialty}
                        </h3>

                        <p>
                            Specialist Care
                        </p>

                    `;


                    departmentGrid.appendChild(
                        department
                    );

                }
            );

        }


        // ========================================
        // FACILITIES
        // ========================================

        facilityGrid.innerHTML = "";


        if (hospital.emergency === true) {

            facilityGrid.innerHTML += `

                <div>
                    🚑
                    <span>
                        24×7 Emergency
                    </span>
                </div>

            `;

        }


        facilityGrid.innerHTML += `

            <div>
                🏥
                <span>
                    Healthcare Services
                </span>
            </div>

            <div>
                🩺
                <span>
                    Specialist Doctors
                </span>
            </div>

            <div>
                🔬
                <span>
                    Diagnostic Services
                </span>
            </div>

            <div>
                💊
                <span>
                    Pharmacy
                </span>
            </div>

        `;


        // ========================================
        // GOOGLE MAP
        // ========================================

        const mapQuery =
            encodeURIComponent(
                `${hospital.name}, ${hospital.address}, ${hospital.city}`
            );


        hospitalMap.src =
            `https://www.google.com/maps?q=${mapQuery}&output=embed`;


        directionBtn.href =
            `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;


        // ========================================
        // LOAD DOCTORS
        // ========================================

        loadHospitalDoctors(
            hospital.name
        );


    } catch (error) {

        console.error(
            "Hospital loading error:",
            error
        );


        hospitalName.textContent =
            "Hospital Not Found";


        aboutHospital.textContent =
            "Unable to load hospital information.";


        doctorList.innerHTML = `

            <p style="color:red;">
                Unable to load hospital details.
            </p>

        `;

    }

}


// ========================================
// LOAD DOCTORS
// ========================================

async function loadHospitalDoctors(
    hospitalName
) {

    try {

        doctorList.innerHTML = `
            <p>
                Loading doctors...
            </p>
        `;


        const response =
            await fetch(
                `${API_URL}/doctors`
            );


        if (!response.ok) {

            throw new Error(
                "Failed to load doctors"
            );

        }


        const doctors =
            await response.json();


        console.log(
            "All Doctors:",
            doctors
        );


        // ========================================
        // FILTER DOCTORS BY HOSPITAL
        // ========================================

        const hospitalDoctors =
            doctors.filter(
                (doctor) => {

                    if (!doctor.hospital) {
                        return false;
                    }


                    return (
                        doctor.hospital
                            .trim()
                            .toLowerCase()
                        ===
                        hospitalName
                            .trim()
                            .toLowerCase()
                    );

                }
            );


        console.log(
            "Hospital Doctors:",
            hospitalDoctors
        );


        doctorList.innerHTML = "";


        // ========================================
        // NO DOCTORS
        // ========================================

        if (
            hospitalDoctors.length === 0
        ) {

            doctorList.innerHTML = `

                <div style="
                    text-align:center;
                    padding:30px;
                    width:100%;
                ">

                    <div style="
                        font-size:45px;
                        margin-bottom:10px;
                    ">
                        👨‍⚕️
                    </div>

                    <h3>
                        No doctors found
                    </h3>

                    <p>
                        Doctors for this hospital
                        have not been added yet.
                    </p>

                    <a
                        href="doctors.html"
                        style="
                            display:inline-block;
                            margin-top:15px;
                            padding:10px 18px;
                            background:#078fb9;
                            color:white;
                            text-decoration:none;
                            border-radius:8px;
                        "
                    >
                        View All Doctors
                    </a>

                </div>

            `;

            return;

        }


        // ========================================
        // DISPLAY DOCTORS
        // ========================================

        hospitalDoctors.forEach(
            (doctor) => {

                const card =
                    document.createElement(
                        "div"
                    );


                card.className =
                    "doctor-card";


                card.innerHTML = `

                    <div class="doctor-photo">
                        👨‍⚕️
                    </div>


                    <div class="doctor-info">

                        <span class="doctor-verified">
                            ✓ Verified
                        </span>


                        <h3>
                            ${doctor.name}
                        </h3>


                        <p>
                            ${doctor.specialty}
                        </p>


                        <div class="doctor-rating">
                            ⭐ 4.8
                            <span>
                                Trusted Doctor
                            </span>
                        </div>


                        <p class="experience">
                            ${doctor.experience || 0}
                            Years Experience
                        </p>


                        <p>
                            ${
                                doctor.qualification
                                || "Qualified Medical Specialist"
                            }
                        </p>

                    </div>


                    <a
                        href="doctor-profile.html?doctor=${doctor._id}"
                        class="doctor-btn"
                    >
                        View Profile
                    </a>

                `;


                doctorList.appendChild(
                    card
                );

            }
        );


    } catch (error) {

        console.error(
            "Doctor loading error:",
            error
        );


        doctorList.innerHTML = `

            <p style="
                color:red;
                text-align:center;
                width:100%;
            ">
                Unable to load doctors.
            </p>

        `;

    }

}


// ========================================
// START
// ========================================

loadHospital();