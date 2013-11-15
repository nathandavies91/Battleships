/**
 * Hint.js
 * --------
 * Author & Copyright (c) 2013: Nathan Davies, www.nathandavies.co.uk
 */

var Hint = function(id, content) {
    Trace.Information('New Hint('+id+', '+content+')');
    var self = this;
    
    // Properties
    this.id = id;
    this.content = content;
    
    // Show the hint
    this.ShowHint();
    
    // Remove on click
    this.element.on('click', function() {
        self.Remove();
    });
}

Hint.prototype = {
    // Remove the element
    Remove: function() {
        this.element.fadeOut(function() {
            $(this).remove();
        });
    },
    
    // Show the hint
    ShowHint: function() {
        this.element = $(Mustache.render(HTML.div, {
            id: this.id,
            class: 'hint',
            content: this.content
        }))
        .append(Mustache.render(HTML.div,{class:'pointer'}))
        .insertAfter('h1');
    }
}