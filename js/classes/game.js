/**
 * Game.js
 * --------
 * Author & Copyright (c) 2013: Nathan Davies, www.nathandavies.co.uk
 */

function Game() {
    Trace.Information('New Game()');
    
    // User's media
    this.localMediaStream = new LocalMediaStream();
    
    // Show the local player's game board
    this.LocalGameBoard();
}

Game.prototype = {
    localMediaStream: null,
    
    // Show local game board
    LocalGameBoard: function() {
        $('h1').hide();
        new GameBoard({id:'local'});
    }
}