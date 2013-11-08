/**
 * Game.js
 * --------
 * Author & Copyright (c) 2013: Nathan Davies, www.nathandavies.co.uk
 */

function Game() {
    Trace.Information('New Game()');
    
    // Show the local player's game board
    $('h1').hide();
    new GameBoard('local');
    
    // show peer sharing options; unless already in a party of 2
    
    /*
        ability to be peer host
        - don't allow more than one other in the party
        - change peer sharing options with the start of other peer
          - waiting for them to approve sharing of camera
          - refused to share camera
            - reenable sharing options
            - reset score
          - ready; let's play!
            - draw remote board
    */
}