// Canvas setup
const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");
canvas.width = window.innerWidth * 0.6;
canvas.height = canvas.width / 1.7;

// Arrays to store data for plotting
const xArray = [];
const yArray = [];
let frames = 0;
let plot;

// Ball object
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    dx: 5,
    dy: 5,
    gravity: 0.5,
    bounciness: 1.01,
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
    if (ball.x >= canvas.width - ball.radius || ball.x <= ball.radius) {
        ball.dx = -ball.dx * ball.bounciness;
    }
    if (ball.y <= ball.radius) {
        ball.dy = -ball.dy * ball.bounciness;
        ball.y = ball.radius;
    } else if (ball.y >= canvas.height - ball.radius) {
        ball.dy = -ball.dy * ball.bounciness;
        ball.y = canvas.height - ball.radius;
    } else {
        ball.dy += ball.gravity;
    }

    // Update position
    ball.x += ball.dx;
    ball.y += ball.dy;

    frames++;

    // Check for max velocity and update display
    if (Math.abs(ball.dx) > ball.maxDXorDY || Math.abs(ball.dy) > ball.maxDXorDY) {
        cancelAnimationFrame(myDraw);
        document.getElementById("filler").innerHTML = "broken.";
    } else {
        document.getElementById("filler").innerHTML = "working!";
    }

    // Store data for plotting
    xArray.push(frames);
    yArray.push(Math.sqrt(ball.dx * ball.dx + ball.dy * ball.dy)); // Calculate speed
}

function resizeCanvas() {
    canvas.width = window.innerWidth * 0.6;
    canvas.height = canvas.width / 1.7;
}

function plotIt(xArray, yArray) {
    const data = [{
        x: xArray,
        y: yArray,
        type: "scatter",
        mode: "lines+markers"
    }];

    const layout = {
        title: "Ball Speed Over Time",
        xaxis: {title: "Frame"},
        yaxis: {title: "Speed"}
    };

    Plotly.newPlot("thePlot", data, layout);
}

function updatePlot(xArray, yArray) {
    Plotly.update("thePlot", {
        x: [xArray],
        y: [yArray]
    });
}

let myDraw;

function draw() {
    resizeCanvas();
    c.clearRect(0, 0, canvas.width, canvas.height);
    updateBall(ball);
    drawBall(ball);

    if (!plot) {
        plotIt(xArray, yArray);
        plot = true;
    } else {
        updatePlot(xArray, yArray);
    }

    myDraw = requestAnimationFrame(draw);
}

draw();