"use strict";

const navbar = document.querySelector("#navbar");
const navbarMenu = document.querySelector(".navbar__menu");
const contactBtn = document.querySelector(".home__contact");
const homeContainer = document.querySelector(".home__container");
const upperIcon = document.querySelector(".arrow-up");
const projectBtns = document.querySelector(".project__categories");
const categoryBtns = document.querySelectorAll(".category__btn");
const projects = document.querySelectorAll(".project");
const projectContainer = document.querySelector(".work__projects");
const toggleBtn = document.querySelector(".navbar__toggle-btn");

// navbar's background change with scroll height
document.addEventListener("scroll", () => {
  if (window.scrollY > navbar.getBoundingClientRect().height) {
    navbar.classList.add("navbar--dark");
  } else {
    navbar.classList.remove("navbar--dark");
  }
});

// toggle button activate
toggleBtn.addEventListener("click", () => {
  navbarMenu.classList.toggle("active");
});

// scroll to the tapped menu
navbarMenu.addEventListener("click", (event) => {
  const selectedMenuElem = event.target;
  const destID = selectedMenuElem.dataset.link;

  navbarMenu.classList.remove("active");
  scrollIntoViews(destID);
});

// when contact me is clicked, scroll to the buttom
contactBtn.addEventListener("click", () => {
  scrollIntoViews("#contact");
});

//
const content =
  "Hello. I'm Myung Wan, \n A software engineer who is passionate on solving problems.";
const text = document.querySelector(".home__description-text");
let i = 0;

function typing() {
  let txt = content[i++];
  text.innerHTML += txt === "\n" ? "<br/>" : txt;
  if (i > content.length) {
    text.textContent = "";
    i = 0;
  }
}
setInterval(typing, 150);

// When scroll down, home content fade away
/* document.addEventListener("scroll", () => {
  const opacitySlope =
    window.scrollY / homeContainer.getBoundingClientRect().height;
  homeContainer.style.opacity = 1 - opacitySlope;
}); */

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
  //   remove selected button and select category button.
  const selectedCategory = document.querySelector(".category__btn.selected");
  selectedCategory.classList.remove("selected");

  const target =
    e.target.nodeName === "BUTTON" ? e.target : e.target.parentNode;
  target.classList.add("selected");

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

// When related area comes, navbar button activate

const sectionIds = [
  "#home",
  "#about",
  "#skills",
  "#my_work",
  // "#testimonials",
  "#contact",
];
const sections = sectionIds.map((id) => document.querySelector(id));
const navItems = sectionIds.map((id) =>
  document.querySelector(`[data-link="${id}"]`)
);

let activeNavIndex = 0;
let activeNav = navItems[0];

const oberverCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      const selectedIndex = sectionIds.indexOf(`#${entry.target.id}`);
      if (entry.boundingClientRect.y < 0) {
        activeNavIndex = selectedIndex + 1;
      } else {
        activeNavIndex = selectedIndex - 1;
      }
    }
  });
};

const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.3,
};

const observer = new IntersectionObserver(oberverCallback, observerOptions);

sections.forEach((section) => {
  observer.observe(section);
});

window.addEventListener("wheel", () => {
  if (window.scrollY === 0) {
    activeNavIndex = 0;
  } else if (
    Math.round(window.scrollY + window.innerHeight) >=
    document.body.clientHeight
  ) {
    activeNavIndex = navItems.length - 1;
  }
  activateNav(navItems[activeNavIndex]);
});

// utility function
function scrollIntoViews(selector) {
  const destElem = document.querySelector(selector);
  destElem.scrollIntoView({ behavior: "smooth" });
  activateNav(navItems[sectionIds.indexOf(selector)]);
}

function activateNav(selectedNav) {
  activeNav.classList.remove("active");
  activeNav = selectedNav;
  activeNav.classList.add("active");
}
