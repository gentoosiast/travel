(function () {
  // BURGER MENU
  const burger = document.getElementById("burger");
  const menu = document.querySelector(".header__menu");
  const menuClose = document.querySelector(".menu__close");
  const menuItems = document.querySelector(".menu__items");
  const fadeout = document.querySelector(".fadeout-container");

  burger.addEventListener("click", showMenu);
  menuClose.addEventListener("click", hideMenu);
  menuItems.addEventListener("click", handleMenuClick);
  fadeout.addEventListener("click", hideMenu);

  function showMenu() {
    menu.classList.remove("header__menu_hidden");
    fadeout.classList.add("fadeout-container_active");
  }

  function handleMenuClick(event) {
    if (event.target.classList.contains("menu__link")) {
      hideMenu();
    }
    if (event.target.classList.contains("menu__link_account")) {
      showPopup();
    }
  }

  function hideMenu() {
    menu.classList.add("header__menu_hidden");
    fadeout.classList.remove("fadeout-container_active");
  }

  // SIGN-IN / REGISTER POPUP
  const headerButton = document.querySelector(".header__button");
  const popup = document.querySelector(".popup");
  const signinPopup = document.querySelector(".popup__signin");
  const registerPopup = document.querySelector(".popup__register");
  const signinForm = document.forms.signin;
  const registerForm = document.forms.register;
  const signinLink = document.querySelector(".popup__link_signin");
  const registerLink = document.querySelector(".popup__link_register");

  headerButton.addEventListener("click", showPopup);
  signinForm.addEventListener("submit", submitForm);
  registerForm.addEventListener("submit", submitForm);
  signinLink.addEventListener("click", switchPopup);
  registerLink.addEventListener("click", switchPopup);
  fadeout.addEventListener("click", closePopup);

  function showPopup() {
    document.body.classList.add("body_noscroll");
    popup.classList.remove("popup_hidden");
    fadeout.classList.add("fadeout-container_active");
  }

  function closePopup() {
    document.body.classList.remove("body_noscroll");
    popup.classList.add("popup_notransition");
    popup.classList.add("popup_hidden");
    signinPopup.classList.remove("popup__signin_hidden");
    registerPopup.classList.add("popup__register_hidden");
    fadeout.classList.remove("fadeout-container_active");
    popup.offsetHeight; // Trigger a reflow, flushing the CSS changes
    popup.classList.remove("popup_notransition");
  }

  function submitForm(event) {
    alert(
      `Submitted data:\nEmail: ${event.target.elements.email.value}\nPassword: ${event.target.elements.password.value}`
    );
    closePopup();
  }

  function switchPopup(event) {
    signinPopup.classList.toggle("popup__signin_hidden");
    registerPopup.classList.toggle("popup__register_hidden");
  }

  // SLIDER
  const circleButtons = document.querySelectorAll(".circle-button");
  const slider = document.querySelector(".carousel__slides");
  const slides = document.getElementsByClassName("carousel__slide");
  const prevArrow = document.querySelector(".carousel__arrow_prev");
  const nextArrow = document.querySelector(".carousel__arrow_next");

  const numSlides = slides.length;
  let shiftValue = getShiftValue();
  let curIdx = 1; // 2nd slide

  slides[curIdx - 1].addEventListener("click", shiftLeft);
  slides[curIdx + 1].addEventListener("click", shiftRight);
  prevArrow.addEventListener("click", shiftLeft);
  nextArrow.addEventListener("click", shiftRight);
  circleButtons.forEach((button, idx) =>
    button.addEventListener("click", function () {
      switchSlide(idx);
    })
  );

  // recalculate shiftValue and slider position
  function handleResize() {
    slider.classList.remove("carousel__slides_transition");
    shiftValue = getShiftValue();
    setSliderPosition(curIdx);
    slider.classList.add("carousel__slides_transition");
  }

  new ResizeObserver(handleResize).observe(slider);

  function getShiftValue() {
    const slideWidth = slides[0].offsetWidth;
    const gapWidth = Math.floor(
      (slider.offsetWidth - slideWidth * numSlides) / (numSlides - 1)
    );
    return slideWidth + gapWidth;
  }

  function setSliderPosition(idx) {
    const shiftPosition = idx === 0 ? shiftValue : (idx - 1) * -shiftValue;
    slider.style.transform = `translateX(${shiftPosition}px)`;
  }

  function switchSlide(idx) {
    // index out of bounds or same index as current
    if (idx < 0 || idx > numSlides - 1 || curIdx === idx) {
      return;
    }

    slides[curIdx].classList.remove("slide_active");
    if (curIdx > 0) {
      slides[curIdx - 1].removeEventListener("click", shiftLeft);
    } else {
      prevArrow.classList.remove("carousel__arrow_disabled");
    }
    if (curIdx < numSlides - 1) {
      slides[curIdx + 1].removeEventListener("click", shiftRight);
    } else {
      nextArrow.classList.remove("carousel__arrow_disabled");
    }
    circleButtons[curIdx].classList.remove("circle-button_active");

    curIdx = idx;
    slides[curIdx].classList.add("slide_active");
    if (curIdx > 0) {
      slides[curIdx - 1].addEventListener("click", shiftLeft);
    } else {
      prevArrow.classList.add("carousel__arrow_disabled");
    }
    if (curIdx < numSlides - 1) {
      slides[curIdx + 1].addEventListener("click", shiftRight);
    } else {
      nextArrow.classList.add("carousel__arrow_disabled");
    }
    circleButtons[curIdx].classList.add("circle-button_active");
    setSliderPosition(curIdx);
  }

  function shiftLeft() {
    switchSlide(curIdx - 1);
  }

  function shiftRight() {
    switchSlide(curIdx + 1);
  }

  // INITIALIZATION ON DOCUMENT LOAD
  globalThis.onload = function () {
    // prevent flicker on page load
    menu.style.display = "block";
    popup.style.display = "block";
  };
})();
