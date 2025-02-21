console.log("girlMotion.js is loaded");

window.onload = function () {
  console.log("window.onload triggered");

  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");

  // Load the sprite sheet
  const spriteSheet = new Image();
  spriteSheet.src = "src/sprites/girl/girl_sprite.png"; // Path to your sprite sheet

  let walkTimeout = null; // Variable to store the timeout ID
  let offsetX = 0; // X offset for the background to create a moving effect
  let speed = 2; // Speed of background movement
  let direction = 1; // 1 for right, -1 for left

  spriteSheet.onload = function () {
    console.log("Sprite sheet loaded successfully");

    const frameWidth = 148;
    const frameHeight = 160;
    const totalFrames = 6;
    let currentFrame = 0;

    let x = 100;
    let y = canvas.height - frameHeight - 40; // Lower the character a bit from the default position

    // Listen for key events to trigger walking animation
    document.addEventListener("keydown", (event) => {
      if (event.key === "d" || event.key === "ArrowRight") {
        direction = 1; // Walk right
        if (walkTimeout === null) {
          animateWalking();
        }
      } else if (event.key === "a" || event.key === "ArrowLeft") {
        direction = -1; // Walk left
        if (walkTimeout === null) {
          animateWalking();
        }
      }
    });

    document.addEventListener("keyup", (event) => {
      if (
        event.key === "d" ||
        event.key === "ArrowRight" ||
        event.key === "a" ||
        event.key === "ArrowLeft"
      ) {
        clearTimeout(walkTimeout); // Stop the walking animation
        walkTimeout = null; // Reset timeout variable
        currentFrame = 0; // Reset frame to the first one
        draw(); // Redraw the sprite at the first frame
      }
    });

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawSunsetBackground(); // Draw the sunset gradient background
      drawBackground("blue", 10, offsetX + 95, 1000); // Draw the dynamic background
      drawBackground("#6EC1E4", 80, offsetX * 2, canvas.width); // Draw the dynamic background

      ctx.save(); // Save the current context

      if (direction === -1) {
        ctx.scale(-1, 1); // Flip the sprite horizontally for walking left
        ctx.translate(-frameWidth - x * 2, 0); // Adjust translation after flipping to keep the character in position
      }

      ctx.drawImage(
        spriteSheet,
        currentFrame * frameWidth,
        0,
        frameWidth,
        frameHeight,
        x,
        y,
        frameWidth,
        frameHeight
      );

      ctx.restore(); // Restore the context to undo flipping
    }

    function drawSunsetBackground() {
      // Create a gradient for the sunset background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "#4B0082"); // Dark purple at the top
      gradient.addColorStop(0.3, "#800080"); // Deep purple
      gradient.addColorStop(0.6, "#FF6347"); // Muted red-orange
      gradient.addColorStop(1, "#FF4500"); // Muted orange at the bottom

      // Apply gradient to the entire background
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    function drawBackground(color, height = 80, offset, width = canvas.width) {
      // Background with irregular sine waves using multiple frequencies and amplitudes
      ctx.fillStyle = color; // Background color (can be adjusted)
      ctx.beginPath();
      for (let i = 0; i < canvas.width; i++) {
        // Use sin/cos to generate an irregular background effect with different frequencies and amplitudes
        // Vertical position is now fixed by canvas.height / 2 + 60
        let yPos =
          Math.sin(i / 100 + offset) * 50 + // Primary sine wave
          //   Math.sin(i / 200 + 1) * 50 + // Secondary sine wave with different frequency and amplitude
          //   Math.sin(i / 50 + 1) * 50 + // Third sine wave for more irregularity
          canvas.height / 2 +
          height; // Center position of the waves (fixed vertical position)

        ctx.lineTo(i, yPos);
      }
      ctx.lineTo(canvas.width, canvas.height - 60); // Bottom line (adjusted to be lower for ground)
      ctx.lineTo(0, canvas.height - 60); // Bottom line (adjusted to be lower for ground)
      ctx.closePath();
      ctx.fill();

      // Draw the ground (green part)
      ctx.fillStyle = "green"; // Green ground color
      ctx.fillRect(0, canvas.height - 60, canvas.width, 60); // Ground area
    }

    function animateWalking() {
      currentFrame = (currentFrame + 1) % totalFrames;
      draw();
      offsetX += speed * direction * 0.05; // Update the background position based on walking speed

      // Ensure offsetX loops smoothly by resetting when it gets too large
      if (offsetX > canvas.width) {
        offsetX = 0;
      }

      walkTimeout = setTimeout(animateWalking, 100); // Store the timeout ID to control the animation
    }

    draw(); // Draw the first frame once the sprite sheet is loaded
  };

  spriteSheet.onerror = function () {
    console.log("Error loading sprite sheet.");
  };
};
