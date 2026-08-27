const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

const API_URL = "http://localhost:5000/api/users";

loginForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const email =
        document.getElementById("email")
            .value
            .trim()
            .toLowerCase();

    const password =
        document.getElementById("password")
            .value;

    const remember =
        document.getElementById("remember")
            .checked;

    const button =
        loginForm.querySelector(".auth-btn");


    // ========================================
    // VALIDATION
    // ========================================

    if (!email || !password) {

        loginMessage.textContent =
            "Please enter email and password.";

        loginMessage.className =
            "form-message error";

        return;
    }


    // ========================================
    // LOGIN
    // ========================================

    button.disabled = true;

    button.textContent =
        "Logging in...";


    try {

        const response = await fetch(
            `${API_URL}/login`,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }
        );


        const data =
            await response.json();


        console.log(
            "LOGIN RESPONSE:",
            data
        );


        if (!response.ok) {

            throw new Error(
                data.message ||
                "Invalid email or password."
            );
        }


        // ========================================
        // SAVE USER LOGIN
        // ========================================

        const loginData = {

            id:
                data.user.id,

            name:
                data.user.name,

            email:
                data.user.email,

            phone:
                data.user.phone || "",

            loggedIn:
                true

        };


        // Clear previous login

        localStorage.removeItem(
            "healoraLogin"
        );

        sessionStorage.removeItem(
            "healoraLogin"
        );


        // Save new login

        if (remember) {

            localStorage.setItem(
                "healoraLogin",
                JSON.stringify(loginData)
            );

        } else {

            sessionStorage.setItem(
                "healoraLogin",
                JSON.stringify(loginData)
            );

        }


        // ========================================
        // SUCCESS
        // ========================================

        loginMessage.textContent =
            "✅ Login successful!";

        loginMessage.className =
            "form-message success";


        button.textContent =
            "Login Successful";


        // ========================================
        // REDIRECT
        // ========================================

        setTimeout(function () {

            window.location.href =
                "index.html";

        }, 1000);


    } catch (error) {

        console.error(
            "LOGIN ERROR:",
            error
        );


        loginMessage.textContent =
            error.message ||
            "Login failed.";

        loginMessage.className =
            "form-message error";


        button.disabled =
            false;

        button.textContent =
            "Login to Healora";

    }

});