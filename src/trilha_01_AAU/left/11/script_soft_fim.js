"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const feed = document.querySelector(".image-feed-horizontal");
  const btnRestart = document.querySelector("#btn-restart");
  const scrollSensitivity = 1.6;
  const easeFactor = 0.05;
  let currentScroll = 0;
  let targetScroll = 0;
  let maxScroll = 0;
  let touchStartX = 0;

  function updateMaxScroll() {
    maxScroll = feed.scrollWidth - feed.clientWidth;
  }

  function handleKeyDown(event) {
    if (event.key === "Home") {
      event.preventDefault();
      targetScroll = 0;
    } else if (event.key === "End") {
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
      if (event.deltaX !== 0) {
        event.preventDefault();
        targetScroll -= event.deltaX * scrollSensitivity;
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
      targetScroll -= deltaX * scrollSensitivity;

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
    window.location.href = "../../../dashboard.html";
  });

  currentScroll = feed.scrollLeft;
  targetScroll = feed.scrollLeft;
  updateMaxScroll();
  smoothScrollLoop();
});
