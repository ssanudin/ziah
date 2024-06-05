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
      console.log("Text copied to clipboard!", textToCopy);
      _this.classList.add("btn-success");
      _this.classList.remove("btn-warning");
      setTimeout(function () {
        _this.classList.add("btn-warning");
        _this.classList.remove("btn-success");
      }, 1500);
    })
    .catch((error) => {
      console.error("Error copying text:", error);
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

document.addEventListener("DOMContentLoaded", function () {
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
    document.querySelector("section.to").classList.remove("d-none");
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
        const response = await fetch("https://notion.sanud.in/wedding-msg", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body,
        });

        const resData = await response.json();
        console.log("response", resData, body);

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

  console.log("dom loaded");
});

window.addEventListener("load", function () {
  console.log("loaded");

  document.querySelector("body").classList.remove("overflow-hidden");
  document.querySelector(".spinner-wrapper").classList.add("d-none");
});
