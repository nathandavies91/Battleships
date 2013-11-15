/**
 * Shooter.js
 * --------
 * Author & Copyright (c) 2013: Nathan Davies, www.nathandavies.co.uk
 */

var Shooter = function() {
    Trace.Information('New Shooter()');
    
    // Properties
    this.aimClass = 'aim';
    this.shotClass = 'shot';
    this.usersTurn = true;
}

Shooter.prototype = {
    // Highlight
    Highlight: function(o) {
        if (this.Ready()) o.addClass(this.aimClass);
    },
    
    // Initiate
    Initiate: function() {
        var self = this;
        $('#remote .grid .block')
            .unbind('click mouseover mouseout')
            .bind('click', function() { self.Shoot($(this)); })
            .bind('mouseover', function() { self.Highlight($(this)); })
            .bind('mouseout', function() { self.RemoveHighlighting($(this)); });
    },
    
    // Is user's turn?
    IsUsersTurn: function() {
        return this.usersTurn;
    },
    
    // Ready?
    Ready: function() {
        // Make sure both peers are ready, and it's the user's turn
        return (PeerHandler.Remote.IsReady() && PeerHandler.Local.IsReady() && this.usersTurn);
    },
    
    // Remove Highlighting
    RemoveHighlighting: function(o) {
        o.removeClass(this.aimClass);
    },
    
    // Result
    Result: function(data) {
        // Stop the loader
        Loader.Stop();
        
        // Update the block
        $('#remote .grid .'+this.shotClass)
            .removeClass(this.shotClass)
            .addClass(data.result);
    },
    
    // Shoot
    Shoot: function(o) {
        if (this.Ready()) {
            // Send the missile
            PeerHandler.connection.send({missile:{
                x: o.index()+1,
                y: o.parent().index()+1
            }});
            
            // Start the loader
            Loader.Start();
            
            // Toggle classes, and users
            o.toggleClass(this.aimClass+' '+this.shotClass);
            this.ToggleUsersTurn();
        }
    },
    
    // Toggle user's turn
    ToggleUsersTurn: function() {
        this.usersTurn = !this.usersTurn;
        
        // Visualise
        if (!this.usersTurn) $('body').addClass('theirgo');
        else $('body').removeClass('theirgo');
    }
}