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
    $(window).bind('resize', function() { Game.prototype.gridController.Resize(); });
    
    // Show the local player's game board
    this.LocalGameBoard();
    
    // Show an invite screen, unless already in a lobby
    if (!PeerHandler.connection) {
        $('body').append(Mustache.render(HTML.InviteScreen(), {
            session: Location.url + '?session=' + PeerHandler.peer.id
        }));
        
        // Copy link
        $('#invitelink').zclip({
            path: './js/lib/zclip.swf',
            copy: $('#invitelink p').html(),
            afterCopy: function() {
                $('#invitelink .copy').html('Copied');
            }
        });
    }
    else
        this.RemoteGameBoard();
    
    // Peer connection
    PeerHandler.peer.on('connection', function(connection) {
        // Store the connection
        PeerHandler.connection = connection;
        Trace.Information('Peer has connected: '+PeerHandler.peer.id);
        
        // Show the other player's game board
        Game.prototype.RemoteGameBoard();
        
        // Lost connection with peer
        PeerHandler.connection.on('close', function() { PeerHandler.Disconnected(); });
    });
    
    // Are you sure you want to quit?
    $(window).bind('beforeunload', function() {
        return 'Navigating away from this page will destroy the game session.';
    });
    
    // Destroy the peer session when the window has been unloaded
    $(window).unload(function() {
        PeerHandler.peer.destroy();
    });
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