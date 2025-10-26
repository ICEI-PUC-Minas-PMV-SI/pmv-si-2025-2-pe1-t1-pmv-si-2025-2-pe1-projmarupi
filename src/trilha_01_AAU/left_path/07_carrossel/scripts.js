"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".carrousel-slider");
  const prevButton = document.querySelector(".prev-btn");
  const nextButton = document.querySelector(".next-btn");
  const images = document.querySelectorAll(".carrousel-image");

  if (!slider || !prevButton || !nextButton || images.length === 0) {
    console.log("Deu ruim!");
    return;
  }

  let currentIndex = 0;
  const totalImages = images.length;

  function updateSliderPosition() {
    const targetImage = images[currentIndex];

    if (targetImage) {
      const offset = targetImage.offsetLeft;
      slider.style.transform = `translateX(-${offset}px)`;
    } else {
      console.error("Não tem imagem com o índice:", currentIndex);
    }
  }

  nextButton.addEventListener("click", () => {
    currentIndex++;
    if (currentIndex >= totalImages) {
      currentIndex = 0;
    }
    updateSliderPosition();
  });

  prevButton.addEventListener("click", () => {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = totalImages - 1;
    }
    updateSliderPosition();
  });

  window.addEventListener("resize", updateSliderPosition);

  updateSliderPosition();
});
