document.addEventListener("DOMContentLoaded", function () {
  const sliderTrack = document.querySelector(".slider-track");
  const slides = document.querySelectorAll(".slider-slide");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.querySelector(".slider-prev");
  const nextBtn = document.querySelector(".slider-next");

  let currentIndex = 0;
  const slideCount = slides.length;

  // Initialize slider
  function updateSlider() {
    sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Update dots
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  // Next slide
  function nextSlide() {
    currentIndex = (currentIndex + 1) % slideCount;
    updateSlider();
  }

  // Previous slide
  function prevSlide() {
    currentIndex = (currentIndex - 1 + slideCount) % slideCount;
    updateSlider();
  }

  // Click on dot
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentIndex = index;
      updateSlider();
    });
  });

  // Button events
  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  // Auto slide
  let slideInterval = setInterval(nextSlide, 5000);

  // Pause on hover
  const sliderContainer = document.querySelector(".slider-container");
  sliderContainer.addEventListener("mouseenter", () => {
    clearInterval(slideInterval);
  });

  sliderContainer.addEventListener("mouseleave", () => {
    slideInterval = setInterval(nextSlide, 5000);
  });

  // Touch events for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  sliderContainer.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
      clearInterval(slideInterval);
    },
    { passive: true }
  );

  sliderContainer.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
      slideInterval = setInterval(nextSlide, 5000);
    },
    { passive: true }
  );

  function handleSwipe() {
    const difference = touchStartX - touchEndX;
    if (difference > 50) {
      nextSlide(); // Swipe left
    } else if (difference < -50) {
      prevSlide(); // Swipe right
    }
  }
});
