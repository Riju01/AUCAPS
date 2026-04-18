const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const message = document.getElementById("message");
if (password && confirmPassword && message) {
    let timer;
    let hideTimer;
    confirmPassword.addEventListener("keyup", function () {
        clearTimeout(timer);
        clearTimeout(hideTimer);
        timer = setTimeout(function() {
            if (password.value === confirmPassword.value && password.value !== "") {

                message.textContent = "Passwords match ✔";
                message.style.color = "green";

                hideTimer = setTimeout(function() {
                    message.textContent = "";
                }, 300);
            } else {
                message.textContent = "Passwords do not match ✖";
                message.style.color = "red";
            }
        }, 20);
    });
}


function handleVerificationButtons() {
    document.querySelectorAll(".verificationBtn").forEach(btn => {
        const isVerified = btn.dataset.verified === "true";

        if (!isVerified) {
            btn.disabled = true;
            btn.innerText = "Verification Required";
            btn.style.backgroundColor = "#ccc";
            btn.style.cursor = "not-allowed";
        }
    });
}

handleVerificationButtons();


document.addEventListener("submit", (e) => {
    const btn = e.target.querySelector(".verificationBtn");

    if (!btn) return;

    const isVerified = btn.dataset.verified === "true";

    if (!isVerified) {
        e.preventDefault();
        alert("Your company must be verified to create jobs ❌");
    }
});