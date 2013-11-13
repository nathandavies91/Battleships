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
    if (PeerHandler.connection) this.PeerHandlers();
    PeerHandler.peer.on('connection', function(connection) {
        if (!PeerHandler.connection) {
            // Store the connection
            PeerHandler.connection = connection;
            Trace.Information('Peer has connected: '+PeerHandler.connection.peer);
            Game.prototype.PeerHandlers();
            
            // Show the other player's game board
            Game.prototype.RemoteGameBoard();
        }
    });
    
    // Are you sure you want to quit?
    $(window).bind('beforeunload', function() {
        return 'Navigating away from this page will destroy the game session.';
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
    
    // Peer handlers
    PeerHandlers: function() {
        // Lost connection with peer
        PeerHandler.connection.on('close', function() { PeerHandler.Disconnected(); });
        
        // Error occurred with the connection
        PeerHandler.connection.on('error', function(error) { PeerHandler.Error(error); });
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