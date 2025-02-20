
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Load the sprite sheet
const spriteSheet = new Image();
spriteSheet.src = '../sprites/girl/girl_sprite.png'; // Path to your sprite sheet
const frameWidth = 64; // Width of one walking frame
const frameHeight = 96; // Height of one walking frame
const totalFrames = 4; // Number of frames in the walking animation
let currentFrame = 0;

// Position of the sprite on the canvas
let x = 100;
let y = canvas.height - frameHeight - 50; // Keeping it above the bottom edge

// Listen for key events to trigger walking animation
document.addEventListener('keydown', (event) => {
  if (event.key === "d" || event.key === "ArrowRight") {
    animateWalking();
  }
});

document.addEventListener('keyup', (event) => {
  if (event.key === "d" || event.key === "ArrowRight") {
    currentFrame = 0; // Stop animation when key is released
    draw(); // Redraw the sprite at the first frame
  }
});

// Draw function to render the sprite
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  ctx.drawImage(
    spriteSheet,
    currentFrame * frameWidth,  // x position of the current frame in sprite sheet
    0,                          // y position (all frames are in the first row)
    frameWidth,                 // Width of a single frame
    frameHeight,                // Height of a single frame
    x,                          // x position on canvas
    y,                          // y position on canvas
    frameWidth,                 // Width to draw
    frameHeight                 // Height to draw
  );
}

// Walking animation function
function animateWalking() {
  currentFrame = (currentFrame + 1) % totalFrames; // Loop through the frames
  draw();
  setTimeout(animateWalking, 100); // Update every 100ms for smooth animation
}

spriteSheet.onload = function() {
  draw(); // Draw the first frame once the sprite sheet is loaded
};
