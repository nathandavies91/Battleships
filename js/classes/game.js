/**
 * Game.js
 * --------
 * Author & Copyright (c) 2013: Nathan Davies, www.nathandavies.co.uk
 */

function Game() {
    Trace.Information('New Game()');
    
    // Required resources
    this.gridController = new GridController();
    this.localMediaStream = new LocalMediaStream();
    
    // Responsive grid
    $(window).on('resize', function() {
        // Nasty work around, JavaScript wouldn't let me just call gridController.Resize();
        new GridController(true).Resize();
    });
    
    // Show the local player's game board
    this.LocalGameBoard();
    
    
    
    // TESTING
    this.RemoteGameBoard();
}

Game.prototype = {
    gridController: null,
    localMediaStream: null,
    
    // Show local game board
    LocalGameBoard: function() {
        $('h1').hide();
        new GameBoard({id:'local'});
        this.gridController.Resize();
    },
    
    // Show remote game board
    RemoteGameBoard: function() {
        new GameBoard({id:'remote'});
        this.gridController.Resize();
    }
}




/**
 * GridController.js
 * --------
 * Author & Copyright (c) 2013: Nathan Davies, www.nathandavies.co.uk
 */

function GridController(bypassTrace) {
    if (!bypassTrace) Trace.Information('New GridController()');
}

GridController.prototype = {
    asideHeight: 162,
    id: '.board .grid',
    padding: 20,
    
    // Resize
    Resize: function() {
        // Available height and width
        var availableHeight = $(window).height() - ((this.padding * 2) + this.asideHeight),
            availableWidth = ($(window).width() / 2) - (this.padding * 2);
        
        // Grid size
        var gridSize = (availableHeight < availableWidth) ? availableHeight : availableWidth,
            gridSideMargin = (gridSize/2) * -1,
            gridTopMargin = gridSideMargin + (this.asideHeight / 2);
        
        // Resize grid containers
        $(this.id).each(function() {
            $(this).css({
                'margin-left': gridSideMargin,
                'margin-top': gridTopMargin,
                'height': gridSize,
                'width': gridSize
            });
        });
        
        // Resize grid blocks
        $(this.id + ' .row .block').css({
            'height': (gridSize - 11) / 10,
            'width': (gridSize - 11) / 10
        });
    }
}