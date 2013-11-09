/**
 * init.js
 * -------
 * Author & Copyright (c) 2013: Nathan Davies, www.nathandavies.co.uk
 */

jQuery(function($) {
    // Elements
    var message = $('#message'),
        start;
    
    // Level of logging
    if (!isNaN(URLParameters.log))
        Utilities.Trace.level = URLParameters.log;
    
    // Initiate: hide JavaScript error, and show the start button
    message.hide();
    start = $(Mustache.render(HTML.div,{id:'start',content:'Start'})).insertAfter(message);
    
    // Game initiation
    start.bind('click', function() {
        // Remove the start button
        $(this).remove();
        
        // Loading indicator
        Loader.Start();
        
        // Peers
        PeerHandler.peer = new Peer({host:'peer.nathandavies.co.uk'});
        PeerHandler.peer.on('open', function(id) {
            Trace.Information('Local peer identifier: '+id);
            
            // Connect to hosting peer?
            if (URLParameters.session) {
                PeerHandler.connection = PeerHandler.peer.connect(URLParameters.session);
                Trace.Information('Connecting to peer: '+PeerHandler.connection.peer);
                
                PeerHandler.connection.on('open', PlayGame);
            }
            else
                PlayGame();
        }).on('error', function(error) {
            // Error occurred
            ShowError(ErrorMessages.peerConnection, 'Error establishing a peer connection; '+error.type);
        });
    });
    
    // If a session identifier has been supplied, auto-start the initiation
    if (URLParameters.session)
        start.trigger('click');
    
    // Show error
    function ShowError(error, trace) {
        // Trace error
        Trace.Error((!trace) ? error : trace);
        
        // Remove the loader, and display the error
        Loader.Stop();
        message.html(error).show();
    }
    
    // Play the game
    function PlayGame() {
        Loader.Stop();
        new Game();
    }
});