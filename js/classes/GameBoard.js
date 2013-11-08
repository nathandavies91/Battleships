/**
 * GameBoard.js
 * --------
 * Author & Copyright (c) 2013: Nathan Davies, www.nathandavies.co.uk
 */

function GameBoard(player) {
    Trace.Information('New GameBoard('+player+')');
    
    // Grid
    var grid = Array(10);
    for (var i = 0; i < 10; i++)
        grid[i] = Array(10);
    
    $('#'+player).remove();
    $('body').append(Mustache.render(HTML.GameBoard(), {
        id: player,
        stream: (player == 'local') ? MediaStream.local : MediaStream.remote,
        grid: grid
    }));
}