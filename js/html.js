/**
 * html.js
 * --------
 * Author & Copyright (c) 2013: Nathan Davies, www.nathandavies.co.uk
 */

var HTML = {
    div: '<div{{#id}} id="{{id}}"{{/id}}{{#class}} class="{{class}}"{{/class}}>{{content}}</div>',
    
    GameBoard: function() { 
        var template = '';
        template += '<section id="{{id}}" class="board">';
        template +=     '<aside>';
        template +=         '<video{{#stream}} src="{{stream}}"{{/stream}} autoplay{{#muted}} muted{{/muted}}></video>';
        template +=     '</aside>';
        template +=     '<section class="grid">';
        template +=         '{{#grid}}<div class="row">{{#.}}<div class="block"></div>{{/.}}</div>{{/grid}}';
        template +=     '</section>';
        template += '</section>';
        return template;
    }
}