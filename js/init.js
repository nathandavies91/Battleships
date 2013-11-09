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
            }
            
            // Play the game
            Loader.Stop();
            new Game();
        }).on('error', function(error) {
            // Error occurred
            showError(ErrorMessages.peerConnection, 'Error creating the peer connection; '+error.type);
        });
    });
    
    // Show error
    function showError(error, trace) {
        // Trace error
        Trace.Error((!trace) ? error : trace);
        
        // Remove the loader, and display the error
        Loader.Stop();
        message.html(error).show();
    }
});