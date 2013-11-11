/**
 * Game.js
 * --------
 * Author & Copyright (c) 2013: Nathan Davies, www.nathandavies.co.uk
 */

function Game() {
    Trace.Information('New Game()');
    
    // Required resources
    Game.prototype.gridController = new GridController();
    this.localMediaStream = new LocalMediaStream();
    
    // Responsive grid
    $(window).on('resize', function() { Game.prototype.gridController.Resize(); });
    
    // Show the local player's game board
    this.LocalGameBoard();
    
    
    
    // TESTING
    this.RemoteGameBoard();
}

Game.prototype = {
    gridController: null,
    localMediaStream: null,
    
    // Show local game board
    LocalGameBoard: function() {
        $('h1').hide();
        $('#message').remove();
        
        new GameBoard({id:'local'});
        this.gridController.Resize();
    },
    
    // Show remote game board
    RemoteGameBoard: function() {
        new GameBoard({id:'remote'});
        this.gridController.Resize();
    }
}
