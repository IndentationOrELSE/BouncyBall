canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");
canvas.width = window.innerWidth * 0.6;
canvas.height = canvas.width / 1.7;
var xArray = [];
var yArray = [];
var frames = 0;
let plot;
ball = {
	x: canvas.width / 2,
	y: canvas.height / 2,
	dx: 5,
	dy: 5,
	gravity: 0.5,
	bounciness: 1,
	radius: 10,
	maxDXorDY: 100,
};
function drawBall(ball) {
	c.beginPath();
	c.strokeStyle = "black";
	c.lineWidth = 2;
	c.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
	c.stroke();
	c.closePath();
}
function updateBall(ball) {
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
	frames++;
	// Check for max velocity and update display
	if (
		Math.abs(ball.dx) > ball.maxDXorDY ||
		Math.abs(ball.dy) > ball.maxDXorDY
	) {
		cancelAnimationFrame(myDraw);
		document.getElementById("filler").innerHTML = "broken.";
	} else {
		document.getElementById("filler").innerHTML = "working!";
	}
	xArray.push(ball.frames);
	console.log(ball.dx);
	yArray.push(ball.dy);
}

function resizeCanvas() {
	canvas.width = window.innerWidth * 0.6;
	canvas.height = canvas.width / 1.7;
}
function plotIt(xArray, yArray) {
  const data = [
    {
      x: xArray,
      y: yArray,
      type: "line",
      orientation: "v",
      mode: "markers"
    },
  ];

  const layout = { 
	title: "Speeeed",
	xaxis: {title: "Frame"},
	yaxis: {title: "Speed"}
};

  plot = Plotly.newPlot("thePlot", data, layout);
}

function updatePlot(xArray, yArray) {
  const data = [
    {
      x: xArray,
      y: yArray,
    },
  ];

  Plotly.update("thePlot", data);
}

function draw() {
  resizeCanvas();
  c.clearRect(0, 0, canvas.width, canvas.height);
  updateBall(ball);
  drawBall(ball);
  if (!plot) {
    plotIt(xArray, yArray);
  } else {
    updatePlot(xArray, yArray);
  }
  myDraw = requestAnimationFrame(draw);
}
draw();
