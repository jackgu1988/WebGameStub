// Setup requestAnimationFrame
requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||  
                        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 320;
canvas.height = 450;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "img/background.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "img/hero.png";

// Food image
var foodReady = false;
var foodImage = new Image();
foodImage.onload = function () {
	foodReady = true;
};
foodImage.src = "img/food.png";

// Game objects
var hero = {
	speed: 256, // movement in pixels per second
	weed: 32,
	high: 32
};
var food = {
	speed: 128, // movement in pixels per second
	weed: 32,
	high: 32
};
var foodsCaught = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a food
var reset = function () {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	// Throw the food somewhere on the screen randomly
	food.x = 32 + (Math.random() * (canvas.width - 64));
	food.y = 32 + (Math.random() * (canvas.height - 64));
};

// Update game objects
var update = function (modifier) {
	if (38 in keysDown) { // Player holding up
		if (hero.y > 0){
			hero.y -= hero.speed * modifier;
		} else {
			hero.y = 0;
		}
	}
	if (40 in keysDown) { // Player holding down
		
			if (hero.y <= canvas.height - hero.high){
				hero.y += hero.speed * modifier;
			} else {
				hero.y = canvas.height - hero.high;
			}
	}
	if (37 in keysDown) { // Player holding left
		if (hero.x > 0) {
			hero.x -= hero.speed * modifier;
		} else {
			hero.x = 0;
		}
	}
	if (39 in keysDown) { // Player holding right
		if (hero.x <= canvas.width - hero.weed){
			hero.x += hero.speed * modifier;
		} else {
			hero.x = canvas.width - hero.weed;
		}
	}

	// Are they touching?
	if (
		hero.x <= (food.x + 32)
		&& food.x <= (hero.x + 32)
		&& hero.y <= (food.y + 32)
		&& food.y <= (hero.y + 32)
	) {
		++foodsCaught;
		reset();
	}
};

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (foodReady) {
		ctx.drawImage(foodImage, food.x, food.y);
	}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
<<<<<<< HEAD
	ctx.fillText("Pizzas caught: " + foodsCaught, 32, 32);
=======
	ctx.fillText("Goblins caught: " + foodsCaught, 32, 32);
>>>>>>> 2120eaab041c611deccc21483a2b9d740be25898
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;
	requestAnimationFrame(main);
};

// Let's play this game!
reset();
var then = Date.now();
main();
