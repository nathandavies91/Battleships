/**
 * Hint.js
 * --------
 * Author & Copyright (c) 2013: Nathan Davies, www.nathandavies.co.uk
 */

function Hint(id, content) {
    Trace.Information('New Hint('+id+', '+content+')');
    
    // Show the hint
    Hint.prototype.element = $(Mustache.render(HTML.div, {
        id: id,
        class: 'hint',
        content: content
    }))
    .append(Mustache.render(HTML.div,{class:'pointer'}))
    .insertAfter('h1');
    
    // Remove on click
    Hint.prototype.element.on('click', function() {
        Hint.prototype.Remove();
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