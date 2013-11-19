/**
 * LocalMediaStream.js
 * --------
 * Author & Copyright (c) 2013: Nathan Davies, www.nathandavies.co.uk
 */

var LocalMediaStream = function() {
    Trace.Information('New LocalMediaStream()');
    
    // Properties
    this.stream = null;
    
    // Request the user's stream
    this.RequestStream();
}

LocalMediaStream.prototype = {
    // Display the stream
    Display: function() {
        $('#local video').attr('src', this.ObjectURL());
    },
    
    // Object URL
    ObjectURL: function() {
        return window.URL.createObjectURL(this.stream);
    },
    
    // Request stream
    RequestStream: function() {
        // Is the browser supported?
        var self = this;
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        if (navigator.getUserMedia) {
            // Show hint
            this.hint = new Hint('mediaallow', 'Allow camera and microphone for video communication');
            
            // Browser is supported, request for the user's media
            navigator.getUserMedia({audio:true,video:true},
               function(stream) {
                   // Store the local stream
                   Trace.Information('Granted access to the user\'s media');
                   window.localStream = stream;
                   self.stream = stream;
                   self.Display();
                   
                   // Remove the hint
                   self.hint.Remove();
                   
                   // Video call
                   self.VideoCall();
               },
               function(error) {
                   // Damn! Oh well, just give the user a smiley face
                   Trace.Warning('Error gathering user\'s media stream: '+error.name);
                   self.hint.Remove();
               }
           );
        }
    },
    
    // Video call
    VideoCall: function() {
        var self = this;
        if (this.stream && PeerHandler.connection) {
            Trace.Information('Sending media stream to remote peer...');
            PeerHandler.peer.call(PeerHandler.connection.peer, self.stream);
        }
    }
}