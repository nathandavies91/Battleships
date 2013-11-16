/**
 * GameBoard.js
 * --------
 * Author & Copyright (c) 2013: Nathan Davies, www.nathandavies.co.uk
 */

var GameBoard = function(o) {
    Trace.Information('New GameBoard('+o.id+')');
    if ((o.id == 'local' && PeerHandler.Local.IsPlotting()) || (o.id == 'remote')) {
        // Properties
        this.options = o;
        
        // Display the game board
        this.Display();
    }
}

GameBoard.prototype = {
    // Display
    Display: function() {
        $('#'+this.options.id).remove();
        $('body').append(Mustache.render(HTML.GameBoard(), $.extend({
            grid: this.Grid(),
            local: (this.options.id == 'local')
        },this.options)));
    },
    
    // Grid
    Grid: function() {
        var grid = Array(10);
        for (var i = 0; i < 10; i++)
            grid[i] = Array(10);
        
        return grid;
    }
}