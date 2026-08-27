// ========================================
// HEALORA REGISTER / SIGN UP SYSTEM
// ========================================

const registerForm =
    document.getElementById("registerForm");

const registerMessage =
    document.getElementById("registerMessage");

const nameInput =
    document.getElementById("name");

const emailInput =
    document.getElementById("email");

const phoneInput =
    document.getElementById("phone");

const passwordInput =
    document.getElementById("password");

const confirmPasswordInput =
    document.getElementById("confirmPassword");

const registerButton =
    registerForm.querySelector(".auth-btn");


// ========================================
// SHOW MESSAGE
// ========================================

function showMessage(message, type) {

    registerMessage.textContent =
        message;

    registerMessage.className =
        `form-message ${type}`;

}


// ========================================
// REGISTER
// ========================================

registerForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        // ========================================
        // GET VALUES
        // ========================================

        const name =
            nameInput.value.trim();

        const email =
            emailInput.value
                .trim()
                .toLowerCase();

        const phone =
            phoneInput.value.trim();

        const password =
            passwordInput.value;

        const confirmPassword =
            confirmPasswordInput.value;


        // ========================================
        // VALIDATION
        // ========================================

        if (
            !name ||
            !email ||
            !phone ||
            !password ||
            !confirmPassword
        ) {

            showMessage(
                "Please fill in all fields.",
                "error"
            );

            return;

        }


        // ========================================
        // PASSWORD LENGTH
        // ========================================

        if (password.length < 6) {

            showMessage(
                "Password must be at least 6 characters.",
                "error"
            );

            return;

        }


        // ========================================
        // CONFIRM PASSWORD
        // ========================================

        if (
            password !==
            confirmPassword
        ) {

            showMessage(
                "Passwords do not match.",
                "error"
            );

            return;

        }


        // ========================================
        // DISABLE BUTTON
        // ========================================

        registerButton.disabled =
            true;

        registerButton.textContent =
            "Creating Account...";


        try {

            // ========================================
            // SEND REQUEST
            // ========================================

            const response =
                await fetch(
                    "http://localhost:5000/api/users",
                    {

                        method: "POST",

                        headers: {

                            "Content-Type":
                                "application/json"

                        },

                        body: JSON.stringify({

                            name:
                                name,

                            email:
                                email,

                            password:
                                password,

                            phone:
                                phone

                        })

                    }
                );


            // ========================================
            // READ RESPONSE
            // ========================================

            const data =
                await response.json();


            // ========================================
            // ERROR
            // ========================================

            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Registration failed."
                );

            }


            // ========================================
            // SUCCESS
            // ========================================

            showMessage(
                "✅ Account created successfully! Redirecting to login...",
                "success"
            );


            registerButton.textContent =
                "Account Created";


            // ========================================
            // CLEAR FORM
            // ========================================

            registerForm.reset();


            // ========================================
            // REDIRECT TO LOGIN
            // ========================================

            setTimeout(function () {

                window.location.href =
                    "login.html";

            }, 1200);


        } catch (error) {

            console.error(
                "Registration Error:",
                error
            );


            showMessage(
                error.message ||
                "Unable to create account. Please try again.",
                "error"
            );


            registerButton.disabled =
                false;

            registerButton.textContent =
                "Create My Account";

        }

    }
);