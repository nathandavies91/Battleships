$(function() {
    var errorMessage = $('#message .error');
    
    // Adjust the error message as to prevent confusion
    errorMessage.html('You need to enable video streaming');
    
    // Gather the user's media
    navigator.getUserMedia || (navigator.getUserMedia = navigator.mozGetUserMedia ||  navigator.webkitGetUserMedia || navigator.msGetUserMedia);
    
    // Supported?
    if (navigator.getUserMedia)
        navigator.getUserMedia({ video: true, audio: true }, success);
    else
        errorMessage.html('Your browser is not supported');
    
    // We've got the user's media stream
    function success() {
        $('body').addClass('js');
    }
});