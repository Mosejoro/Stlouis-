// Tab switching functionality
const tabButtons = document.querySelectorAll(".tab-btn");
const gallerySections = document.querySelectorAll(".gallery-section");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons and sections
    tabButtons.forEach((btn) => btn.classList.remove("active"));
    gallerySections.forEach((section) => section.classList.remove("active"));

    // Add active class to clicked button and corresponding section
    button.classList.add("active");
    const category = button.getAttribute("data-category");
    document.getElementById(category).classList.add("active");
  });
});
