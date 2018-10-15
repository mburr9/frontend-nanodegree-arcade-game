// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x; //sets enemy x coordinate
    this.y = y; // sets enemy y coordinate
    this.possibleSpeeds = [50, 100, 125, 150];
    this.speed = this.possibleSpeeds[Math.floor(Math.random() * this.possibleSpeeds.length)]; //sets enemy speed by choosing a random speed from possibleSpeeds array
    this.resetSpeed = function() { // re-randomizes enemy speed
      this.speed = this.possibleSpeeds[Math.floor(Math.random() * this.possibleSpeeds.length)];
    }
    this.moveEnemy = function(dt) { //checks if moving enemy will place them off screen. If so resets them to initial x coordinate. If not moves them forward
      if ((this.x += this.speed * dt) > 505) {
        this.x = x;
        this.resetSpeed();
      } else {
        this.x += this.speed * dt;
      }
    }
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  this.moveEnemy(dt);
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let i = 0; //index to be used in charSelect function below
var Player = function() {
  this.sprite = 'images/char-boy.png';
  this.x = 202;
  this.y = 382;
  this.allPlayers = ['images/char-boy.png', 'images/char-cat-girl.png', 'images/char-horn-girl.png', 'images/char-pink-girl.png', 'images/char-princess-girl.png']
  this.charLocked = false; //sets initial locked state to false meaning player has not selected their character yet
  this.charSelect = function(key) {
    switch(key) {
      case 'left': //cycles through allPlayers array so player can see character choices
        if (i === 0) {
          i += 4;
        } else {
          i -= 1;
        };
        this.sprite = this.allPlayers[i];
        break;
      case 'right': //cycles through allPlayers array so player can see character choices
        if (i === 4) {
          i -= 4;
        } else {
          i += 1;
        };
        this.sprite = this.allPlayers[i];
        break;
      case 'enter': // changes locked state to true meaning player selected character and game can start. Changes instructions on screen from character select instructions to game play instructions
        this.charLocked = true;
        $('.instructions').html('Reach the water 5 times without losing all 3 lives to win the game');
        break;
    }
  }
};

Player.prototype.update = function(dt) {
  checkCollision();

};

Player.prototype.render = function() {
 ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
let score = 0;
/**
 * @description Checks if the keypress was up, down, left, or right and moves the player that direction one grid space as long as that doesn't move the player off the board
 * @param {string} arrow
 */
Player.prototype.handleInput = function(arrow) {
  switch(arrow) {
    case 'up':
      if (this.y <= 50) {
        this.x = 202;
        this.y = 382;
        score += 1; //keeps track of how many times player reaches the water
        $(".score").html(score); //modifies the score onscreen
        if (score === 5) { //checks if player reached the water 5 times and if so calls gameWon function
          gameWon();
        }
      } else {
        this.y -= 83;
      };
      break;
    case 'down':
      if (this.y < 382) {
        this.y += 83;
      };
      break;
    case 'left':
      if (this.x > 0) {
        this.x -= 101;
      };
      break;
    case 'right':
      if (this.x < 404) {
        this.x += 101;
      };
  }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [new Enemy(-100,50),
                  new Enemy(-100,133),
                  new Enemy(-100,216),
                  new Enemy(-275,50),
                  new Enemy (-275,133),
                  new Enemy (-275,216)];
let player = new Player();

let sec = 0;
let min = 0;
const start = setInterval (timer, 1000); //starts a game clock

/**
* @description Adds the HTML for the timer to display on the page
*/
function timer() {
  $(".seconds").html(addZero(sec<59 ? ++sec : sec = 0));
  $(".minutes").html(addZero(parseInt(sec === 59 ? min++ : min)));
};

/**
* @description Stops the timer running on the page
*/
function stopTimer() {
  clearInterval (start);
}

/**
* @description Adds a "0" in front of a number if the number is 9 or less
* @param {number} num
* @returns {number} num or the string "0" followed by num
*/
function addZero ( num ) {
  if (num > 9) {
    return num;
  } else {
    return "0" + num;
  }
};

$('.restart').click(function() { //event listener for user clicking on restart button that will run the restart function if clicked
  restart();
});

/**
* @description Reloads the page
*/
function restart() {
  location.reload();
};

let lives = 3;
/**
 * @description checks if the player sprite and the enemy sprite are touching and if so moves the player back to start, removes a heart from screen, and checks if player is out of lives
 */
function checkCollision() {
  for (enemy of allEnemies) {
    if (enemy.y === player.y && (enemy.x + 70 > player.x && enemy.x < player.x + 70)) {
      player.x = 202;
      player.y = 382;
      $('.fa-heart').last().toggleClass('fa-heart'); //removes heart from the screen
      lives -= 1; //decreases lives remaining by 1
      if (lives === 0) { //checks if player is out of lives and calls gameOver function if so
        gameOver();
      };
    };
  };
};

/**
* @description Stops the timer. Initiates a popup saying game over and asks if user wants to play again. Reloads page if user clicks ok.
*/
function gameOver() {
  stopTimer();
  if (confirm(`Game Over: You Lose!
Click OK to play again`)) {
    location.reload();
  }
};

/**
* @description Stops the timer. Initiates a popup with game stat information that asks if user wants to play again. Reloads page if user clicks ok.
*/
function gameWon() {
  stopTimer();
  const livesRemaining = $('.fa-heart').length;
  if (confirm(`You won!
Lives Remaining: ${livesRemaining}
Time ${addZero(min)}:${addZero(sec)}
Click OK to play again`)) {
    location.reload();
  }
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        13: 'enter',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    if (!player.charLocked) {
      player.charSelect(allowedKeys[e.keyCode]);
    } else {
      player.handleInput(allowedKeys[e.keyCode]);
    };
});
