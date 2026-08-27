// ========================================
// HEALORA AUTHENTICATION
// ========================================

function getLoggedInUser() {

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


// ========================================
// CHECK LOGIN
// ========================================

function isLoggedIn() {

    return getLoggedInUser() !== null;

}


// ========================================
// LOGOUT
// ========================================

function logout() {

    localStorage.removeItem("healoraLogin");

    sessionStorage.removeItem("healoraLogin");

    window.location.href =
        "login.html";

}