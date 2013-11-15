/**
 * Game.js
 * --------
 * Author & Copyright (c) 2013: Nathan Davies, www.nathandavies.co.uk
 */

var Game = function() {
    Trace.Information('New Game()');
    var self = this;
    
    // Stop the loader
    Loader.Stop();
    
    // Properties
    this.localGameScore = 0;
    this.remoteGameScore = 0;
    
    // Required resources
    this.gridController = new GridController();
    this.localMediaStream = new LocalMediaStream(self);
    this.shooter = new Shooter();
    
    // Show the local player's game board
    this.LocalGameBoard();
    
    // Show an invite screen, unless already in a lobby
    if (!PeerHandler.connection)
        this.ShowInviteScreen();
    
    // Peer connection and handlers
    if (PeerHandler.connection) this.PeerHandlers();
    PeerHandler.peer.on('connection', function(connection) {
        if (!PeerHandler.connection) {
            // Store the connection
            PeerHandler.connection = connection;
            
            // Open the connection and show the remote game board
            PeerHandler.connection.on('open', function() {
                Trace.Information('Peer has connected: '+PeerHandler.connection.peer);
                connection.send({state:'initiation'});
                
                self.PeerHandlers();
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
    
    // Responsive grid
    $(window).bind('resize', function() { self.gridController.Resize(); });
    
    // Are you sure you want to quit?
    $(window).bind('beforeunload', function() {
        return 'Navigating away from this page will destroy the game session.';
    });
}

Game.prototype = {
    // Handle data
    HandleData: function(data) {
        // State change
        if (data.state) {
            PeerHandler.Remote.UpdateState(data.state);
            
            // If the remote peer is ready
            if (PeerHandler.Remote.IsReady()) {
                // Remove plotting notification and show the grid
                $('#remote .plotting').remove();
                $('#remote .grid').fadeIn('slow');
                
                // Initiate the shooter
                Shooter.prototype.Initiate();
            }
        }
        
        // Missile
        if (data.missile && !Shooter.prototype.IsUsersTurn()) {
            // Toggle user's turn
            Shooter.prototype.ToggleUsersTurn();
        }
    },
    
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
        
        // Update the local state
        PeerHandler.Local.UpdateState('plotting');
    },
    
    // Peer handlers
    PeerHandlers: function() {
        var self = this;
        
        // Let remote peer know what state the local peer is in
        if (PeerHandler.Local.state)
            PeerHandler.Local.UpdateState(PeerHandler.Local.state);
        
        // Accept video call
        this.VideoCall();
        PeerHandler.peer.on('call', function(call) {
            PeerHandler.call = call;
            PeerHandler.call.answer();
            PeerHandler.call.on('stream', function(stream) {
                self.remoteMediaStream = new RemoteMediaStream(stream);
            });
        });
        
        // Handle received data, lost connection or error
        PeerHandler.connection.on('data', function(data) { self.HandleData(data); });
        PeerHandler.connection.on('close', function() { PeerHandler.Disconnected(); });
        PeerHandler.connection.on('error', function(error) { PeerHandler.Error(error); });
        
        // Show the game board?
        this.RemoteGameBoard();
    },
    
    // Show remote game board
    RemoteGameBoard: function() {
        // Stream properties
        var properties;
        if (this.remoteMediaStream)
            properties = {stream: this.remoteMediaStream.ObjectURL()}
        
        new GameBoard($.extend({
            id: 'remote',
            score: this.remoteGameScore,
            ready: PeerHandler.Remote.IsReady()
        }, properties));
        this.gridController.Resize();
        
        // If the user is ready, initiate the shooter
        if (PeerHandler.Remote.IsReady()) Shooter.prototype.Initiate();
    },
    
    // Show invite screen
    ShowInviteScreen: function() {
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
    },
    
    // Video call
    VideoCall: function() {
        var self = this;
        if (this.localMediaStream && PeerHandler.connection) {
            Trace.Information('Sending media stream to remote peer...');
            PeerHandler.peer.call(PeerHandler.connection.peer, self.localMediaStream.stream);
        }
    }
}