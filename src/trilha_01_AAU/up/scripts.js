"use strict";

window.addEventListener("load", () => {
  const scrollSpeed = 0.7;
  const feed = document.querySelector(".image-feed");
  const buttonContainer = document.querySelector(".slide-content");

  const btn = document.querySelector("#btn");

  let touchStartY = 0;

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
      feed.scrollTop += event.deltaY * scrollSpeed;
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
      if (touchStartY === 0) {
        return;
      }
      e.preventDefault();
      const touchCurrentY = e.touches[0].clientY;
      const deltaY = touchStartY - touchCurrentY;
      feed.scrollTop += deltaY - scrollSpeed;

      touchStartY = touchCurrentY;
    },
    { passive: false }
  );

  feed.addEventListener("touchend", () => {
    touchStartY = 0;
  });

  feed.addEventListener("scrollend", checkScrollPosition);

  document.addEventListener("keydown", handleKeyDown);

  checkScrollPosition();

  btn.addEventListener("click", () => {
    window.location.href = "../left/01/intro.html";
  });
});
