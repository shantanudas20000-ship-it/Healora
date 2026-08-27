// ========================================
// FORGOT PASSWORD
// ========================================

const forgotForm =
    document.getElementById("forgotForm");

const forgotMessage =
    document.getElementById("forgotMessage");


forgotForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const email =
            document.getElementById(
                "forgotEmail"
            )
            .value
            .trim()
            .toLowerCase();


        const savedUser =
            localStorage.getItem("healoraUser");


        if (!savedUser) {

            forgotMessage.textContent =
                "No account found. Please register first.";

            forgotMessage.className =
                "form-message error";

            return;

        }


        const user =
            JSON.parse(savedUser);


        if (email !== user.email) {

            forgotMessage.textContent =
                "No account found with this email.";

            forgotMessage.className =
                "form-message error";

            return;

        }


        // Demo password reset

        const newPassword =
            prompt(
                "Enter your new password (minimum 6 characters):"
            );


        if (!newPassword) {

            return;

        }


        if (newPassword.length < 6) {

            alert(
                "Password must be at least 6 characters."
            );

            return;

        }


        user.password =
            newPassword;


        localStorage.setItem(
            "healoraUser",
            JSON.stringify(user)
        );


        forgotMessage.textContent =
            "Password changed successfully! Redirecting to login...";

        forgotMessage.className =
            "form-message success";


        setTimeout(function() {

            window.location.href =
                "login.html";

        }, 1500);

    }
);