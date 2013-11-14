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
        template +=     '<section class="video">';
        template +=         '<video{{#stream}} src="{{stream}}"{{/stream}} autoplay{{#muted}} muted{{/muted}}></video>';
        template +=     '</section>';
        template +=     '<section class="score"><span>Score</span>{{score}}</section>';
        template +=     '{{#local}}';
        template +=         '<section class="instructions">';
        template +=             '<h2>Plot Ships</h2>';
        template +=             '<ul>';
        template +=                 '<li>Use the space key to adjust the orientation of the ship</li>';
        template +=                 '<li>Double click a ship to remove it</li>';
        template +=             '</ul>';
        template +=         '</section>';
        template +=     '{{/local}}';
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