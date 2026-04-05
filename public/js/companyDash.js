const id = window.location.pathname.split("/")[2];
document.querySelectorAll(".dash-right-nav button")
    .forEach(button => {
        button.addEventListener("click", async (event) => {

            // STOP anchor navigation
            event.preventDefault();
            event.stopPropagation();

            // remove active from all
            document.querySelectorAll(".dash-right-nav button")
                .forEach(btn => btn.classList.remove("active"));

            // add active
            button.classList.add("active");

            const type = button.dataset.type;

            try {
                const res = await fetch(`/company/${id}/data/${type}`);
                const data = await res.text();

                document.getElementById("content-area").innerHTML = data;

            } catch (err) {
                console.log(err);
            }
        });
    });