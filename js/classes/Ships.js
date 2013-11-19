/**
 * Ships.js
 * --------
 * Author & Copyright (c) 2013: Nathan Davies, www.nathandavies.co.uk
 */

var Ship = function() {
    Trace.Information('New Ship()');
    
    this.name = 'Ship';
    this.class = 'ship';
    this.size = 0;
    this.damage = 0;
}

Ship.prototype = {
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
    
    // Inherit from the class Ship
    Ship.apply(this);
    
    // Properties
    this.name = 'Aircraft Carrier';
    this.class = 'aircraft';
    this.size = 5;
}

AircraftCarrier.prototype = Ship.prototype;


/**
 * Battleship
 */

var Battleship = function() {
    Trace.Information('New Battleship()');
    
    // Inherit from the class Ship
    Ship.apply(this);
    
    // Properties
    this.name = 'Battleship';
    this.class = 'battleship';
    this.size = 4;
}

Battleship.prototype = Ship.prototype;


/**
 * Submarine
 */

var Submarine = function() {
    Trace.Information('New Submarine()');
    
    // Inherit from the class Ship
    Ship.apply(this);
    
    // Properties
    this.name = 'Submarine';
    this.class = 'submarine';
    this.size = 3;
}

Submarine.prototype = Ship.prototype;


/**
 * Destroyer
 */

var Destroyer = function() {
    Trace.Information('New Destroyer()');
    
    // Inherit from the class Ship
    Ship.apply(this);
    
    // Properties
    this.name = 'Destroyer';
    this.class = 'destroyer';
    this.size = 3;
}

Destroyer.prototype = Ship.prototype;


/**
 * PatrolBoat
 */

var PatrolBoat = function() {
    Trace.Information('New PatrolBoat()');
    
    // Inherit from the class Ship
    Ship.apply(this);
    
    // Properties
    this.name = 'Patrol Boat';
    this.class = 'patrol';
    this.size = 2;
}

PatrolBoat.prototype = Ship.prototype;