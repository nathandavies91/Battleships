jQuery(function($) {
    // Variables
    var errorMessage = $('#message .error');
    
    // Adjust the error message as to prevent confusion
    errorMessage.html('You need to enable video streaming');
    
    // Gather the user's media
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    
    // Supported?
    if (navigator.getUserMedia)
        navigator.getUserMedia({video:true}, gotStream, error);
    else
        errorMessage.html('Your browser is not supported');
    
    // We've got the user's media stream
    function gotStream(localStream) {
        $('body').addClass('js');
        
        // Variables
        var video = $('video#local');
        
        window.stream = localStream;
        video.attr('src', window.URL.createObjectURL(localStream));
    }
    
    // Error gathering the user's media stream
    function error(error) {
        console.log("navigator.getUserMedia error: ", error);
    }
});