const box = document.getElementById("responsiveBox");

// Function to update the border color based on window width
function updateBorderColor() {
  const width = window.innerWidth;
  if (width > 1000) {
    box.style.borderColor = "#000000ff"; // Blue
  } else if (width > 700) {
    box.style.borderColor = "#000000ff"; // Pink
  } else {
    box.style.borderColor = "#000000ff"; // Yellow
  }
}

// Run once on load
updateBorderColor();

// Update when the window is resized
window.addEventListener("resize", updateBorderColor);