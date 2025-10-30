"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const feed = document.querySelector(".image-feed");
  const buttonContainer = document.querySelector(".slide-content");
  const btn = document.querySelector("#btn");

  const wheelSensitivity = 1.5;
  const touchSensitivity = 2.5;
  const easeFactor = 0.05;
  let currentScroll = 0;
  let targetScroll = 0;
  let maxScroll = 0;
  let touchStartY = 0;

  function updateMaxScroll() {
    maxScroll = feed.scrollHeight - feed.clientHeight;
  }

  function handleKeyDown(event) {
    if (event.key === "Home") {
      console.log("lalalala");
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

    feed.scrollTop = Math.round(currentScroll);
    requestAnimationFrame(smoothScrollLoop);
  }

  feed.addEventListener(
    "wheel",
    (event) => {
      if (event.deltaY !== 0) {
        event.preventDefault();

        targetScroll += event.deltaY * wheelSensitivity;

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
      if (btn && btn.contains(e.target)) {
        return;
      }
      e.preventDefault();

      touchStartY = e.touches[0].clientY;
      updateMaxScroll();
    },
    { passive: false }
  );

  feed.addEventListener(
    "touchmove",
    (e) => {
      e.preventDefault();

      const touchCurrentY = e.touches[0].clientY;
      const deltaY = touchStartY - touchCurrentY;
      targetScroll += deltaY * touchSensitivity;

      if (targetScroll < 0) targetScroll = 0;
      if (targetScroll > maxScroll) targetScroll = maxScroll;

      touchStartY = touchCurrentY;
    },
    { passive: false }
  );

  feed.addEventListener("touchend", () => {
    touchStartY = 0;
  });

  document.addEventListener("keydown", handleKeyDown);

  btn.addEventListener("click", () => {
    window.location.href = "../right/right.html";
  });

  currentScroll = feed.scrollTop;
  targetScroll = feed.scrollTop;
  updateMaxScroll();
  feed.focus();
  smoothScrollLoop();
});
