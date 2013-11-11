/**
 * Game.js
 * --------
 * Author & Copyright (c) 2013: Nathan Davies, www.nathandavies.co.uk
 */

function Game() {
    Trace.Information('New Game()');
    
    // Required resources
    this.gridController = new GridController();
    this.localMediaStream = new LocalMediaStream();
    
    // Responsive grid
    $(window).on('resize', function() {
        // Nasty work around, JavaScript wouldn't let me just call gridController.Resize();
        new GridController(true).Resize();
    });
    
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