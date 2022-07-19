(function () {
  const burger = document.getElementById("burger");
  const menu = document.getElementById("menu");
  const menuClose = document.querySelector(".menu__close");
  const menuLinks = document.getElementsByClassName("menu__link");
  const fadeout = document.querySelector(".fadeout-container");
  const menuTarget = document.querySelector(".menu__items");

  burger.addEventListener("click", showMenu);
  menuClose.addEventListener("click", hideMenu);
  for (const link of menuLinks) {
    link.addEventListener("click", hideMenu);
  }
  fadeout.addEventListener("click", hideMenu);

  function showMenu(event) {
    // event.stopPropagation();
    menu.classList.remove("header__menu_hidden");
    fadeout.classList.add("fadeout-container_active");
  }

  function hideMenu() {
    menu.classList.add("header__menu_hidden");
    fadeout.classList.remove("fadeout-container_active");
  }

  const headerButton = document.querySelector(".header__button");
  const menuLink = document.querySelector(".menu__link_account");
  const signinPopup = document.querySelector(".popup_signin");
  const registerPopup = document.querySelector(".popup_register");
  const signinForm = document.forms.signin;
  const registerForm = document.forms.register;
  const signinLink = document.querySelector(".popup__link_signin");
  const registerLink = document.querySelector(".popup__link_register");

  headerButton.addEventListener("click", showPopup);
  menuLink.addEventListener("click", showPopup);
  signinForm.addEventListener("submit", submitForm);
  registerForm.addEventListener("submit", submitForm);
  signinLink.addEventListener("click", switchPopup);
  registerLink.addEventListener("click", switchPopup);
  fadeout.addEventListener("click", closePopup);

  function showPopup() {
    document.body.classList.add("body_noscroll");
    signinPopup.classList.remove("popup_hidden");
    fadeout.classList.add("fadeout-container_active");
  }

  function closePopup() {
    document.body.classList.remove("body_noscroll");
    signinPopup.classList.add("popup_hidden");
    registerPopup.classList.add("popup_hidden");
    fadeout.classList.remove("fadeout-container_active");
  }

  function submitForm(event) {
    alert(
      `Submitted data:\nEmail: ${event.target.elements.email.value}\nPassword: ${event.target.elements.password.value}`
    );
    closePopup();
  }

  function switchPopup(event) {
    // register -> signin
    if (event.target === signinLink) {
      registerPopup.classList.add("popup_notransition");
      registerPopup.classList.add("popup_hidden");
      signinPopup.classList.add("popup_notransition");
      signinPopup.classList.remove("popup_hidden");
      signinPopup.offsetHeight; // trigger reflow
      signinPopup.classList.remove("popup_notransition");
      registerPopup.classList.remove("popup_notransition");
    } else {
      // signin -> register
      signinPopup.classList.add("popup_notransition");
      signinPopup.classList.add("popup_hidden");
      registerPopup.classList.add("popup_notransition");
      registerPopup.classList.remove("popup_hidden");
      signinPopup.offsetHeight; // trigger reflow
      signinPopup.classList.remove("popup_notransition");
      registerPopup.classList.remove("popup_notransition");
    }
  }
})();
