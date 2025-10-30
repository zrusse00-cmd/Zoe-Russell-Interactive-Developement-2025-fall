const startButton = document.getElementById("startButton");
const startScreen = document.getElementById("startScreen");
const container = document.querySelector(".container");

// Create Restart button (hidden initially)
const restartButton = document.createElement("button");
restartButton.textContent = "Restart";
restartButton.id = "restartButton";
restartButton.style.position = "fixed";
restartButton.style.bottom = "40px";
restartButton.style.right = "40px";
restartButton.style.padding = "15px 30px";
restartButton.style.fontSize = "1.2rem";
restartButton.style.border = "none";
restartButton.style.borderRadius = "30px";
restartButton.style.background = "#84d27e";
restartButton.style.color = "#275a32";
restartButton.style.cursor = "pointer";
restartButton.style.display = "none";
restartButton.style.transition = "transform 0.3s ease, background 0.3s ease";
restartButton.addEventListener("mouseenter", () => {
  restartButton.style.transform = "scale(1.05)";
});
restartButton.addEventListener("mouseleave", () => {
  restartButton.style.transform = "scale(1)";
});
document.body.appendChild(restartButton);

// Start button event
startButton.addEventListener("click", () => {
  startScreen.style.transition = "opacity 0.8s ease";
  startScreen.style.opacity = "0";

  setTimeout(() => {
    startScreen.style.display = "none";
    container.classList.remove("hidden");
    container.classList.add("show");
    startSequence();
  }, 800);
});

// Function to start animation sequence
function startSequence() {
  restartButton.style.display = "none"; // Hide restart while playing
  const lines = document.querySelectorAll(".line");

  lines.forEach((line, lineIndex) => {
    const words = line.querySelectorAll(".word");

    words.forEach((word, wordIndex) => {
      word.style.opacity = "0";
      word.style.transform = "translateX(200%)";
      word.style.animation = "none";
      setTimeout(() => {
        word.style.animation = "bounceInRight 0.9s ease forwards";
        word.style.animationFillMode = "forwards";
      }, (lineIndex * 2500) + (wordIndex * 400));
    });
  });

  // Show restart button after animation finishes
  const totalDuration =
    (lines.length * 2500) + (lines[lines.length - 1].children.length * 400);
  setTimeout(() => {
    restartButton.style.display = "block";
  }, totalDuration + 1000);
}

// Restart animation when clicked
restartButton.addEventListener("click", () => {
  startSequence();
});
