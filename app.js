(() => {
  // FADEOUT
  const fadeout = document.querySelector('.fadeout-container');

  // SIGN-IN / REGISTER POPUP
  const headerButton = document.querySelector('.header__button');
  const popup = document.querySelector('.popup');
  const signinPopup = document.querySelector('.popup__signin');
  const registerPopup = document.querySelector('.popup__register');
  const signinForm = document.forms.signin;
  const registerForm = document.forms.register;
  const signinLink = document.querySelector('.popup__link_signin');
  const registerLink = document.querySelector('.popup__link_register');

  function showPopup() {
    signinPopup.classList.remove('popup__signin_hidden');
    registerPopup.classList.add('popup__register_hidden');
    document.body.classList.add('body-noscroll');
    popup.classList.remove('popup_hidden');
    fadeout.classList.add('fadeout-container_active');
  }

  function closePopup() {
    document.body.classList.remove('body-noscroll');
    popup.classList.add('popup_hidden');
    fadeout.classList.remove('fadeout-container_active');
  }

  function submitForm(event) {
    /* eslint-disable no-alert */
    alert(
      `Submitted data:\nEmail: ${event.target.elements.email.value}\nPassword: ${event.target.elements.password.value}`,
    );
    /* eslint-enable no-alert */
    closePopup();
  }

  function switchPopup() {
    signinPopup.classList.toggle('popup__signin_hidden');
    registerPopup.classList.toggle('popup__register_hidden');
  }

  headerButton.addEventListener('click', showPopup);
  signinForm.addEventListener('submit', submitForm);
  registerForm.addEventListener('submit', submitForm);
  signinLink.addEventListener('click', switchPopup);
  registerLink.addEventListener('click', switchPopup);
  fadeout.addEventListener('click', closePopup);

  // BURGER MENU
  const burger = document.getElementById('burger');
  const menu = document.querySelector('.header__menu');
  const menuClose = document.querySelector('.menu__close');
  const menuItems = document.querySelector('.menu__items');

  function showMenu() {
    menu.classList.remove('header__menu_hidden');
    fadeout.classList.add('fadeout-container_active');
  }

  function hideMenu() {
    menu.classList.add('header__menu_hidden');
    fadeout.classList.remove('fadeout-container_active');
  }

  function handleMenuClick(event) {
    if (event.target.classList.contains('menu__link')) {
      hideMenu();
    }
    if (event.target.classList.contains('menu__link_account')) {
      showPopup();
    }
  }

  burger.addEventListener('click', showMenu);
  menuClose.addEventListener('click', hideMenu);
  menuItems.addEventListener('click', handleMenuClick);
  fadeout.addEventListener('click', hideMenu);

  // SLIDER
  const circleButtons = document.querySelectorAll('.circle-button');
  const slider = document.querySelector('.carousel__slides');
  const slides = document.getElementsByClassName('carousel__slide');
  const prevArrow = document.querySelector('.carousel__arrow_prev');
  const nextArrow = document.querySelector('.carousel__arrow_next');
  const numSlides = slides.length;

  function getShiftValue() {
    const slideWidth = slides[0].offsetWidth;
    const gapWidth = Math.floor(
      (slider.offsetWidth - slideWidth * numSlides) / (numSlides - 1),
    );
    return slideWidth + gapWidth;
  }

  let shiftValue = getShiftValue();
  let curSlideIdx = 1; // 2nd slide

  function setSliderPosition(idx) {
    const shiftPosition = idx === 0 ? shiftValue : (idx - 1) * -shiftValue;
    slider.style.transform = `translateX(${shiftPosition}px)`;
  }

  /* eslint-disable no-use-before-define */
  function switchSlide(idx) {
    // index out of bounds or same index as current
    if (idx < 0 || idx > numSlides - 1 || curSlideIdx === idx) {
      return;
    }

    slides[curSlideIdx].classList.remove('slide_active');
    if (curSlideIdx > 0) {
      slides[curSlideIdx - 1].removeEventListener('click', shiftLeft);
    } else {
      prevArrow.classList.remove('carousel__arrow_disabled');
    }
    if (curSlideIdx < numSlides - 1) {
      slides[curSlideIdx + 1].removeEventListener('click', shiftRight);
    } else {
      nextArrow.classList.remove('carousel__arrow_disabled');
    }
    circleButtons[curSlideIdx].classList.remove('circle-button_active');

    curSlideIdx = idx;
    slides[curSlideIdx].classList.add('slide_active');
    if (curSlideIdx > 0) {
      slides[curSlideIdx - 1].addEventListener('click', shiftLeft);
    } else {
      prevArrow.classList.add('carousel__arrow_disabled');
    }
    if (curSlideIdx < numSlides - 1) {
      slides[curSlideIdx + 1].addEventListener('click', shiftRight);
    } else {
      nextArrow.classList.add('carousel__arrow_disabled');
    }
    circleButtons[curSlideIdx].classList.add('circle-button_active');
    setSliderPosition(curSlideIdx);
  }
  /* eslint-enable no-use-before-define */

  function shiftLeft() {
    switchSlide(curSlideIdx - 1);
  }

  function shiftRight() {
    switchSlide(curSlideIdx + 1);
  }

  slides[curSlideIdx - 1].addEventListener('click', shiftLeft);
  slides[curSlideIdx + 1].addEventListener('click', shiftRight);
  prevArrow.addEventListener('click', shiftLeft);
  nextArrow.addEventListener('click', shiftRight);
  circleButtons.forEach((button, idx) => {
    button.addEventListener('click', () => switchSlide(idx));
  });

  // recalculate shiftValue and slider position
  function handleResize() {
    slider.classList.remove('carousel__slides_transition');
    shiftValue = getShiftValue();
    setSliderPosition(curSlideIdx);
    /* eslint-disable no-unused-expressions */
    slider.offsetHeight; // Trigger a reflow, flushing the CSS changes
    /* eslint-enable no-unused-expressions */
    slider.classList.add('carousel__slides_transition');
  }

  new ResizeObserver(handleResize).observe(slider);

  // INITIALIZATION ON DOCUMENT LOAD
  globalThis.onload = () => {
    // undo 'display: none' (needed to prevent flicker on page load)
    menu.style.display = 'block';
    popup.style.display = 'block';
  };
})();
