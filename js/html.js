/**
 * html.js
 * --------
 * Author & Copyright (c) 2013: Nathan Davies, www.nathandavies.co.uk
 */

var HTML = {
    loader: '<div id="loader">.</div>',
    startButton: '<div id="start">Start</div>',
    GameBoard: function() { 
        var template = '';
        template += '<section id="{{id}}" class="board">';
        template +=     '<aside>';
        template +=         '<video src="{{stream}}" autoplay></video>';
        template +=     '</aside>';
        template +=     '<section class="grid">';
        template +=         '{{#grid}}<div class="row">{{#.}}<div class="block"></div>{{/.}}</div>{{/grid}}';
        template +=     '</section>';
        template += '</section>';
        return template;
    }
}