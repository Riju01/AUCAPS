const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const message = document.getElementById("message");

let timer;
let hideTimer;

confirmPassword.addEventListener("keyup", function () {

    clearTimeout(timer);
    clearTimeout(hideTimer);

    timer = setTimeout(function() {

        if (password.value === confirmPassword.value && password.value !== "") {

            message.textContent = "Passwords match ✔";
            message.style.color = "green";

            // Hide after 2 seconds
            hideTimer = setTimeout(function() {
                message.textContent = "";
            }, 300);

        } else {
            message.textContent = "Passwords do not match ✖";
            message.style.color = "red";
        }

    }, 20); // wait before checking

});