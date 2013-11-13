/**
 * RemoteMediaStream.js
 * --------
 * Author & Copyright (c) 2013: Nathan Davies, www.nathandavies.co.uk
 */

function RemoteMediaStream(stream) {
    Trace.Information('New RemoteMediaStream('+stream+')');
    
    // Store the stream
    this.stream = stream;
    this.Display();
}

RemoteMediaStream.prototype = {
    stream: null,
    
    // Display the stream
    Display: function() {
        $('#remote video').attr('src', this.ObjectURL());
    },
    
    // Object URL
    ObjectURL: function() {
        return window.URL.createObjectURL(this.stream);
    }
}