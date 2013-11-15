/**
 * Hint.js
 * --------
 * Author & Copyright (c) 2013: Nathan Davies, www.nathandavies.co.uk
 */

var Hint = function(id, content) {
    Trace.Information('New Hint('+id+', '+content+')');
    var self = this;
    
    // Show the hint
    self.element = $(Mustache.render(HTML.div, {
        id: id,
        class: 'hint',
        content: content
    }))
    .append(Mustache.render(HTML.div,{class:'pointer'}))
    .insertAfter('h1');
    
    // Remove on click
    self.element.on('click', function() {
        self.Remove();
    });
}

Hint.prototype = {
    element: null,
    
    // Remove the element
    Remove: function() {
        this.element.fadeOut(function() {
            $(this).remove();
        });
    }
}