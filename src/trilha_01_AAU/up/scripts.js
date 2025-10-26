"use strict";

window.addEventListener("load", () => {
  const scrollSpeed = 1.2;
  const feed = document.querySelector(".image-feed");
  const buttonContainer = document.querySelector(".slide-content");

  const btn = document.querySelector("#btn");

  feed.scrollTop = feed.scrollHeight;

  function checkScrollPosition() {
    if (feed.scrollTop <= 0) {
      buttonContainer.style.display = "block";
    } else {
      buttonContainer.style.display = "none";
    }
  }

  //   ATENÇÃO! Inverti o behavior default das teclas home e end. Hahaha! Tales vai me matar!

  function handleKeyDown(event) {
    if (event.key === "Home") {
      event.preventDefault();
      feed.scrollTo({
        top: feed.scrollHeight,
        behavior: "smooth",
      });
    } else if (event.key === "End") {
      event.preventDefault();
      feed.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }

  feed.addEventListener("wheel", (event) => {
    if (event.deltaY !== 0) {
      event.preventDefault();
      if (feed.scrollTop === 0 && event.deltaY > 0) {
        return;
      }
      feed.scrollTop -= event.deltaY * scrollSpeed;
    }
  });

  feed.addEventListener("scrollend", checkScrollPosition);

  document.addEventListener("keydown", handleKeyDown);

  checkScrollPosition();

  btn.addEventListener("click", () => {
    window.location.href = "../left/01/intro.html";
  });
});
