const startButton = document.getElementById("startButton");
const startScreen = document.getElementById("startScreen");
const container = document.querySelector(".container");

const restartButton = document.createElement("button");
restartButton.textContent = "Restart";
restartButton.id = "restartButton";
Object.assign(restartButton.style, {
  position: "fixed",
  bottom: "40px",
  right: "40px",
  padding: "15px 30px",
  fontSize: "1.2rem",
  border: "none",
  borderRadius: "30px",
  background: "#d27e7eff",
  color: "#5a2727ff",
  cursor: "pointer",
  display: "none",
  transition: "transform 0.3s ease, background 0.3s ease"
});
restartButton.addEventListener("mouseenter", () => restartButton.style.transform = "scale(1.05)");
restartButton.addEventListener("mouseleave", () => restartButton.style.transform = "scale(1)");
document.body.appendChild(restartButton);

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

function startSequence() {
  restartButton.style.display = "none";
  const lines = document.querySelectorAll(".line");

  lines.forEach((line, lineIndex) => {
    const words = line.querySelectorAll(".word");

    words.forEach((word, wordIndex) => {
      word.style.opacity = "0";
      word.style.transform = "translateX(-200%)";
      word.style.animation = "none";
      setTimeout(() => {
        word.style.animation = "bounceInLeft 0.9s ease forwards";
        word.style.animationFillMode = "forwards";
      }, (lineIndex * 2500) + (wordIndex * 400));
    });
  });

  const totalDuration = (lines.length * 2500) + (lines[lines.length - 1].children.length * 400);
  setTimeout(() => restartButton.style.display = "block", totalDuration + 1000);
}

restartButton.addEventListener("click", startSequence);
