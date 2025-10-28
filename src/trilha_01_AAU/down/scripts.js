"use strict";

const scrollSpeed = 0.1;
const feed = document.querySelector(".image-feed");

const btn = document.querySelector("#btn");

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

document.addEventListener("keydown", handleKeyDown);

btn.addEventListener("click", () => {
  window.location.href = "../right/right.html";
});
