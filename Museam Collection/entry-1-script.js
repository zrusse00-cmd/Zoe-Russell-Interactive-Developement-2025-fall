const startButton = document.getElementById("startButton");
const startScreen = document.getElementById("startScreen");
const container = document.querySelector(".container");

startButton.addEventListener("click", () => {
  // Fade out the start screen
  startScreen.style.transition = "opacity 0.8s ease";
  startScreen.style.opacity = "0";

  // After fade-out, hide it and show text container
  setTimeout(() => {
    startScreen.style.display = "none";
    container.classList.remove("hidden");
    container.classList.add("show");
    startSequence();
  }, 800);
});

function startSequence() {
  const lines = document.querySelectorAll(".line");

  lines.forEach((line, lineIndex) => {
    const words = line.querySelectorAll(".word");

    words.forEach((word, wordIndex) => {
      setTimeout(() => {
        word.style.animation = "bounceInRight 0.9s ease forwards";
        word.style.animationFillMode = "forwards";
      }, (lineIndex * 2500) + (wordIndex * 400));
    });
  });
}
