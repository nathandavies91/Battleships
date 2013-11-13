/**
 * init.js
 * -------
 * Author & Copyright (c) 2013: Nathan Davies, www.nathandavies.co.uk
 */

jQuery(function($) {
    // Elements
    var heading = $('h1'),
        message,
        start;
    
    // Level of logging
    if (!isNaN(URLParameters.log))
        Utilities.Trace.level = URLParameters.log;
    
    // Remove body scripts
    $('body script').remove();
    
    // Show the start button
    start = $(Mustache.render(HTML.div,{id:'start',content:'Start'})).insertAfter(heading);
    start.bind('click initiation', function() {
        $(this).remove();
        InitiateGame();
    });
    
    // Initiate the game
    function InitiateGame(bypassHost) {
        // Loading indicator
        Loader.Start();
        
        // Peers
        PeerHandler.peer = new Peer({host:'peer.nathandavies.co.uk'});
        PeerHandler.peer.on('open', function(id) {
            Trace.Information('Local peer identifier: '+id);
            
            // Connect to hosting peer?
            if (URLParameters.session && !bypassHost) {
                PeerHandler.connection = PeerHandler.peer.connect(URLParameters.session);
                Trace.Information('Connecting to peer: '+PeerHandler.connection.peer);
                
                // Open the game
                PeerHandler.connection.on('open', function() {
                    PeerHandler.connection.on('data', function(data) {
                        if (data.state == 'initiation')
                            new Game();
                        else if (data.state == 'gameisfull')
                            SessionIssue('Session is full');
                    });
                });
            }
            else
                new Game();
        }).on('error', function(error) {
            // Session outdated?
            if (!error.type)
                SessionIssue('Session no longer exists');
            else
                ShowError('Technical difficulties =(', 'Error establishing a peer connection; '+error.type);
        });
    }
    
    // If a session identifier has been supplied, auto-start the initiation
    if (URLParameters.session)
        start.trigger('initiation');
    
    // New session option
    function SessionIssue(error) {
        ShowError(error);
        PeerHandler.connection = null;
        
        // New session
        var newSession = $(Mustache.render(HTML.div,{id:'newsession',content:'+ New session'})).insertAfter(message);
        newSession.bind('click', function() {
            $(this).remove();
            message.remove();
            InitiateGame(true);
        });
    }
    
    // Show error
    function ShowError(error, trace) {
        // Trace error
        Trace.Error((!trace) ? error : trace);
        
        // Stop the loader, and display the error
        Loader.Stop();
        message = $(Mustache.render(HTML.div,{id:'message',content:error})).insertAfter('h1');
    }
});