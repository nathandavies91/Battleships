/**
 * Game.js
 * --------
 * Author & Copyright (c) 2013: Nathan Davies, www.nathandavies.co.uk
 */

function Game() {
    Trace.Information('New Game()');
    
    // Show the local player's game board
    $('h1').hide();
    new GameBoard('local');
    new GameBoard('remote'); // TESTING
}