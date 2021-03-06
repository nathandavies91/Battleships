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
        template +=     '<section class="score">';
        template +=         '<span class="title">Score</span><figure>{{score}}</figure>';
        template +=         '<div class="shipcount"><span>Ships:</span><figure>0</figure></div>';
        template +=     '</section>';
        template +=     '{{#local}}';
        template +=         '<section class="instructions">';
        template +=             '<h2>Instructions</h2>';
        template +=             '<ul>';
        template +=                 '<li>Use the space-bar key to adjust the orientation</li>';
        template +=                 '<li>Double click a ship to remove it</li>';
        template +=             '</ul>';
        template +=         '</section>';
        template +=         '<div id="ready" class="disabled">Ready &raquo;</div>';
        template +=     '{{/local}}';
        template +=     '{{^local}}';
        template +=         '{{^ready}}';
        template +=             '<section class="plotting">';
        template +=                 '<h2>Waiting for other player</h2>';
        template +=                 '<p>The other player is still plotting their ships</p>';
        template +=             '</section>';
        template +=         '{{/ready}}';
        template +=     '{{/local}}';
        template +=     '<section class="grid"{{^local}}{{^ready}} style="display:none;"{{/ready}}{{/local}}>';
        template +=         '{{#grid}}<div class="row">{{#.}}<div class="block"></div>{{/.}}</div>{{/grid}}';
        template +=     '</section>';
        template += '</section>';
        return template;
    },
    
    // Game overview
    GameOverview: function() {
        var template = '';
        template += '<div class="overview">';
        template +=     '<h2>';
        template +=         '{{#local}}You {{#won}}Won{{/won}}{{^won}}Lost{{/won}}{{/local}}';
        template +=         '{{^local}}They {{#won}}Lost{{/won}}{{^won}}Won{{/won}}{{/local}}';
        template +=     '</h2>';
        template +=     '{{#local}}';
        template +=         '<div id="playagain">Play again &raquo;</div>';
        template +=     '{{/local}}';
        template += '</div>';
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
    },
    
    // Turn identifier
    TurnIdentifier: function() {
        var template = '';
        template += '<div id="turn">';
        template +=     '<div class="background left"></div>';
        template +=     '<div class="background right"></div>';
        template +=     '<div class="pointer"></div>';
        template += '</div>';
        return template;
    }
}