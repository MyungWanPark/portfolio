"use strict";

const navbar = document.querySelector("#navbar");

// navbar's background change with scroll height
document.addEventListener("scroll", () => {
  if (window.scrollY > navbar.offsetHeight) {
    navbar.classList.add("navbar--dark");
  } else {
    navbar.classList.remove("navbar--dark");
  }
});
