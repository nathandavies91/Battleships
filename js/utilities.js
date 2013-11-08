/**
 * utilities.js
 * ------------
 * Author & Copyright (c) 2013: Nathan Davies, www.nathandavies.co.uk
 */

var Utilities = {
    // Error messages
    ErrorMessages: {
        browserSupport: 'This browser isn\'t supported',
        peerConnection: 'Technical difficulties =(',
        userMedia: 'Error retrieving camera &amp; audio'
    },
    
    // Loading indicator
    Loader: {
        id: '#loader',
        timeout: null,
        Start: function(o) {
            if (!o) {
                $('body').append(HTML.loader);
                o = $(this.id);
            }
            else if (o.html().length >= 5)
                o.html('.');
            else
                o.append('.');
            
            // Call again in .5s
            this.timeout = setTimeout(function() { Utilities.Loader.Start(o); }, 500);
        },
        Stop: function() {
            clearTimeout(this.timeout);
            $(this.id).remove();
        }
    },
    
    // Media stream
    MediaStream: {
        local: null,
        remote: null
    },
    
    // Peer handler
    PeerHandler: {
        connection: null,
        peer: null
    },
    
    // Trace
    Trace: {
        level: 0,
        Error: function(error) {
            if (this.level > 0) console.log('ERROR:: '+error);
        },
        Information: function(information) {
            if (this.level > 1) console.log('INFORMATION:: '+information);
        }
    },
    
    // URL parameters
    URLParameters: function() {
        var query = document.location.search.split('+').join(' ');
        var parameters = {}, tokens, re = /[?&]?([^=]+)=([^&]*)/g;
        
        while (tokens = re.exec(query))
            parameters[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
        
        return parameters;
    }
}

// Shorthands
var ErrorMessages = Utilities.ErrorMessages,
    Loader = Utilities.Loader,
    MediaStream = Utilities.MediaStream,
    PeerHandler = Utilities.PeerHandler,
    Trace = Utilities.Trace,
    URLParameters = Utilities.URLParameters();