//Hamburger-menu

const hamburgerMenu = document.querySelector(".hamburger-menu");
const navLinks = document.querySelector(".nav-links");

hamburgerMenu.addEventListener("click", () => {
    hamburgerMenu.classList.toggle("active");
    navLinks.classList.toggle("active");
});
