/**
 * utilities.js
 * ------------
 * Author & Copyright (c) 2013: Nathan Davies, www.nathandavies.co.uk
 */

var Utilities = {
    // Loading Indicator
    Loading: {
        loading: true,
        Start: function(o, init) {
            if (init || o.html().length >= 5) o.addClass('loading').html('.');
            else o.append('.');
            
            // Call again in .5s
            if (this.loading) setTimeout(function() { Utilities.Loading.Start(o); }, 500);
            else this.loading = true;
        },
        Stop: function() {
            this.loading = false;
        }
    },
    // Trace
    Trace: {
        level: 0,
        Error: function(error) {
            if (this.level) console.log('ERROR: '+error);
        }
    }
}