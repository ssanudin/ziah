// Update the countdown every second
const updateCountdown = (targetDate) => {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance < 0) {
    document.getElementById("countdown-timer").classList.add("d-none");
  } else {
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;
  }
};

// Copy to Clipboard
const copyToClipboard = (textToCopy, _this) => {
  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      _this.classList.add("btn-success");
      _this.classList.remove("btn-warning");
      setTimeout(function () {
        _this.classList.add("btn-warning");
        _this.classList.remove("btn-success");
      }, 1500);
    })
    .catch((error) => {
      showToast("error");
    });
};

// Go To Top
const scrollFunction = (goToTopEl) => {
  if (document.body.scrollTop > 70 || document.documentElement.scrollTop > 70) {
    goToTopEl.style.display = "block";
  } else {
    goToTopEl.style.display = "none";
  }
};

// Showing Toast
const showToast = (type) => {
  if (type === "error") {
    const toastMsg = document.getElementById("toastError");
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastMsg);
    toastBootstrap.show();
  } else if ("success-msg") {
    const toastMsg = document.getElementById("toastSendMsg");
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastMsg);
    toastBootstrap.show();
  }
};

const showMsg = (messages, filter = "") => {
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  if (filter) {
    messages = messages.filter((msg) => {
      return msg["Name"].toLowerCase().includes(filter);
    });
  }

  let msgs = "";
  messages.forEach((msg) => {
    const datetime = new Date(msg["Created time"]);
    msgs += `<div class="bg-body-tertiary border rounded-3 p-3 m-3">
          <figure class="text-center">
            <blockquote class="blockquote">
              <p>${msg["Message"]}</p>
            </blockquote>
            <figcaption class="blockquote-footer">
              ${msg["Name"]}
              (<cite title="Source Title">${datetime.getDate()} ${
      months[datetime.getMonth()]
    } ${datetime.getFullYear()} ${datetime.getHours()}:${datetime.getMinutes()}</cite>)
            </figcaption>
          </figure>
        </div>`;
  });

  if (msgs === "") {
    msgs = `<p class="text-center">Belum ada ucapan selamat${
      filter ? " dari " + filter : ""
    } 🥺</p>`;
  }

  document.querySelector("#messages .modal-body").innerHTML = msgs;
};

document.addEventListener("DOMContentLoaded", function () {
  const localServer = "http://localhost:1001/";
  const apiServer = "https://notion.sanud.in/";
  // Set the target date and time (change this to your desired date)
  const weddingTime = new Date("June 8, 2024 11:00:00").getTime();

  // Initial call to update countdown
  updateCountdown(weddingTime);
  // Update every second
  setInterval(() => {
    updateCountdown(weddingTime);
  }, 1000);

  // Get name receiver
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("to")) {
    const toName = urlParams.get("to");
    document.getElementById("to-name").textContent = toName;
    document.querySelector(".to-wrapper").classList.remove("d-none");
  }

  // Activate Tooltips
  const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]'
  );
  const tooltipList = [...tooltipTriggerList].map(
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
  );

  // Add listener to Copy button
  document.querySelectorAll(".copy").forEach(function (element) {
    element.addEventListener("click", function (e) {
      copyToClipboard(this.dataset.no, this);
    });
  });

  // Go to top button
  const goToTop = document.getElementById("go-to-top");
  scrollFunction(goToTop);
  window.onscroll = function () {
    scrollFunction(goToTop);
  };
  goToTop.addEventListener("click", function (e) {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });

  // Send message listener
  const sendMsgBtn = document.getElementById("btn-send-message");
  const sendMsgBtnSpinner = document.getElementById("btn-send-message-loading");
  document
    .getElementById("form-send-message")
    .addEventListener("submit", async function (event) {
      event.preventDefault();

      sendMsgBtnSpinner.classList.remove("d-none");
      sendMsgBtn.classList.add("d-none");

      const name = event.target.name.value;
      const msg = event.target.message.value;
      const body = JSON.stringify({ name, msg });

      if (name === "" || message === "") {
        sendMsgBtnSpinner.classList.add("d-none");
        sendMsgBtn.classList.remove("d-none");

        showToast("error");

        return;
      }

      try {
        const response = await fetch(apiServer + "wedding-msg", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body,
        });

        const resData = await response.json();

        if (resData.message === "error") {
          showToast("error");
        } else {
          event.target.name.value = "";
          event.target.message.value = "";

          showToast("success-msg");
        }
      } catch (error) {
        showToast("error");
      }

      sendMsgBtnSpinner.classList.add("d-none");
      sendMsgBtn.classList.remove("d-none");
    });

  const seeMsgBtn = document.getElementById("btn-see-message");
  const seeMsgBtnSpinner = document.getElementById("btn-see-message-loading");
  let dataMsgs = [];
  seeMsgBtn.addEventListener("click", async function (event) {
    seeMsgBtnSpinner.classList.remove("d-none");
    seeMsgBtn.classList.add("d-none");

    JSON.stringify({ name: "ziah-sanudin" });

    try {
      const response = await fetch(apiServer + "get-wedding-msg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const resData = await response.json();

      if (resData.message === "error") {
        showToast("error");
      } else {
        dataMsgs = resData.data;

        showMsg(dataMsgs);
        document.getElementById("filter-name").value = "";
        new bootstrap.Modal(document.getElementById("messages")).show();
      }
    } catch (error) {
      showToast("error");
    }

    seeMsgBtnSpinner.classList.add("d-none");
    seeMsgBtn.classList.remove("d-none");
  });

  document
    .getElementById("btn-see-message-filter")
    .addEventListener("click", function () {
      const name = document.getElementById("filter-name").value;

      if (name) {
        showMsg(dataMsgs, name);
      } else {
        showMsg(dataMsgs, name);
      }
    });

  console.log("dom loaded");
});

window.addEventListener("load", function () {
  console.log("loaded");

  document.querySelector("body").classList.remove("overflow-hidden");
  document.querySelector(".spinner-wrapper").classList.add("d-none");
});
