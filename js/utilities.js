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
        peerUnavailable: 'Session no longer exists',
        userMedia: 'Error retrieving camera &amp; audio'
    },
    
    // Loading indicator
    Loader: {
        id: 'loader',
        timeout: null,
        Start: function(o) {
            if (!o) {
                $('body').append(Mustache.render(HTML.div,{id:this.id,content:'.'}));
                o = $('#'+this.id);
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
            $('#'+this.id).remove();
        }
    },
    
    // Location
    Location: {
        site: window.location.origin,
        path: window.location.pathname,
        url: window.location.origin + window.location.pathname
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
            if (this.level >= 1) console.error(error);
        },
        Information: function(information) {
            if (this.level >= 3) console.info(information);
        },
        Warning: function(warning) {
            if (this.level >= 2) console.warn(warning);
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
    Location = Utilities.Location,
    PeerHandler = Utilities.PeerHandler,
    Trace = Utilities.Trace,
    URLParameters = Utilities.URLParameters();