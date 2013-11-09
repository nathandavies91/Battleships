/**
 * init.js
 * -------
 * Author & Copyright (c) 2013: Nathan Davies, www.nathandavies.co.uk
 */

jQuery(function($) {
    // Elements
    var message = $('#message'),
        newSession,
        start;
    
    // Level of logging
    if (!isNaN(URLParameters.log))
        Utilities.Trace.level = URLParameters.log;
    
    // Initiate the game
    function InitiateGame(bypassHost) {
        // Remove the start button
        start.remove();
        
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
                
                PeerHandler.connection.on('open', PlayGame);
            }
            else
                PlayGame();
        }).on('error', function(error) {
            // Invalid peer?
            if (!error.type) {
                ShowError(ErrorMessages.peerUnavailable);
                
                // New session
                newSession = $(Mustache.render(HTML.div,{id:'newsession',content:'+ New session'})).insertAfter(message);
                newSession.on('click', function() {
                    $(this).hide();
                    message.hide();
                    InitiateGame(true);
                });
            }
            else
                ShowError(ErrorMessages.peerConnection, 'Error establishing a peer connection; '+error.type);
        });
    }
    
    // Play the game
    function PlayGame() {
        Loader.Stop();
        new Game();
    }
    
    // Show error
    function ShowError(error, trace) {
        // Trace error
        Trace.Error((!trace) ? error : trace);
        
        // Remove the loader, and display the error
        Loader.Stop();
        message.html(error).show();
    }
    
    // Initiate: show the start button
    function StartButton() {
        message.hide();
        start = $(Mustache.render(HTML.div,{id:'start',content:'Start'})).insertAfter(message);
    } StartButton();
    
    // If a session identifier has been supplied, auto-start the initiation
    if (URLParameters.session)
        InitiateGame();
    
    
    // Start button
    $('#start').bind('click', InitiateGame);
});