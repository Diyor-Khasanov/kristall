document.querySelectorAll(".faq-question").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.classList.toggle("active");
    const answer = btn.nextElementSibling;
    if (btn.classList.contains("active")) {
      answer.style.maxHeight = answer.scrollHeight + "px";
    } else {
      answer.style.maxHeight = null;
    }
  });
});
