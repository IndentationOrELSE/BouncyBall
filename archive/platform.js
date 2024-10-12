// This is kinda glitchy
canvas = document.getElementById("canvas");
var c = canvas.getContext("2d")
canvas.width = window.innerWidth * 0.6;
canvas.height = canvas.width / 1.7;
ball = {
  x: canvas.width/2,
  y: canvas.height/2,
  dx: 5,
  dy: 5,
  gravity: 0.5,
  bounciness: 1,
  radius: 10,
  maxDXorDY: 100
}
platform = {
  x: 150,
  y: 200,
  width: 150,
  height: 400,
  dx: 3
}
function drawBall(ball){
  c.beginPath();
  c.strokeStyle = "black";
  c.lineWidth = 2;
  c.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  c.stroke();
  c.closePath();
}
function drawPlatform(platform){
  c.beginPath();
  c.strokeStyle = "black";
  c.fillStyle = "black";
  c.rect(platform.x, platform.y, platform.width, platform.height)
  c.stroke();
  c.closePath()
}
function updateBall(ball) {
	// Check for collision with the platform
	if (ball.x + ball.radius >= platform.x &&
		ball.x - ball.radius <= platform.x + platform.width){
			ball.dx = -ball.dx * ball.bounciness; // Reverse and apply bounciness
		}
	if (ball.y + ball.radius >= platform.y && // Bottom of the ball is below the top of the platform
		platform.y + platform.height >= ball.y &&
		ball.x + ball.radius >= platform.x &&
		ball.x - ball.radius <= platform.x + platform.width) { // Top of the ball is above the bottom of the platform
		ball.dy = -ball.dy * ball.bounciness; // Reverse and apply bounciness
	}
  
	// Check for collision with the canvas edges
	if (ball.x >= canvas.width || ball.x <= 0) {
	  ball.dx = -ball.dx * ball.bounciness; // Reverse direction on horizontal edges
	} else if (ball.y <= 0) {
	  ball.dy = -ball.dy * ball.bounciness; // Reverse direction on the top edge
	  ball.y = 0; // Reset ball position to top edge
	} else if (ball.y >= canvas.height - ball.radius) {
	  ball.dy = -ball.dy * ball.bounciness; // Reverse direction on the bottom edge
	  ball.y = canvas.height - ball.radius; // Reset ball position to bottom edge
	} else {
	  ball.dy += ball.gravity; // Apply gravity
	}
  
	// Update position
	ball.x += ball.dx;
	ball.y += ball.dy;
  
	// Check for max velocity and update display
	if (Math.abs(ball.dx) > ball.maxDXorDY || Math.abs(ball.dy) > ball.maxDXorDY) {
	  cancelAnimationFrame(myDraw);
	  document.getElementById("filler").innerHTML = 'broken.';
	} else {
	  document.getElementById("filler").innerHTML = 'working!';
	}
  }

function updatePlatform(platform){
  platform.x += platform.dx;
  if (platform.x + platform.width >= canvas.width || platform.x <= 0){
    platform.dx = -platform.dx;
  }
}
function draw(){
  c.clearRect(0, 0, canvas.width, canvas.height);
  updateBall(ball)
  drawBall(ball)
  updatePlatform(platform)
  drawPlatform(platform)
  myDraw = requestAnimationFrame(draw)
}
draw();