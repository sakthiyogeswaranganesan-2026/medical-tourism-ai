// ======================================================
// MEDICALAI - FINAL FRONTEND LOGIC
// ======================================================

// ======================================================
// BACKEND URL
// ======================================================

const API_BASE_URL = "http://127.0.0.1:8000";


// ======================================================
// PAGE ELEMENTS
// ======================================================

const landingPage = document.getElementById("landingPage");
const loginPage = document.getElementById("loginPage");
const registerPage = document.getElementById("registerPage");
const appPage = document.getElementById("appPage");

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");


// ======================================================
// PAGE NAVIGATION
// ======================================================

function hideAllPages() {

    if (landingPage)
        landingPage.classList.add("hidden");

    if (loginPage)
        loginPage.classList.add("hidden");

    if (registerPage)
        registerPage.classList.add("hidden");

    if (appPage)
        appPage.classList.add("hidden");
}


// ======================================================
// SHOW LANDING PAGE
// ======================================================

function showLanding() {

    hideAllPages();

    if (landingPage)
        landingPage.classList.remove("hidden");
}

window.showLanding = showLanding;


// ======================================================
// SHOW LOGIN
// ======================================================

function showLogin() {

    hideAllPages();

    if (loginPage)
        loginPage.classList.remove("hidden");
}

window.showLogin = showLogin;


// ======================================================
// SHOW REGISTER
// ======================================================

function showRegister() {

    hideAllPages();

    if (registerPage)
        registerPage.classList.remove("hidden");
}

window.showRegister = showRegister;


// ======================================================
// PASSWORD VISIBILITY
// ======================================================

function togglePassword(id) {

    const passwordInput =
        document.getElementById(id);

    if (!passwordInput)
        return;

    if (passwordInput.type === "password") {

        passwordInput.type = "text";

    } else {

        passwordInput.type = "password";
    }
}

window.togglePassword = togglePassword;


// ======================================================
// REGISTER
// ======================================================

if (registerForm) {

    registerForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document
                    .getElementById("fullName")
                    .value
                    .trim();


            const email =
                document
                    .getElementById("registerEmail")
                    .value
                    .trim()
                    .toLowerCase();


            const mobile =
                document
                    .getElementById("mobile")
                    .value
                    .trim();


            const password =
                document
                    .getElementById("registerPassword")
                    .value;


            const confirmPassword =
                document
                    .getElementById("confirmPassword")
                    .value;


            // --------------------------------------------------
            // VALIDATION
            // --------------------------------------------------

            if (
                name === "" ||
                !email.includes("@") ||
                !/^[0-9]{10}$/.test(mobile) ||
                password.length < 6 ||
                password !== confirmPassword
            ) {

                alert(
                    "Please enter valid registration details."
                );

                return;
            }


            // --------------------------------------------------
            // CHECK EXISTING ACCOUNT
            // --------------------------------------------------

            if (
                localStorage.getItem(
                    "medicalAI_" + email
                ) !== null
            ) {

                alert(
                    "An account with this Email ID already exists."
                );

                showLogin();

                return;
            }


            // --------------------------------------------------
            // CREATE ACCOUNT
            // --------------------------------------------------

            const account = {

                name: name,

                email: email,

                mobile: mobile,

                password: password
            };


            localStorage.setItem(

                "medicalAI_" + email,

                JSON.stringify(account)
            );


            localStorage.setItem(

                "medicalAI_currentUser",

                email
            );


            alert(
                "Account created successfully!"
            );


            registerForm.reset();


            openMedicalAI();
        }
    );
}


// ======================================================
// LOGIN
// ======================================================

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const email =
                document
                    .getElementById("loginEmail")
                    .value
                    .trim()
                    .toLowerCase();


            const password =
                document
                    .getElementById("loginPassword")
                    .value;


            const savedAccount =
                localStorage.getItem(
                    "medicalAI_" + email
                );


            // --------------------------------------------------
            // ACCOUNT NOT FOUND
            // --------------------------------------------------

            if (savedAccount === null) {

                alert(
                    "Account not found. Please create an account first."
                );

                return;
            }


            const account =
                JSON.parse(savedAccount);


            // --------------------------------------------------
            // PASSWORD CHECK
            // --------------------------------------------------

            if (account.password !== password) {

                alert(
                    "Incorrect Email ID or Password."
                );

                return;
            }


            localStorage.setItem(

                "medicalAI_currentUser",

                email
            );


            alert(
                "Login successful!"
            );


            openMedicalAI();
        }
    );
}


// ======================================================
// OPEN MEDICAL AI
// ======================================================

function openMedicalAI() {

    hideAllPages();


    if (appPage)
        appPage.classList.remove("hidden");


    const email =
        localStorage.getItem(
            "medicalAI_currentUser"
        );


    if (email) {

        const savedAccount =
            localStorage.getItem(
                "medicalAI_" + email
            );


        if (savedAccount) {

            const account =
                JSON.parse(savedAccount);


            const welcomeUser =
                document.getElementById(
                    "welcomeUser"
                );


            if (welcomeUser) {

                welcomeUser.textContent =
                    "Welcome, " + account.name;
            }
        }
    }


    loadDistricts();
}

window.openMedicalAI = openMedicalAI;


// ======================================================
// LOGOUT
// ======================================================

function logout() {

    localStorage.removeItem(
        "medicalAI_currentUser"
    );


    if (loginForm)
        loginForm.reset();


    showLanding();
}

window.logout = logout;


// ======================================================
// FORGOT PASSWORD
// ======================================================

function forgotPassword() {

    const email =
        document
            .getElementById("loginEmail")
            .value
            .trim()
            .toLowerCase();


    if (email === "") {

        alert(
            "Please enter your Email ID first."
        );

        return;
    }


    if (
        localStorage.getItem(
            "medicalAI_" + email
        ) === null
    ) {

        alert(
            "No account found with this Email ID."
        );

        return;
    }


    alert(
        "Prototype password reset request received."
    );
}

window.forgotPassword = forgotPassword;


// ======================================================
// TAMIL NADU DISTRICTS
// ======================================================

const districts = [

    "Ariyalur",
    "Chengalpattu",
    "Chennai",
    "Coimbatore",
    "Cuddalore",
    "Dharmapuri",
    "Dindigul",
    "Erode",
    "Kallakurichi",
    "Kancheepuram",
    "Karur",
    "Krishnagiri",
    "Madurai",
    "Mayiladuthurai",
    "Nagapattinam",
    "Namakkal",
    "Nilgiris",
    "Perambalur",
    "Pudukkottai",
    "Ramanathapuram",
    "Ranipet",
    "Salem",
    "Sivaganga",
    "Tenkasi",
    "Thanjavur",
    "Theni",
    "Thoothukudi",
    "Tiruchirappalli",
    "Tirunelveli",
    "Tirupathur",
    "Tiruppur",
    "Tiruvallur",
    "Tiruvannamalai",
    "Tiruvarur",
    "Vellore",
    "Viluppuram",
    "Virudhunagar"
];


// ======================================================
// OPTIONAL CITY DATA
// ======================================================
// City is no longer used for backend searching because
// the final dataset does not contain City.
// This data is kept only so the existing frontend does
// not break if the City dropdown is still present.
// ======================================================

const cities = {

    Ariyalur: [
        "Ariyalur",
        "Jayankondam"
    ],

    Chengalpattu: [
        "Chengalpattu",
        "Tambaram",
        "Mahabalipuram"
    ],

    Chennai: [
        "Chennai"
    ],

    Coimbatore: [
        "Coimbatore",
        "Pollachi",
        "Mettupalayam"
    ],

    Cuddalore: [
        "Cuddalore",
        "Chidambaram",
        "Panruti"
    ],

    Dharmapuri: [
        "Dharmapuri",
        "Harur",
        "Palacode"
    ],

    Dindigul: [
        "Dindigul",
        "Palani",
        "Kodaikanal"
    ],

    Erode: [
        "Erode",
        "Bhavani",
        "Gobichettipalayam",
        "Sathyamangalam"
    ],

    Kallakurichi: [
        "Kallakurichi",
        "Ulundurpet"
    ],

    Kancheepuram: [
        "Kancheepuram",
        "Sriperumbudur"
    ],

    Karur: [
        "Karur",
        "Kulithalai"
    ],

    Krishnagiri: [
        "Krishnagiri",
        "Hosur"
    ],

    Madurai: [
        "Madurai",
        "Melur",
        "Thirumangalam"
    ],

    Mayiladuthurai: [
        "Mayiladuthurai",
        "Sirkazhi"
    ],

    Nagapattinam: [
        "Nagapattinam",
        "Velankanni"
    ],

    Namakkal: [
        "Namakkal",
        "Rasipuram",
        "Tiruchengode"
    ],

    Nilgiris: [
        "Udhagamandalam",
        "Coonoor",
        "Gudalur"
    ],

    Perambalur: [
        "Perambalur"
    ],

    Pudukkottai: [
        "Pudukkottai",
        "Aranthangi"
    ],

    Ramanathapuram: [
        "Ramanathapuram",
        "Paramakudi"
    ],

    Ranipet: [
        "Ranipet",
        "Arcot"
    ],

    Salem: [
        "Salem",
        "Attur",
        "Mettur",
        "Edappadi"
    ],

    Sivaganga: [
        "Sivaganga",
        "Karaikudi"
    ],

    Tenkasi: [
        "Tenkasi",
        "Sankarankovil"
    ],

    Thanjavur: [
        "Thanjavur",
        "Kumbakonam",
        "Pattukkottai"
    ],

    Theni: [
        "Theni",
        "Periyakulam",
        "Bodinayakanur"
    ],

    Thoothukudi: [
        "Thoothukudi",
        "Kovilpatti",
        "Tiruchendur"
    ],

    Tiruchirappalli: [
        "Tiruchirappalli",
        "Manapparai",
        "Thuraiyur"
    ],

    Tirunelveli: [
        "Tirunelveli",
        "Ambasamudram"
    ],

    Tirupathur: [
        "Tirupathur",
        "Vaniyambadi"
    ],

    Tiruppur: [
        "Tiruppur",
        "Palladam",
        "Dharapuram",
        "Udumalpet"
    ],

    Tiruvallur: [
        "Tiruvallur",
        "Avadi",
        "Ponneri"
    ],

    Tiruvannamalai: [
        "Tiruvannamalai",
        "Arani"
    ],

    Tiruvarur: [
        "Tiruvarur",
        "Mannargudi"
    ],

    Vellore: [
        "Vellore",
        "Katpadi",
        "Gudiyatham"
    ],

    Viluppuram: [
        "Viluppuram",
        "Tindivanam"
    ],

    Virudhunagar: [
        "Virudhunagar",
        "Sivakasi",
        "Rajapalayam"
    ]
};


// ======================================================
// LOAD DISTRICTS
// ======================================================

function loadDistricts() {

    const district =
        document.getElementById("district");


    if (!district)
        return;


    district.innerHTML =
        '<option value="">Select District</option>';


    districts.forEach(
        function (name) {

            const option =
                document.createElement("option");


            option.value = name;

            option.textContent = name;


            district.appendChild(option);
        }
    );
}


// ======================================================
// DISTRICT → CITY
// ======================================================
// This only controls the old City dropdown.
// It is NOT sent to the backend.
// ======================================================

const districtSelect =
    document.getElementById("district");


if (districtSelect) {

    districtSelect.addEventListener(
        "change",
        function () {

            const selectedDistrict =
                this.value;


            const citySelect =
                document.getElementById("city");


            if (!citySelect)
                return;


            citySelect.innerHTML =
                '<option value="">Select City / Town</option>';


            if (!cities[selectedDistrict])
                return;


            cities[selectedDistrict].forEach(
                function (cityName) {

                    const option =
                        document.createElement("option");


                    option.value = cityName;

                    option.textContent = cityName;


                    citySelect.appendChild(option);
                }
            );
        }
    );
}


// ======================================================
// CURRENT LOCATION
// ======================================================

function getCurrentLocation() {

    const status =
        document.getElementById(
            "locationStatus"
        );


    if (!status)
        return;


    if (!navigator.geolocation) {

        status.textContent =
            "Your browser does not support location.";

        return;
    }


    status.textContent =
        "Detecting your current location...";


    navigator.geolocation.getCurrentPosition(

        function (position) {

            const latitude =
                position.coords.latitude;


            const longitude =
                position.coords.longitude;


            sessionStorage.setItem(
                "medicalAI_latitude",
                latitude
            );


            sessionStorage.setItem(
                "medicalAI_longitude",
                longitude
            );


            status.textContent =
                "✓ Current location detected successfully.";
        },


        function () {

            status.textContent =
                "Location permission was not granted. Please select your district.";
        }
    );
}

window.getCurrentLocation = getCurrentLocation;


// ======================================================
// FIND MEDICAL ASSISTANCE
// ======================================================

async function findMedicalHelp() {

    const clinicalProblem =
        document.getElementById(
            "clinicalProblem"
        ).value;


    const district =
        document.getElementById(
            "district"
        ).value;


    const resultBox =
        document.getElementById(
            "searchResult"
        );


    // --------------------------------------------------
    // CHECK MEDICAL PROBLEM
    // --------------------------------------------------

    if (!clinicalProblem) {

        alert(
            "Please select your medical problem."
        );

        return;
    }


    // --------------------------------------------------
    // CHECK DISTRICT
    // --------------------------------------------------

    if (!district) {

        alert(
            "Please select your district."
        );

        return;
    }


    // --------------------------------------------------
    // SHOW SEARCHING
    // --------------------------------------------------

    resultBox.classList.remove(
        "hidden"
    );


    resultBox.innerHTML = `

        <h3>
            Searching for medical assistance...
        </h3>

        <p>
            Please wait while MedicalAI searches
            the available records.
        </p>

    `;


    try {

        // --------------------------------------------------
        // BACKEND REQUEST
        // --------------------------------------------------

        const url =
            API_BASE_URL +
            "/hospitals/search?district=" +
            encodeURIComponent(
                district
            );


        console.log(
            "Sending request to:",
            url
        );


        const response =
            await fetch(url);


        // --------------------------------------------------
        // CHECK RESPONSE
        // --------------------------------------------------

        if (!response.ok) {

            throw new Error(
                "Backend returned status " +
                response.status
            );
        }


        // --------------------------------------------------
        // JSON DATA
        // --------------------------------------------------

        const hospitals =
            await response.json();


        console.log(
            "Hospitals from backend:",
            hospitals
        );


        // --------------------------------------------------
        // DISPLAY
        // --------------------------------------------------

        displayHospitalResults(
            hospitals,
            clinicalProblem,
            district
        );

    }

    catch (error) {

        console.error(
            "Backend connection error:",
            error
        );


        resultBox.innerHTML = `

            <h3>
                Unable to connect to MedicalAI server
            </h3>

            <p>
                Please make sure the FastAPI backend
                is running on port 8000.
            </p>

            <p>
                Error:
                ${error.message}
            </p>

        `;
    }
}

window.findMedicalHelp =
    findMedicalHelp;


// ======================================================
// DISPLAY HOSPITAL RESULTS
// ======================================================

function displayHospitalResults(
    hospitals,
    clinicalProblem,
    district
) {

    const resultBox =
        document.getElementById(
            "searchResult"
        );


    // --------------------------------------------------
    // NO RESULTS
    // --------------------------------------------------

    if (
        !Array.isArray(hospitals) ||
        hospitals.length === 0
    ) {

        resultBox.innerHTML = `

            <h3>
                No results found
            </h3>

            <p>
                No medical assistance records were
                found for ${district}.
            </p>

            <p class="small-text">
                Please try another district.
            </p>

        `;

        return;
    }


    // --------------------------------------------------
    // HEADER
    // --------------------------------------------------

    let html = `

        <h3>
            Medical Assistance Results
        </h3>


        <p>
            <strong>
                Medical Problem:
            </strong>

            ${clinicalProblem}
        </p>


        <p>
            <strong>
                District:
            </strong>

            ${district}
        </p>


        <p class="small-text">

            Demo data — for prototype
            demonstration only.

        </p>

        <hr>

    `;


    // --------------------------------------------------
    // EACH RESULT
    // --------------------------------------------------

    hospitals.forEach(
        function (hospital) {

            html += `

                <div class="hospital-result">

                    <h4>
                        ${
                            hospital["Hospital #"] ||
                            "Hospital Record"
                        }
                    </h4>


                    <p>
                        📍

                        <strong>
                            District:
                        </strong>

                        ${
                            hospital.District ||
                            "N/A"
                        }
                    </p>


                    <p>
                        🌐

                        <strong>
                            State:
                        </strong>

                        ${
                            hospital.State ||
                            "N/A"
                        }
                    </p>


                    <p>
                        ⭐

                        <strong>
                            Rating:
                        </strong>

                        ${
                            hospital.Rating ||
                            "N/A"
                        }
                    </p>


                    <p>
                        👥

                        <strong>
                            Reviews:
                        </strong>

                        ${
                            hospital["Number of Reviews"] ||
                            "N/A"
                        }
                    </p>


                    <p>
                        🏨

                        <strong>
                            Nearby Hotel:
                        </strong>

                        ${
                            hospital.Hotel ||
                            "N/A"
                        }
                    </p>


                    <p>
                        📏

                        <strong>
                            Distance:
                        </strong>

                        ${
                            hospital.Distance ||
                            "N/A"
                        }
                    </p>


                    <p>
                        📌

                        <strong>
                            Coordinates:
                        </strong>

                        ${
                            hospital.Latitude ||
                            "N/A"
                        },

                        ${
                            hospital.Longitude ||
                            "N/A"
                        }
                    </p>

                </div>

                <hr>

            `;
        }
    );


    // --------------------------------------------------
    // PUT RESULTS INTO PAGE
    // --------------------------------------------------

    resultBox.innerHTML =
        html;
}


// ======================================================
// INITIAL PAGE
// ======================================================

showLanding();


// ======================================================
// OPTIONAL BACKEND CONNECTION TEST
// ======================================================

async function testBackendConnection() {

    try {

        const response =
            await fetch(
                API_BASE_URL + "/health"
            );


        if (!response.ok) {

            throw new Error(
                "Backend unavailable"
            );
        }


        const data =
            await response.json();


        console.log(
            "MedicalAI Backend:",
            data
        );


    }

    catch (error) {

        console.warn(
            "Backend connection test failed:",
            error
        );
    }
}


// Run backend test
testBackendConnection();