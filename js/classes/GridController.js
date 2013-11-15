/**
 * GridController.js
 * --------
 * Author & Copyright (c) 2013: Nathan Davies, www.nathandavies.co.uk
 */

var GridController = function() {
    Trace.Information('New GridController()');
    
    // Properties
    this.navigationHeight = 162;
    this.padding = 20;
}

GridController.prototype = {
    // Resize
    Resize: function() {
        // Available height and width
        var availableHeight = $(window).height() - ((this.padding * 2) + this.navigationHeight),
            availableWidth = ($(window).width() / 2) - (this.padding * 2);
        
        // Grid size
        var gridSize = (availableHeight < availableWidth) ? availableHeight : availableWidth,
            gridSideMargin = (gridSize/2) * -1,
            gridTopMargin = gridSideMargin + (this.navigationHeight / 2);
        
        // Resize grid containers
        $('.board .grid').each(function() {
            $(this).css({
                'margin-left': gridSideMargin,
                'margin-top': gridTopMargin,
                'height': gridSize,
                'width': gridSize
            });
        });
        
        // Resize grid blocks
        $('.board .grid .row .block').css({
            'height': (gridSize - 11) / 10,
            'width': (gridSize - 11) / 10
        });
    }
}