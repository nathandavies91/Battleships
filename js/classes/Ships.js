/**
 * Ships.js
 * --------
 * Author & Copyright (c) 2013: Nathan Davies, www.nathandavies.co.uk
 */

var Ship = function() { Trace.Information('New Ship()'); }
Ship.prototype = {
    name: 'Ship',
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

var AircraftCarrier = function() {
    Trace.Information('New AircraftCarrier()');
    Ship.apply(this);
}

AircraftCarrier.prototype = $.extend(
    false,
    Ship.prototype,
    {
        name: 'Aircraft Carrier',
        class: 'aircraft',
        size: 5
    }
);


/**
 * Battleship
 */

var Battleship = function() {
    Trace.Information('New Battleship()');
    Ship.apply(this);
}

Battleship.prototype = $.extend(
    false,
    Ship.prototype,
    {
        name: 'Battleship',
        class: 'battleship',
        size: 4
    }
);


/**
 * Submarine
 */

var Submarine = function() {
    Trace.Information('New Submarine()');
    Ship.apply(this);
}

Submarine.prototype = $.extend(
    false,
    Ship.prototype,
    {
        name: 'Submarine',
        class: 'submarine',
        size: 3
    }
);


/**
 * Destroyer
 */

var Destroyer = function() {
    Trace.Information('New Destroyer()');
    Ship.apply(this);
}

Destroyer.prototype = $.extend(
    false,
    Ship.prototype,
    {
        name: 'Destroyer',
        class: 'destroyer',
        size: 3
    }
);


/**
 * PatrolBoat
 */

var PatrolBoat = function() {
    Trace.Information('New PatrolBoat()');
    Ship.apply(this);
}

PatrolBoat.prototype = $.extend(
    false,
    Ship.prototype,
    {
        name: 'Patrol',
        class: 'patrol',
        size: 2
    }
);