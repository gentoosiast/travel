const circleButtons = document.querySelectorAll(".circle-button");
const slides = document.querySelectorAll(".carousel__slide");

// manual switch of active circle button and active slide
// (temporary hack to achieve perfect similarity with mockup)
const mediaQuery = window.matchMedia("(max-width: 391px)");
mediaQuery.onchange = (e) => {
  if (mediaQuery.matches) {
    circleButtons[0].classList.add("circle-button_active");
    circleButtons[1].classList.remove("circle-button_active");
    slides[0].classList.add("slide_active");
    slides[1].classList.remove("slide_active");
  } else {
    circleButtons[0].classList.remove("circle-button_active");
    circleButtons[1].classList.add("circle-button_active");
    slides[0].classList.remove("slide_active");
    slides[1].classList.add("slide_active");
  }
};
