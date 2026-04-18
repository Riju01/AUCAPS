const pathParts = window.location.pathname.split("/");
const role = pathParts[1]; // "student" | "company" | "admin"
const id = pathParts[2];   // logged-in user id


// 🔥 UPDATE VERIFICATION BUTTONS (UI CONTROL)
function updateVerificationButtons() {
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


// 🔥 HANDLE ALL BUTTON CLICKS (MAIN CONTROLLER)
document.addEventListener("click", async (event) => {
    const button = event.target.closest("button");
    if (!button) return;

    // ===============================
    // ✅ 1. VERIFY BUTTON (ADMIN)
    // ===============================
    if (button.id === "verifyStuCom") {
        const verifyId = button.dataset.studentid; // ✅ FIXED
        const type = button.dataset.type;

        try {
            const res = await fetch(`/admin/verify/${type}/${verifyId}`, {
                method: "POST"
            });

            const result = await res.text();
            alert(result);

            button.innerText = "Verified ✅";
            button.disabled = true;

        } catch (err) {
            console.error("Verify Error:", err);
        }

        return; // stop further processing
    }


    // ===============================
    // ✅ 2. APPLY / CREATE BLOCK (NOT VERIFIED)
    // ===============================
    if (button.classList.contains("verificationBtn")) {
        const isVerified = button.dataset.verified === "true";

        if (!isVerified) {
            event.preventDefault();
            alert("You must be verified ❌");
            return;
        }
    }


    // ===============================
    // ✅ 3. DASHBOARD NAVIGATION
    // ===============================
    if (!button.dataset.type) return;

    event.preventDefault();
    event.stopPropagation();

    const type = button.dataset.type;
    const studentId = button.dataset.studentid;     // for student/company clicks
    const jobId = button.dataset.jobid;      // for job clicks

    // Active state for top nav
    const isTopNav = button.closest(".dash-right-nav") && !jobId && !studentId;

    if (isTopNav) {
        document.querySelectorAll(".dash-right-nav > button")
            .forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");
    }

    try {

        let url = `/${role}/${id}/data/${type}`;

       let query = []; 
        if (jobId) query.push(`jobId=${jobId}`);
        if (studentId) query.push(`studentId=${studentId}`);
        if (query.length > 0) {
            url += "?" + query.join("&");
        }

        const res = await fetch(url);
        if (!res.ok) throw new Error("Fetch failed");

        const data = await res.text();

        const contentArea = document.getElementById("content-area");
        if (contentArea) {
            contentArea.innerHTML = data;

            // 🔥 IMPORTANT: re-run after dynamic load
            updateVerificationButtons();
        }

    } catch (err) {
        console.error("Navigation Error:", err);
    }
});


// 🔥 HANDLE FORM SUBMIT (APPLY FORM)
document.addEventListener("submit", async (event) => {
    if (event.target.id !== "applyForm") return;

    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    try {
        const res = await fetch(`/student/${id}/apply`, {method: "POST", body: formData});

        const result = await res.text();

        const contentArea = document.getElementById("content-area");
        if (contentArea) {
            contentArea.innerHTML = result;

            // 🔥 update buttons again
            updateVerificationButtons();
        }

    } catch (err) {
        console.error("Submit Error:", err);
    }
});

// 🔥 RUN ON INITIAL LOAD
updateVerificationButtons();



//Graph Adding
const canvas = document.getElementById("statsChart");

if (canvas) {
    const students = Number(canvas.dataset.students);
    const companies = Number(canvas.dataset.companies);
    const jobs = Number(canvas.dataset.jobs);

    new Chart(canvas, {
        type: 'bar',
        data: {
            labels: ['Students', 'Companies', 'Jobs'],
            datasets: [{
                label: 'Total Count',
                data: [students, companies, jobs],
                backgroundColor: [
                    '#4CAF50',  // green
                    '#3498db',  // blue
                    '#f39c12'   // orange
                ],
                borderRadius: 8,
                barThickness: 50
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
                legend: {
                    labels: {
                        color: '#2c3e50',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                }
            },

            scales: {
                x: {
                    ticks: {
                        color: '#34495e',
                        font: {
                            size: 13
                        }
                    },
                    grid: {
                        display: false
                    }
                },
                y: {
                    ticks: {
                        color: '#34495e'
                    },
                    grid: {
                        color: '#ecf0f1'
                    }
                }
            }
        }
    });
}