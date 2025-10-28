"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const feed = document.querySelector(".image-feed-horizontal");
  const btnRestart = document.querySelector("#btn-restart");

  const scrollSpeed = 1.8;
  let touchStartX = 0;

  function handleKeyDown(event) {
    if (event.key === "Home") {
      event.preventDefault();
      feed.scrollTo({
        left: 0,
        behavior: "smooth",
      });
    } else if (event.key === "End") {
      event.preventDefault();
      feed.scrollTo({
        left: feed.scrollWidth,
        behavior: "smooth",
      });
    }
  }

  feed.addEventListener("wheel", (event) => {
    if (event.deltaY !== 0) {
      event.preventDefault();
      feed.scrollLeft -= event.deltaY * scrollSpeed;
    }
  });

  feed.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.touches[0].clientX;
    },
    { passive: false }
  );

  feed.addEventListener(
    "touchmove",
    (e) => {
      e.preventDefault();
      const touchCurrentX = e.touches[0].clientX;
      const deltaX = touchStartX - touchCurrentX;

      feed.scrollLeft += deltaX * scrollSpeed;

      touchStartX = touchCurrentX;
    },
    { passive: false }
  );

  feed.addEventListener("touchend", () => {
    touchStartX = 0;
  });

  document.addEventListener("keydown", handleKeyDown);

  btnRestart.addEventListener("click", () => {
    window.location.href = "../../down/start.html";
  });
});
