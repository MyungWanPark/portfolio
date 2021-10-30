"use strict";

const navbar = document.querySelector("#navbar");
const navbarMenu = document.querySelector(".navbar__menu");
const contactBtn = document.querySelector(".home__contact");
const homeContainer = document.querySelector(".home__container");
const upperIcon = document.querySelector(".arrow-up");
const projectBtns = document.querySelector(".project__categories");
const projects = document.querySelectorAll(".project");
const projectContainer = document.querySelector(".work__projects");

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

// When scroll down, home content fade away
document.addEventListener("scroll", () => {
  const opacitySlope =
    window.scrollY / homeContainer.getBoundingClientRect().height;
  homeContainer.style.opacity = 1 - opacitySlope;
});

// when scrolling down, upper arrow button appears.
// And when it clicked, it sends to the top.

document.addEventListener("scroll", () => {
  if (window.scrollY > homeContainer.getBoundingClientRect().height / 2) {
    upperIcon.classList.add("visible");
  } else {
    upperIcon.classList.remove("visible");
  }
});

upperIcon.addEventListener("click", () => {
  scrollIntoViews("#home");
});

// my work project classification
projectBtns.addEventListener("click", (e) => {
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;

  if (filter == "null") {
    return;
  }
  projectContainer.classList.add("animation-out");

  setTimeout(() => {
    projects.forEach((project) => {
      let typeOfProject = project.dataset.type;
      if (filter === "*" || filter === typeOfProject) {
        project.classList.remove("invisible");
      } else {
        project.classList.add("invisible");
      }
    });
    projectContainer.classList.remove("animation-out");
  }, 300);
});

// utility function
function scrollIntoViews(selector) {
  const destElem = document.querySelector(selector);
  destElem.scrollIntoView({ behavior: "smooth" });
}
