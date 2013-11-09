/**
 * LocalMediaStream.js
 * --------
 * Author & Copyright (c) 2013: Nathan Davies, www.nathandavies.co.uk
 */

function LocalMediaStream() {
    // Is the browser supported?
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    if (navigator.getUserMedia) {
        // Browser is supported, request for the user's media
        navigator.getUserMedia({audio:true,video:true},
           function(stream) {
               // Store the local stream
               Trace.Information('Granted access to the user\'s media');
               LocalMediaStream.prototype.stream = stream;
               LocalMediaStream.prototype.Display();
           },
           function(error) {
               // Damn! Oh well, just give the user a smiley face
               Trace.Error('Error gathering user\'s media stream: '+error.name);
           }
       );
    }
}

LocalMediaStream.prototype = {
    stream: null,
    Display: function() {
        $('#local video').attr('src', this.ObjectURL());
    },
    ObjectURL: function() {
        return window.URL.createObjectURL(this.stream);
    }
}