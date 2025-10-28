"use strict";

const scrollSpeed = 0.8;
const feed = document.querySelector(".image-feed-horizontal");

const btn = document.querySelector("#btn");

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
    if (btn.contains(e.target)) {
      return;
    }
    e.preventDefault();
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

    feed.scrollLeft -= deltaX * scrollSpeed;

    touchStartX = touchCurrentX;
  },
  { passive: false }
);

feed.addEventListener("touchend", () => {
  touchStartX = 0;
});

document.addEventListener("keydown", handleKeyDown);

btn.addEventListener("click", () => {
  window.location.href = "../up/up.html";
});
