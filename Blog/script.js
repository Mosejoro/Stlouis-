// Search functionality
const searchInput = document.getElementById("searchInput");
const blogCards = document.querySelectorAll(".blog-card");

searchInput.addEventListener("input", function (e) {
  const searchTerm = e.target.value.toLowerCase();

  blogCards.forEach((card) => {
    const title = card.getAttribute("data-title").toLowerCase();
    const content = card.textContent.toLowerCase();

    if (title.includes(searchTerm) || content.includes(searchTerm)) {
      card.classList.remove("hidden");
    } else {
      card.classList.add("hidden");
    }
  });
});

// Expandable content functionality
document.querySelectorAll(".read-more").forEach((button) => {
  button.addEventListener("click", function () {
    const card = this.closest(".blog-card");
    card.classList.toggle("expanded");
    this.textContent = card.classList.contains("expanded")
      ? "Show Less"
      : "Read More";
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const magicWand = document.getElementById("magicWand");
  const mainRealm = document.getElementById("mainRealm");
  const cascades = document.querySelectorAll(".cascade");

  magicWand.addEventListener("click", function (e) {
    e.stopPropagation();
    magicWand.classList.toggle("active");
    mainRealm.classList.toggle("active");
  });

  cascades.forEach((cascade) => {
    cascade.addEventListener("click", function (e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        this.classList.toggle("active");
      }
    });
  });

  document.addEventListener("click", function (e) {
    if (window.innerWidth <= 768) {
      if (!mainRealm.contains(e.target) && !magicWand.contains(e.target)) {
        mainRealm.classList.remove("active");
        magicWand.classList.remove("active");
        cascades.forEach((cascade) => cascade.classList.remove("active"));
      }
    }
  });
});
