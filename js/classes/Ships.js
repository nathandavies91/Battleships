/**
 * Ships.js
 * --------
 * Author & Copyright (c) 2013: Nathan Davies, www.nathandavies.co.uk
 */

function Ship() { Trace.Information('New Ship()'); }
Ship.prototype = {
    class: 'ship',
    plot: null,
    
    // Plot
    Plot: function(plot) {
        this.plot = plot;
    },
    
    // Has this been plotted?
    Plotted: function() {
        return (this.plot) ? true : false;
    },
    
    // Remove ship
    Remove: function() {
        this.plot = null;
    }
}


/**
 * AircraftCarrier
 */

function AircraftCarrier() {
    Trace.Information('New AircraftCarrier()');
    Ship.apply(this);
}

AircraftCarrier.prototype = $.extend(
    false,
    Ship.prototype,
    {
        class: 'aircraft',
        size: 5
    }
);


/**
 * Battleship
 */

function Battleship() {
    Trace.Information('New Battleship()');
    Ship.apply(this);
}

Battleship.prototype = $.extend(
    false,
    Ship.prototype,
    {
        class: 'battleship',
        size: 4
    }
);


/**
 * Submarine
 */

function Submarine() {
    Trace.Information('New Submarine()');
    Ship.apply(this);
}

Submarine.prototype = $.extend(
    false,
    Ship.prototype,
    {
        class: 'submarine',
        size: 3
    }
);


/**
 * Destroyer
 */

function Destroyer() {
    Trace.Information('New Destroyer()');
    Ship.apply(this);
}

Destroyer.prototype = $.extend(
    false,
    Ship.prototype,
    {
        class: 'destroyer',
        size: 3
    }
);


/**
 * PatrolBoat
 */

function PatrolBoat() {
    Trace.Information('New PatrolBoat()');
    Ship.apply(this);
}

PatrolBoat.prototype = $.extend(
    false,
    Ship.prototype,
    {
        class: 'patrol',
        size: 2
    }
);