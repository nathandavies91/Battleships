/**
 * Shooter.js
 * --------
 * Author & Copyright (c) 2013: Nathan Davies, www.nathandavies.co.uk
 */

var Shooter = function() {
    Trace.Information('New Shooter()');
    
    // Properties
    this.aimClass = 'aim';
    this.usersTurn = true;
}

Shooter.prototype = {
    // Highlight
    Highlight: function(o) {
        // Make sure both peers are ready, and it's the user's turn
        if (PeerHandler.Remote.IsReady() && PeerHandler.Local.IsReady() && this.usersTurn)
            o.addClass(this.aimClass);
    },
    
    // Initiate
    Initiate: function() {
        var self = this;
        $('#remote .grid .block')
            .unbind('shoot mouseover mouseout')
            .bind('click', function() { self.Shoot($(this)); })
            .bind('mouseover', function() { self.Highlight($(this)); })
            .bind('mouseout', function() { self.RemoveHighlighting($(this)); });
    },
    
    // Is user's turn?
    IsUsersTurn: function() {
        return this.usersTurn;
    },
    
    // Remove Highlighting
    RemoveHighlighting: function(o) {
        o.removeClass(this.aimClass);
    },
    
    // Set user's turn
    SetUsersTurn: function(state) {
        this.usersTurn = state;
    },
    
    // Shoot
    Shoot: function(o) {
        // Make sure both peers are ready, and it's the user's turn
        if (PeerHandler.Remote.IsReady() && PeerHandler.Local.IsReady() && this.usersTurn) {
            //
        }
    },
    
    // Toggle user's turn
    ToggleUsersTurn: function() {
        this.usersTurn = !this.usersTurn;
    }
}