"use strict";

const navbar = document.querySelector("#navbar");
const navbarMenu = document.querySelector(".navbar__menu");
const contactBtn = document.querySelector(".home__contact");
const homeContainer = document.querySelector(".home__container");

// navbar's background change with scroll height
document.addEventListener("scroll", () => {
  if (window.scrollY > navbar.getBoundingClientRect().height) {
    navbar.classList.add("navbar--dark");
  } else {
    navbar.classList.remove("navbar--dark");
  }
});

// scroll to the tapped menu
navbarMenu.addEventListener("click", (event) => {
  const selectedMenuElem = event.target;
  const destID = selectedMenuElem.dataset.link;
  scrollIntoViews(destID);
});

// when contact me is clicked, scroll to the buttom
contactBtn.addEventListener("click", () => {
  scrollIntoViews("#contact");
});

function scrollIntoViews(selector) {
  const destElem = document.querySelector(selector);
  destElem.scrollIntoView({ behavior: "smooth" });
}

// When scroll down, home content fade away
document.addEventListener("scroll", () => {
  const opacitySlope =
    window.scrollY / homeContainer.getBoundingClientRect().height;
  homeContainer.style.opacity = 1 - opacitySlope;
});
