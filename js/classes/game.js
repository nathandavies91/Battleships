/**
 * Game.js
 * --------
 * Author & Copyright (c) 2013: Nathan Davies, www.nathandavies.co.uk
 */

function Game() {
    Trace.Information('New Game()');
    
    // Variables
    var localGameBoard;
    
    // Show the local player's game board
    $('h1').hide();
    localGameBoard = new GameBoard('local');
}