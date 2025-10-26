"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const scrollSpeed = 0.8;
  const feed = document.querySelector(".image-feed-horizontal");
  const btnRestart = document.querySelector("#btn-restart");

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

  document.addEventListener("keydown", handleKeyDown);

  btnRestart.addEventListener("click", () => {
    window.location.href = "../../down/start.html";
  });
});
