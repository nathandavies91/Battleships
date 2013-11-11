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
    remoteMediaStream: null,
    
    // Show local game board
    LocalGameBoard: function() {
        // Hide a few things
        $('h1').hide();
        $('#message').remove();
        
        // Stream properties
        var properties;
        if (this.localMediaStream)
            properties = {stream: this.localMediaStream.ObjectURL()};
        
        new GameBoard($.extend({id:'local',muted:true},properties));
        this.gridController.Resize();
    },
    
    // Show remote game board
    RemoteGameBoard: function() {
        // Stream properties
        var properties;
        if (this.remoteMediaStream)
            properties = {stream: this.remoteMediaStream.ObjectURL()}
        
        new GameBoard($.extend({id:'remote'},properties));
        this.gridController.Resize();
    }
}
