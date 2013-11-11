/**
 * autoload.js
 * --------
 * Author & Copyright (c) 2013: Nathan Davies, www.nathandavies.co.uk
 */

function load(js) {
    // JavaScript reference
    var file = document.createElement('script');
    file.src = './js/'+js+'.js';
    document.head.appendChild(file);
}
        
// Utilities
load('html');
load('utilities');
        
// Classes
load('classes/Hint');
load('classes/LocalMediaStream');
load('classes/GridController');
load('classes/GameBoard');
load('classes/Game');
        
// Initiate
load('init');