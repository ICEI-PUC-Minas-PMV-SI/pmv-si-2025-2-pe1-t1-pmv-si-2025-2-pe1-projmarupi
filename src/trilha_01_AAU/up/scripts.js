window.addEventListener("load", () => {
  localStorage.setItem("userActivityProgress", window.location.href);

  if (history.scrollRestoration) {
    history.scrollRestoration = "manual";
  }
  const feed = document.querySelector(".image-feed");
  const btn = document.querySelector("#btn");
  const buttonContainer = document.querySelector(".slide-content");
  const wheelSensitivity = 1.0;
  const touchSensitivity = 2.5;
  const easeFactor = 0.05;

  let currentScroll = 0;
  let targetScroll = 0;
  let maxScroll = 0;
  let touchStartY = 0;

  function updateMaxScroll() {
    maxScroll = feed.scrollHeight - feed.clientHeight;
    console.log("rodei");
  }

  function checkScrollPosition() {
    if (currentScroll <= 100) {
      buttonContainer.style.opacity = 1;
      buttonContainer.style.pointerEvents = "auto";
    } else {
      buttonContainer.style.opacity = 0;
      buttonContainer.style.pointerEvents = "none";
    }
  }

  //INVERTI A LOGICA! ATENCAO! TALES VAI ME MATAR!
  function handleKeyDown(event) {
    if (event.key === "Home") {
      event.preventDefault();
      updateMaxScroll();
      targetScroll = maxScroll;
    } else if (event.key === "End") {
      event.preventDefault();
      targetScroll = 0;
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
    checkScrollPosition();
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
      if (btn.contains(e.target)) {
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

  if (btn) {
    btn.addEventListener("click", () => {
      window.location.href = "../left/01/intro.html";
    });
  }

  updateMaxScroll();
  feed.scrollTop = maxScroll;
  currentScroll = maxScroll;
  targetScroll = maxScroll;
  checkScrollPosition();
  smoothScrollLoop();
});
