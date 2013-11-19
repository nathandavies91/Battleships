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
    this.localMediaStream = new LocalMediaStream();
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
                PeerHandler.Send({state:'initiation'});
                
                self.PeerHandlers();
            });
        }
        else {
            // Notify the peer that this game is full
            Trace.Information(connection.peer+' was rejected as game is full');
            connection.on('open', function() {
                connection.send(JSON.stringify({state:'gameisfull'}));
            });
        }
    });
    
    // Give the host user priority
    if (PeerHandler.connection)
        this.shooter.ToggleUsersTurn();
    
    // Responsive grid
    $(window).bind('resize', function() { self.gridController.Resize(); });
    
    // Are you sure you want to quit?
    $(window).bind('beforeunload', function() {
        return 'Navigating away from this page will destroy the game session.';
    });
}

Game.prototype = {
    // Game overview
    GameOver: function(state) {
        Trace.Information('Game over: local peer '+state);
        var self = this,
            ships = new Array();
        
        // Hide the turn identifier
        $('#turn').hide();
        
        // Update state
        PeerHandler.Local.UpdateState(state);
        
        // Update the score
        if (state == 'won') {
            this.localGameScore++;
            $('#local .score span:not(.title)').html(this.localGameScore);
        }
        else {
            this.remoteGameScore++;
            $('#remote .score span:not(.title)').html(this.remoteGameScore);
        }
        
        // Fade out
        $('.grid').fadeTo('slow', .4);
        
        // Who won/lost?
        $('.board').each(function() {
            $(this).append(Mustache.render(HTML.GameOverview(), {
                local: ($(this).attr('id') == 'local'),
                won: (state == 'won')
            }));
        });
        
        // Reveal ships to the peer
        $('.ship:not(.hit)').each(function() {
            ships[ships.length] = {
                x: $(this).index()+1,
                y: $(this).parent().index()+1
            };
        });
        if (ships.length) PeerHandler.Send({reveal:ships});
        
        // New round?
        $('#playagain').bind('click', function() {
            $(this).unbind('click').html('Waiting...');
            
            // Update peer state and request a new round
            PeerHandler.Local.UpdateState('playagain');
            self.NewRound();
        });
    },
    
    // Handle data
    HandleData: function(data) {
        // Parse data
        data = $.parseJSON(data);
        
        // State change
        if (data.state) {
            PeerHandler.Remote.UpdateState(data.state);
            
            // Play again request
            if (PeerHandler.Remote.state == 'playagain')
                this.NewRound();
            
            // If the remote peer is ready
            if (PeerHandler.Remote.IsReady()) {
                // Remove plotting notification and show the grid
                $('#remote .plotting').remove();
                $('#remote .grid').fadeIn('slow');
                
                // Initiate the shooter
                this.shooter.Initiate();
            }
        }
        
        // Missile
        if (data.missile && !this.shooter.IsUsersTurn())
            this.plotter.EnemyMissile(this, data.missile);
        
        // Missile result
        if (data.result) {
            // Is it game over?
            if (data.result == 'dead') {
                this.GameOver('won');
                data.result = 'hit';
            }
            
            // Sunk their battleship?
            if (data.shipDestroyed) {
                // SOON
            }
            
            this.shooter.Result(data);
        }
        
        // Reveal
        if (data.reveal)
            this.plotter.Reveal(data.reveal);
    },
    
    // Show local game board
    LocalGameBoard: function() {
        // Hide the heading
        $('h1').hide();
        
        // Update peer state
        PeerHandler.Local.UpdateState('plotting');
        
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
    
    // New round
    NewRound: function() {
        // Play again?
        if (PeerHandler.Local.state == 'playagain' && PeerHandler.Remote.state == 'playagain') {
            this.LocalGameBoard();
            this.RemoteGameBoard();
        }
    },
    
    // Peer handlers
    PeerHandlers: function() {
        var self = this;
        
        // Let remote peer know what state the local peer is in
        if (PeerHandler.Local.state)
            PeerHandler.Local.UpdateState(PeerHandler.Local.state);
        
        // Accept video call
        this.localMediaStream.VideoCall();
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
        // Who's turn is it?
        this.TurnIdentifier();
        
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
        if (PeerHandler.Remote.IsReady()) this.shooter.Initiate();
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
    
    // Who's turn is it?
    TurnIdentifier: function() {
        var turn = $('#turn');
        if (!turn.length)
            $('body').append(Mustache.render(HTML.TurnIdentifier()));
        else
            turn.show();
    }
}