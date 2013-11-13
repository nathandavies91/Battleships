/**
 * LocalMediaStream.js
 * --------
 * Author & Copyright (c) 2013: Nathan Davies, www.nathandavies.co.uk
 */

function LocalMediaStream() {
    Trace.Information('New LocalMediaStream()');
    
    // Is the browser supported?
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    if (navigator.getUserMedia) {
        // Show hint
        LocalMediaStream.prototype.hint = new Hint('mediaallow', 'Allow camera and microphone for video communication');
        
        // Browser is supported, request for the user's media
        navigator.getUserMedia({audio:true,video:true},
           function(stream) {
               // Store the local stream
               Trace.Information('Granted access to the user\'s media');
               LocalMediaStream.prototype.stream = stream;
               LocalMediaStream.prototype.Display();
               
               // Hide the hint
               LocalMediaStream.prototype.hint.Remove();
               
               // Video call
               Game.prototype.VideoCall();
           },
           function(error) {
               // Damn! Oh well, just give the user a smiley face
               Trace.Warning('Error gathering user\'s media stream: '+error.name);
               LocalMediaStream.prototype.hint.Remove();
           }
       );
    }
}

LocalMediaStream.prototype = {
    hint: null,
    stream: null,
    
    // Display the stream
    Display: function() {
        $('#local video').attr('src', this.ObjectURL());
    },
    
    // Object URL
    ObjectURL: function() {
        return window.URL.createObjectURL(this.stream);
    }
}