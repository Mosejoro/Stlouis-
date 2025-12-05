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

// Intersection Observer for triggering animations when stats section is visible
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Start animations when section becomes visible
      animateStats();
      // Unobserve after triggering
      statsObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe the stats section
const statsSection = document.querySelector(".stats");
statsObserver.observe(statsSection);

function animateStats() {
  const statItems = document.querySelectorAll(".stat-item");

  statItems.forEach((item, index) => {
    // Add animation class with delay based on index
    setTimeout(() => {
      item.classList.add("animate");
    }, index * 200);

    const statNumber = item.querySelector("h3");
    const target = parseInt(statNumber.getAttribute("data-target"));
    const duration = 300; // Animation duration in milliseconds
    const steps = 80; // Number of steps in animation
    const stepValue = target / steps;
    let current = 0;

    const updateNumber = () => {
      current += stepValue;
      if (current > target) {
        current = target;
      }
      // Add + symbol if target is 30 (Years of Excellence)
      statNumber.textContent = Math.floor(current) + (target === 30 ? "+" : "");

      if (current < target) {
        requestAnimationFrame(updateNumber);
      } else {
        // Add + symbol to numbers that need it
        if (target === 1000) {
          statNumber.textContent = "1000+";
        } else if (target === 25) {
          statNumber.textContent = "25+";
        }
      }
    };

    requestAnimationFrame(updateNumber);
  });
}
