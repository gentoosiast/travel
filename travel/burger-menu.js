const burger = document.getElementById("burger");
const menu = document.getElementById("menu");
const menuClose = document.querySelector(".menu__close");
const menuLinks = document.getElementsByClassName("menu__link");
const fadeoutContainer = document.querySelector(".fadeout-container");
const menuTarget = document.querySelector(".menu__items");

burger.addEventListener("click", showMenu);
menuClose.addEventListener("click", hideMenu);
for (const link of menuLinks) {
  link.addEventListener("click", hideMenu);
}
document.body.addEventListener("click", (event) => {
  if (event.target !== menuTarget) {
    if (!menu.classList.contains("header__menu_hidden")) {
      hideMenu();
    }
  }
});

function showMenu(event) {
  event.stopPropagation();
  menu.classList.remove("header__menu_hidden");
  fadeoutContainer.classList.add("fadeout-container_active");
}

function hideMenu() {
  menu.classList.add("header__menu_hidden");
  fadeoutContainer.classList.remove("fadeout-container_active");
}
