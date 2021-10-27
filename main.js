"use strict";

const navbar = document.querySelector("#navbar");
const navbarMenu = document.querySelector(".navbar__menu");

// navbar's background change with scroll height
document.addEventListener("scroll", () => {
  if (window.scrollY > navbar.offsetHeight) {
    navbar.classList.add("navbar--dark");
  } else {
    navbar.classList.remove("navbar--dark");
  }
});

// scroll to the tapped menu
navbarMenu.addEventListener("click", (event) => {
  const selectedMenuElem = event.target;
  const destID = selectedMenuElem.dataset.link;
  const destElem = document.querySelector(destID);
  destElem.scrollIntoView({ behavior: "smooth" });
});
