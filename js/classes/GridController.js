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