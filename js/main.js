/**
 * main.js
 * -------
 * Authors & Copyright (c) 2013: Nathan Davies, www.nathandavies.co.uk
 */

jQuery(function($) {
    // Variables
    var message = $('#message');
    
    // Initiate: Hide JavaScript error, and show start button
    message.hide();
    $('<div id="start">Start</div>').insertAfter(message);
    
    // Start Game
    $('#start').bind('click', function() {
        window.alert('Coming soon...');
    });
});