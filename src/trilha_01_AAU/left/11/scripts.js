import "../../../js/tokens.js";

document.addEventListener("DOMContentLoaded", () => {
  localStorage.setItem("userActivityProgress", window.location.href);

  const feed = document.querySelector(".image-feed-horizontal");
  const btnRestart = document.querySelector("#btn-restart");

  const wheelSensitivity = 1.0;
  const touchSensitivity = 2.5;
  const easeFactor = 0.05;
  let currentScroll = 0;
  let targetScroll = 0;
  let maxScroll = 0;
  let touchStartX = 0;

  function updateMaxScroll() {
    maxScroll = feed.scrollWidth - feed.clientWidth;
  }

  // Inverti as teclas Home e End! =)
  function handleKeyDown(event) {
    if (event.key === "End") {
      event.preventDefault();
      targetScroll = 0;
    } else if (event.key === "Home") {
      event.preventDefault();
      updateMaxScroll();
      targetScroll = maxScroll;
    }
  }

  function smoothScrollLoop() {
    const distance = targetScroll - currentScroll;
    if (Math.abs(distance) < 0.1) {
      currentScroll = targetScroll;
    } else {
      currentScroll += distance * easeFactor;
    }
    feed.scrollLeft = Math.round(currentScroll);
    requestAnimationFrame(smoothScrollLoop);
  }

  feed.addEventListener(
    "wheel",
    (event) => {
      if (event.deltaY !== 0 || event.deltaX !== 0) {
        event.preventDefault();
        const scrollAmount =
          Math.abs(event.deltaX) > Math.abs(event.deltaY)
            ? event.deltaX
            : event.deltaY;

        targetScroll += scrollAmount * wheelSensitivity;

        updateMaxScroll();
        if (targetScroll < 0) targetScroll = 0;
        if (targetScroll > maxScroll) targetScroll = maxScroll;
      }
    },
    { passive: false }
  );

  feed.addEventListener(
    "touchstart",
    (e) => {
      if (btnRestart.contains(e.target)) {
        return;
      }
      e.preventDefault();
      touchStartX = e.touches[0].clientX;
      updateMaxScroll();
    },
    { passive: false }
  );

  feed.addEventListener(
    "touchmove",
    (e) => {
      e.preventDefault();
      const touchCurrentX = e.touches[0].clientX;
      const deltaX = touchStartX - touchCurrentX;
      targetScroll += deltaX * touchSensitivity;

      if (targetScroll < 0) targetScroll = 0;
      if (targetScroll > maxScroll) targetScroll = maxScroll;
      touchStartX = touchCurrentX;
    },
    { passive: false }
  );

  feed.addEventListener("touchend", () => {
    touchStartX = 0;
  });

  document.addEventListener("keydown", handleKeyDown);

  btnRestart.addEventListener("click", () => {
    TokenService.addToken("finished", "iaua", true);
    setTimeout(() => {
      window.location.href = "../../../dashboard.html";
    }, 1200);
  });

  updateMaxScroll();
  currentScroll = maxScroll;
  targetScroll = maxScroll;
  feed.scrollLeft = maxScroll;
  smoothScrollLoop();
});
