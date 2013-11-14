/**
 * GameBoard.js
 * --------
 * Author & Copyright (c) 2013: Nathan Davies, www.nathandavies.co.uk
 */

function GameBoard(o) {
    Trace.Information('New GameBoard('+o.id+')');
    
    // Grid
    if (o.id == 'local' || o.id == 'remote') {
        var grid = Array(10);
        for (var i = 0; i < 10; i++)
            grid[i] = Array(10);
        
        // Display the game board
        $('#'+o.id).remove();
        $('body').append(Mustache.render(HTML.GameBoard(), $.extend({
            grid: grid,
            local: (o.id == 'local') ? true : false
        },o)));
    }
}