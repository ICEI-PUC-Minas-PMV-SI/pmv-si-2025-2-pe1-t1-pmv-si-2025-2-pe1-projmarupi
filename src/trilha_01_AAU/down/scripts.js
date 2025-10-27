"use strict";

const scrollSpeed = 1.2;
const feed = document.querySelector(".image-feed");

const btn = document.querySelector("#btn");

let touchStartY = 0;

function handleKeyDown(event) {
  if (event.key === "Home") {
    event.preventDefault();
    feed.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  } else if (event.key === "End") {
    event.preventDefault();
    feed.scrollTo({
      top: feed.scrollHeight,
      behavior: "smooth",
    });
  }
}

feed.addEventListener("wheel", (event) => {
  if (event.deltaY !== 0) {
    event.preventDefault();
    feed.scrollTop += event.deltaY * scrollSpeed;
  }
});

feed.addEventListener(
  "touchstart",
  (e) => {
    e.preventDefault();
    const touchCurrentY = e.touches[0].clientY;
    const deltaY = touchStartY - touchCurrentY;

    feed.scrollTop -= deltaY * scrollSpeed;

    touchStartY = touchCurrentY;
  },
  { passive: false }
);

feed.addEventListener("touchend", (e) => {
  touchStartY = 0;
});

document.addEventListener("keydown", handleKeyDown);

btn.addEventListener("click", () => {
  window.location.href = "../right/right.html";
});
