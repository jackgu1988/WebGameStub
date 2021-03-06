// Setup requestAnimationFrame
requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||  
                        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

// Hero moving
var startMoving = false;

// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "img/background.png";
bgImage.style.width = canvas.width + "px";
bgImage.style.height = canvas.height + "px";

// Game over image
var goReady = false;
var goImage = new Image();
goImage.onload = function () {
	goReady = true;
};
goImage.src = "img/gameover.png";

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

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "img/monster.png";

// Game objects
var hero = {
	speed: 256, // movement in pixels per second
	weed: 32,
	high: 32,
	lives: 10
};
var food = {
	high: 32,
	weed: 32
};
var foodsCaught = 0;

var monster = {
	speed: 64,
	weed: 32,
	high: 32
}

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
	startMoving = false;
	
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	// Throw the food somewhere on the screen randomly
	food.x = 32 + (Math.random() * (canvas.width - 64));
	food.y = 32 + (Math.random() * (canvas.height - 64));

	// Throw the monster somewhere on the screen randomly
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));
};

// Update game objects
var update = function (modifier) {

	if (startMoving) {
		if (monster.x > hero.x) {
			monster.x -= monster.speed * modifier;
		} else {
			monster.x += monster.speed * modifier;
		}

		if (monster.y > hero.y) {
			monster.y -= monster.speed * modifier;
		} else {
			monster.y += monster.speed * modifier;
		}
	}

	if (38 in keysDown) { // Player holding up
		startMoving = true;
		if (hero.y > 0){
			hero.y -= hero.speed * modifier;
		} else {
			hero.y = 0;
		}
	}
	if (40 in keysDown) { // Player holding down
		startMoving = true;
		if (hero.y <= canvas.height - hero.high){
			hero.y += hero.speed * modifier;
		} else {
			hero.y = canvas.height - hero.high;
		}
	}
	if (37 in keysDown) { // Player holding left
		startMoving = true;
		if (hero.x > 0) {
			hero.x -= hero.speed * modifier;
		} else {
			hero.x = 0;
		}
	}
	if (39 in keysDown) { // Player holding right
		startMoving = true;
		if (hero.x <= canvas.width - hero.weed){
			hero.x += hero.speed * modifier;
		} else {
			hero.x = canvas.width - hero.weed;
		}
	}

	// Food and hero touching?
	if (
		hero.x <= (food.x + 32)
		&& food.x <= (hero.x + 32)
		&& hero.y <= (food.y + 32)
		&& food.y <= (hero.y + 32)
	) {
		++foodsCaught;
		reset();
	}

	// Hero and monster touching?
	if (
		hero.x <= (monster.x + 32)
		&& monster.x <= (hero.x + 32)
		&& hero.y <= (monster.y + 32)
		&& monster.y <= (hero.y + 32)
	) {
		--hero.lives;
		reset();
	}
};

// Draw everything
var render = function () {

	if (hero.lives != 0) {

		if (bgReady) {
			ctx.drawImage(bgImage, 0, 0);
		}
	
		if (heroReady) {
			ctx.drawImage(heroImage, hero.x, hero.y);
		}
	
		if (foodReady) {
			ctx.drawImage(foodImage, food.x, food.y);
		}
		
		if (monsterReady) {
			ctx.drawImage(monsterImage, monster.x, monster.y);
		}
	
		// Score
		ctx.fillStyle = "rgb(250, 250, 250)";
		ctx.font = "12px Helvetica";
		ctx.textAlign = "left";
		ctx.textBaseline = "top";
		ctx.fillText("Pizzas caught: " + foodsCaught + " Lives: " + hero.lives, 32, 32);
	
	} else {
		ctx.drawImage(goImage, 0, 0);
	}
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
