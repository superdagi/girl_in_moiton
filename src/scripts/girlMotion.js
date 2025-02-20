const sprite = document.querySelector('.sprite');

// Listen for 'D' key or right arrow key press
document.addEventListener('keydown', (event) => {
  if (event.key === "d" || event.key === "ArrowRight") {
    sprite.classList.add('walking'); // Start the walking animation
  }
});

// Optionally, stop walking animation when the key is released
document.addEventListener('keyup', (event) => {
  if (event.key === "d" || event.key === "ArrowRight") {
    sprite.classList.remove('walking'); // Stop the walking animation
  }
});
