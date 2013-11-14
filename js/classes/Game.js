/**
 * Game.js
 * --------
 * Author & Copyright (c) 2013: Nathan Davies, www.nathandavies.co.uk
 */

function Game() {
    Trace.Information('New Game()');
    
    // Stop the loader
    Loader.Stop();
    
    // Required resources
    Game.prototype.gridController = new GridController();
    Game.prototype.localMediaStream = new LocalMediaStream();
    
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
            
            // Open the connection and show the remote game board
            PeerHandler.connection.on('open', function() {
                Trace.Information('Peer has connected: '+PeerHandler.connection.peer);
                connection.send({state:'initiation'});
                
                Game.prototype.PeerHandlers();
                Game.prototype.RemoteGameBoard();
            });
        }
        else {
            // Notify the peer that this game is full
            Trace.Information(connection.peer+' was rejected as game is full');
            connection.on('open', function() {
                connection.send({state:'gameisfull'});
            });
        }
    });
    
    // Are you sure you want to quit?
    $(window).bind('beforeunload', function() {
        return 'Navigating away from this page will destroy the game session.';
    });
}

Game.prototype = {
    gridController: null,
    localGameScore: 0,
    localMediaStream: null,
    plotter: null,
    remoteGameScore: 0,
    remoteMediaStream: null,
    
    // Show local game board
    LocalGameBoard: function() {
        // Hide the heading
        $('h1').hide();
        
        // Stream properties
        var properties;
        if (this.localMediaStream)
            properties = {stream: this.localMediaStream.ObjectURL()};
        
        new GameBoard($.extend({
            id: 'local',
            muted: true,
            score: this.localGameScore
        }, properties));
        this.gridController.Resize();
        
        // Plot ships
        this.plotter = new Plotter();
    },
    
    // Peer handlers
    PeerHandlers: function() {        
        // Accept video call
        this.VideoCall();
        PeerHandler.peer.on('call', function(call) {
            PeerHandler.call = call;
            PeerHandler.call.answer();
            PeerHandler.call.on('stream', function(stream) {
                Game.prototype.remoteMediaStream = new RemoteMediaStream(stream);
            });
        });
        
        // Handle received data
        PeerHandler.connection.on('data', function(data) {
            //
        });
        
        // Lost connect, or an error occurred
        PeerHandler.connection.on('close', function() { PeerHandler.Disconnected(); });
        PeerHandler.connection.on('error', function(error) { PeerHandler.Error(error); });
    },
    
    // Show remote game board
    RemoteGameBoard: function() {
        // Stream properties
        var properties;
        if (this.remoteMediaStream)
            properties = {stream: this.remoteMediaStream.ObjectURL()}
        
        new GameBoard($.extend({
            id: 'remote',
            score: this.remoteGameScore
        }, properties));
        this.gridController.Resize();
    },
    
    // Video call
    VideoCall: function() {
        if (this.localMediaStream && PeerHandler.connection) {
            Trace.Information('Sending media stream to remote peer...');
            PeerHandler.peer.call(PeerHandler.connection.peer, Game.prototype.localMediaStream.stream);
        }
    }
}