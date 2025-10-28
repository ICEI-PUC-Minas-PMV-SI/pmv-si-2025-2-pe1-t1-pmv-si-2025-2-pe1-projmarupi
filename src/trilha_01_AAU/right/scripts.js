"use strict";

const scrollSpeed = 2;
const feed = document.querySelector(".image-feed-horizontal");

const btn = document.querySelector("#btn");

let touchStartY = 0;

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
    feed.scrollLeft += event.deltaY * scrollSpeed;
  }
});

feed.addEventListener(
  "touchstart",
  (e) => {
    touchStartY = e.touches[0].clientY;
  },
  { passive: false }
);

feed.addEventListener(
  "touchmove",
  (e) => {
    e.preventDefault();
    const touchCurrentY = e.touches[0].clientY;
    const deltaY = touchStartY - touchCurrentY;

    feed.scrollLeft -= deltaY * scrollSpeed;

    touchStartY = touchCurrentY;
  },
  { passive: false }
);

feed.addEventListener("touchend", () => {
  touchStartY = 0;
});

document.addEventListener("keydown", handleKeyDown);

btn.addEventListener("click", () => {
  window.location.href = "../up/up.html";
});
