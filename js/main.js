document.addEventListener("DOMContentLoaded", function () {
  // Set the target date and time (change this to your desired date)
  const targetDate = new Date("June 8, 2024 11:00:00").getTime();

  // Update the countdown every second
  const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      document.getElementById("countdown").innerHTML = "EXPIRED";
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

  // Initial call to update countdown
  updateCountdown();

  // Update every second
  setInterval(updateCountdown, 1000);

  document.querySelectorAll(".copy").forEach(function (element) {
    element.addEventListener("click", function (e) {
      copyToClipboard(this.dataset.no, this);
    });
  });
  // Copy to Clipboard
  function copyToClipboard(textToCopy, _this) {
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
  }

  // Go To Top Button
  const goToTop = document.getElementById("go-to-top");
  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 70 ||
      document.documentElement.scrollTop > 70
    ) {
      goToTop.style.display = "block";
    } else {
      goToTop.style.display = "none";
    }
  }

  goToTop.addEventListener("click", function (e) {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });
});
