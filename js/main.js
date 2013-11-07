/**
 * main.js
 * -------
 * Author & Copyright (c) 2013: Nathan Davies, www.nathandavies.co.uk
 */

jQuery(function($) {
    // Variables
    var message = $('#message');
    
    // Initiate: hide JavaScript error, and show the start button
    message.hide();
    $('<div id="start">Start</div>').insertAfter(message);
    
    // Start the game initiation
    $('#start').bind('click', function() {
        // Loading indicator
        Utilities.Loading.Start($(this), true);
        
        // Get the user media
        //
        
        // Gather the user's media, hide the loading indicator
        //
        
        // Peer
        //
        
        // Show Game Board
    });
});


/**
 * utilities.js
 * ------------
 * Author & Copyright (c) 2013: Nathan Davies, www.nathandavies.co.uk
 */
var Utilities = {
    // Loading Indicator
    Loading: {
        loading: true,
        Start: function(o, init) {
            if (init || o.html().length >= 5) o.addClass('loading').html('.');
            else o.append('.');
            
            // Call again in .5s
            if (this.loading) setTimeout(function() { Utilities.Loading.Start(o); }, 500);
            else this.loading = true;
        },
        Stop: function() {
            this.loading = false;
        }
    }
}