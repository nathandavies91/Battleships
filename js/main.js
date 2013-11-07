/**
 * main.js
 * -------
 * Author & Copyright (c) 2013: Nathan Davies, www.nathandavies.co.uk
 */

jQuery(function($) {
    // Variables
    var message = $('#message'),
        start;
    
    // Level of logging
    if (!isNaN(Utilities.Parameters().log))
        Utilities.Trace.level = Utilities.Parameters().log;
    
    // Initiate: hide JavaScript error, and show the start button
    message.hide();
    start = $(HTML.startButton).insertAfter(message);
    
    // Start the game initiation
    start.bind('click', function() {
        // Loading indicator
        Utilities.Loading.Start($(this), true);
        
        // User's media shim
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        
        // Request for the user's media
        navigator.getUserMedia({audio:true,video:true},
            // We've got the user's stream
            function(stream) {
                // Peer
                //
                
                // Show the game board
                //
            },
            // Request rejected, or error occurred
            function(error) {
                // Log the error
                Utilities.Trace.Error(ErrorMessages.Trace.userMedia+error.name);
                
                // Show error notification
                start.remove();
                message.html(ErrorMessages.userMedia).show();
            }
        );
    });
});