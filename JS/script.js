var loader = document.querySelector(".loader");
// Add Event Listner
window.addEventListener("load", Vanish);
function Vanish() {
  loader.classList.add("vanish");
}
// Why
// Product
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const cards = document.querySelectorAll(".card");
let currentIndex = 0;

function showDesktopCards(index) {
  cards.forEach((card, i) => {
    if (i >= index && i < index + 3) {
      card.style.display = "grid";
      card.style.animation = "fadeIn 0.5s ease-in-out";
    } else {
      card.style.display = "none";
    }
  });
}

function showMobileCard(index) {
  cards.forEach((card, i) => {
    if (i === index) {
      card.style.display = "grid";
      card.style.animation = "fadeIn 0.5s ease-in-out";
    } else {
      card.style.display = "none";
    }
  });
}

prevBtn.addEventListener("click", () => {
  if (window.innerWidth > 767) {
    currentIndex = (currentIndex - 3 + cards.length) % cards.length;
    showDesktopCards(currentIndex);
  } else {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    showMobileCard(currentIndex);
  }
});

nextBtn.addEventListener("click", () => {
  if (window.innerWidth > 767) {
    currentIndex = (currentIndex + 3) % cards.length;
    showDesktopCards(currentIndex);
  } else {
    currentIndex = (currentIndex + 1) % cards.length;
    showMobileCard(currentIndex);
  }
});

if (window.innerWidth > 767) {
  showDesktopCards(currentIndex);
} else {
  showMobileCard(currentIndex);
}

// Why
// Parent
$(".carousel-testimonial").owlCarousel({
  loop: true,
  margin: 0,
  responsiveClass: true,
  responsive: {
    0: {
      items: 1,
      nav: true,
    },
    600: {
      items: 3,
      nav: false,
    },
    1000: {
      items: 3,
      nav: true,
      loop: false,
    },
  },
});
// Parent
// Company
$(".testimonial-content").owlCarousel({
  loop: true,
  items: 2,
  margin: 50,
  dots: true,
  nav: false,
  mouseDrag: true,
  autoplay: false,
  autoplayTimeout: 4000,
  smartSpeed: 800,
});

// Company
//
