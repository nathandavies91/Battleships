/**
 * utilities.js
 * ------------
 * Author & Copyright (c) 2013: Nathan Davies, www.nathandavies.co.uk
 */

var Utilities = {
    // In game error
    InGameError: function(error) {
        $(window).unbind('beforeunload');
        
        // Remove game session
        $('body > \*:not(h1)').remove();
        $('h1').show();
        
        // Show error
        $('body').append(Mustache.render(HTML.div,{
            id: 'message',
            content: error
        }));
        
        // New session
        var newgame = $(Mustache.render(HTML.div, {
            id: 'newsession',
            content: '+ New game'
        })).insertAfter('#message');
        
        // Load new session
        newgame.bind('click', function() {
            document.location = Utilities.Location.url;
        });
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
        url: (window.location.origin + window.location.pathname).replace(/\/$/, '')
    },
    
    // Peer handler
    PeerHandler: {
        connection: null,
        peer: null,
        
        // Disconnected
        Disconnected: function() {
            Utilities.InGameError('Peer has disconnected');
            PeerHandler.peer.destroy();
        }
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
var Loader = Utilities.Loader,
    Location = Utilities.Location,
    PeerHandler = Utilities.PeerHandler,
    Trace = Utilities.Trace,
    URLParameters = Utilities.URLParameters();