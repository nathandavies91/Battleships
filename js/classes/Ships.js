/**
 * Ships.js
 * --------
 * Author & Copyright (c) 2013: Nathan Davies, www.nathandavies.co.uk
 */

function Ship() { Trace.Information('New Ship()'); }
Ship.prototype = {
    plot: null,
    
    // Has this been plotted?
    Plotted: function() {
        return (this.plot) ? true : false;
    }
}


/**
 * AircraftCarrier
 */

function AircraftCarrier() { Trace.Information('New AircraftCarrier()'); }
AircraftCarrier.prototype = $.extend(
    {
        class: 'aircraft',
        size: 5
    },
    Ship.prototype
);


/**
 * Battleship
 */

function Battleship() { Trace.Information('New Battleship()'); }
Battleship.prototype = $.extend(
    {
        class: 'battleship',
        size: 4
    },
    Ship.prototype
);


/**
 * Submarine
 */

function Submarine() { Trace.Information('New Submarine()'); }
Submarine.prototype = $.extend(
    {
        class: 'submarine',
        size: 3
    },
    Ship.prototype
);


/**
 * Destroyer
 */

function Destroyer() { Trace.Information('New Destroyer()'); }
Destroyer.prototype = $.extend(
    {
        class: 'destroyer',
        size: 3
    },
    Ship.prototype
);


/**
 * PatrolBoat
 */

function PatrolBoat() { Trace.Information('New PatrolBoat()'); }
PatrolBoat.prototype = $.extend(
    {
        class: 'patrol',
        size: 2
    },
    Ship.prototype
);