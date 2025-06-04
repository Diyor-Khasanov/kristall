document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const hamburger = document.querySelector(".hamburger");
  const navList = document.querySelector(".nav-list");

  hamburger.addEventListener("click", function () {
    this.classList.toggle("active");
    navList.classList.toggle("active");
  });

  // Close mobile menu when clicking a link
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (window.innerWidth <= 768) {
        hamburger.classList.remove("active");
        navList.classList.remove("active");
      }
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Header scroll effect
  const header = document.querySelector(".header");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Animate stats counter
  const statNumbers = document.querySelectorAll(".stat-number");
  if (statNumbers.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = +entry.target.getAttribute("data-count");
            const count = +entry.target.innerText;
            const increment = target / 50;

            if (count < target) {
              entry.target.innerText = Math.ceil(count + increment);
              setTimeout(() => {
                observer.observe(entry.target);
              }, 20);
            } else {
              entry.target.innerText = target;
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    statNumbers.forEach((number) => {
      observer.observe(number);
    });
  }

  // Add active class to current section in navigation
  const sections = document.querySelectorAll("section");
  window.addEventListener("scroll", function () {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      const headerHeight = document.querySelector(".header").offsetHeight;

      if (pageYOffset >= sectionTop - headerHeight - 50) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // Initialize 3D effect on product cards
  const productCards = document.querySelectorAll(".product-card");
  productCards.forEach((card) => {
    const productImage = card.querySelector(".product-image");

    card.addEventListener("mousemove", (e) => {
      const xAxis = (window.innerWidth / 2 - e.pageX) / 15;
      const yAxis = (window.innerHeight / 2 - e.pageY) / 15;
      productImage.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });

    // Reset on mouse leave
    card.addEventListener("mouseleave", () => {
      productImage.style.transform = "rotateY(0deg) rotateX(0deg)";
    });
  });
});
