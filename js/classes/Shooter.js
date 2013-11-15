/**
 * Shooter.js
 * --------
 * Author & Copyright (c) 2013: Nathan Davies, www.nathandavies.co.uk
 */

var Shooter = function() {
    Trace.Information('New Shooter()');
}

Shooter.prototype = {
    aimClass: 'aim',
    blockClass: '#remote .grid .block',
    usersTurn: true,
    
    // Highlight
    Highlight: function(o) {
        window.alert(this.usersTurn);
        // Make sure both peers are ready, and it's the user's turn
        if (PeerHandler.Remote.IsReady() && PeerHandler.Local.IsReady() && this.usersTurn)
            o.addClass(this.aimClass);
    },
    
    // Initiate
    Initiate: function() {
        $(this.blockClass)
            .unbind('shoot mouseover mouseout')
            .bind('click', function() { Shooter.prototype.Shoot($(this)); })
            .bind('mouseover', function() { Shooter.prototype.Highlight($(this)); })
            .bind('mouseout', function() { Shooter.prototype.RemoveHighlighting($(this)); });
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