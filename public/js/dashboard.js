const pathParts = window.location.pathname.split("/");
const role = pathParts[1]; // "student" or "company"
const id = pathParts[2];

document.addEventListener("click", async (event) => {
    const button = event.target.closest("button");

    if (!button || !button.dataset.type) return;

    event.preventDefault();
    event.stopPropagation();

    const type = button.dataset.type;
    const jobId = button.dataset.jobid;

    // Active only for top nav
    const isTopNav = button.closest(".dash-right-nav") && !jobId;

    if (isTopNav) {
        document.querySelectorAll(".dash-right-nav > button")
            .forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");
    }

    try {
        let url = `/${role}/${id}/data/${type}`;

        if (jobId) {
            url += `?jobId=${jobId}`;
        }

        const res = await fetch(url);
        if (!res.ok) throw new Error("Fetch failed");

        const data = await res.text();
        document.getElementById("content-area").innerHTML = data;

    } catch (err) {
        console.error(err);
    }
});



document.addEventListener("submit", async (event) => {
    if (event.target.id !== "applyForm") return;

    event.preventDefault();

    const form = event.target;

    const data = {
        jobId: form.jobId.value,
        name: form.name.value,
        cgpa: form.cgpa.value,
        resume: form.resume.value,
        coverLetter: form.coverLetter.value
    };

    console.log("Sending:", data);

    const res = await fetch(`/student/${id}/apply`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const result = await res.text();
    document.getElementById("content-area").innerHTML = result;
});