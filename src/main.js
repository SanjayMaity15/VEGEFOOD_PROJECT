import "./style.css";

// Active and close mobile menu

const humburger = document.getElementById("humburger");
const mobileMenu = document.querySelector(".mobile-menu");
const closeMenu = document.getElementById('close-menu');

humburger.addEventListener("click", () => {
  mobileMenu.classList.add("mobile-menu-active");
  humburger.style.display = "none";
  closeMenu.style.display = "block";
  humburger.classList.remove('humburger-active')
  
});
closeMenu.addEventListener("click", () => {
  mobileMenu.classList.remove("mobile-menu-active");
  humburger.classList.add('humburger-active');
  closeMenu.style.display = "none";
  
});
