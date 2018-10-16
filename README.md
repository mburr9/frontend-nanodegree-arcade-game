# Frogger Game Project

## Table of Contents

* [Dependencies](#dependencies)
* [Game Description](#gamedescription)
* [How to Play](#howtoplay)
* [Winning the Game](#winningthegame)

## Dependencies

This game depends on a Bootstrap font link as well as jQuery script in the header of your HTML.

## Game Description

Players move their player sprite from the grass to the water avoiding making any contact with enemy bugs. Players start with 3 lives and lose a life after contact with an enemy bug. Three instances of contact with an enemy bug will result in a game over. If the player successfully reaches the water 5 times before losing all three lives they beat the game.

## How to Play

To load the game, open index.html in your browser. Game starts by having the player use the right and left arrow keys to change their player sprite to the desired look. After choosing a sprite and hitting enter gameplay starts. Player uses left, right, up, and down arrow keys to move their player. Contact with an enemy bug will return the player to the start position. Reaching the water will also return the player to the start position.

## Winning the Game

The game is won when the player reaches the water 5 times without losing all three lives. At this point there is a pop up congratulating the player for winning, displaying their remaining lives, the time it took to complete the game, and asking if they'd like to play again. If player clicks ok the game will reload and if they click cancel they will be left with the completed winning game board.
