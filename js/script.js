const navbar = document.getElementById("mainNavbar");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section[id]");
const filterButtons = document.querySelectorAll(".filter-btn");
const projectItems = document.querySelectorAll(".project-item");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const backToTop = document.getElementById("backToTop");

document.getElementById("year").textContent = new Date().getFullYear();

function updateNavbarShadow() {
  if (window.scrollY > 20) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}

function updateActiveLink() {
  let currentSection = "home";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;
    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${currentSection}`
    );
  });
}

window.addEventListener("scroll", () => {
  updateNavbarShadow();
  updateActiveLink();
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const navMenu = document.getElementById("portfolioNav");
    if (navMenu.classList.contains("show") && window.bootstrap) {
      window.bootstrap.Collapse.getOrCreateInstance(navMenu).hide();
    }
  });
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    projectItems.forEach((item) => {
      const shouldShow = filter === "all" || item.dataset.category === filter;
      item.style.display = shouldShow ? "block" : "none";
    });
  });
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const purpose = document.getElementById("purpose").value;
  const message = document.getElementById("message").value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  formStatus.classList.remove("error");

  if (!name || !email || !subject || !purpose || !message) {
    formStatus.textContent = "Please fill all fields before submitting.";
    formStatus.classList.add("error");
    return;
  }

  if (!emailPattern.test(email)) {
    formStatus.textContent = "Please enter a valid email address.";
    formStatus.classList.add("error");
    return;
  }

  formStatus.textContent =
    "Thank you. Your message has been checked successfully in this demo form.";
  contactForm.reset();
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

updateNavbarShadow();
updateActiveLink();
