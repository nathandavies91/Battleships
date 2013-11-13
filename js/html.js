/**
 * html.js
 * --------
 * Author & Copyright (c) 2013: Nathan Davies, www.nathandavies.co.uk
 */

var HTML = {
    div: '<div{{#id}} id="{{id}}"{{/id}}{{#class}} class="{{class}}"{{/class}}>{{content}}</div>',
    
    // Game board
    GameBoard: function() { 
        var template = '';
        template += '<section id="{{id}}" class="board">';
        template +=     '<section class="score"><span>Score</span>{{score}}</section>';
        template +=     '<aside>';
        template +=         '<video{{#stream}} src="{{stream}}"{{/stream}} autoplay{{#muted}} muted{{/muted}}></video>';
        template +=     '</aside>';
        template +=     '<section class="grid">';
        template +=         '{{#grid}}<div class="row">{{#.}}<div class="block"></div>{{/.}}</div>{{/grid}}';
        template +=     '</section>';
        template += '</section>';
        return template;
    },
    
    // Invite screen
    InviteScreen: function() {
        var template = '';
        template += '<section id="remote" class="board">';
        template +=     '<section id="invite">';
        template +=         '<h2>Invite a Friend</h2>';
        template +=         '<p>Send the following link to a friend</p>';
        template +=         '<div id="invitelink">';
        template +=             '<button class="copy">Copy</button>';
        template +=             '<p>{{session}}</p>';
        template +=         '</div>';
        template +=     '</section>';
        template += '</section>';
        return template;
    }
}