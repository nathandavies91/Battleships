/**
 * Plotter.js
 * --------
 * Author & Copyright (c) 2013: Nathan Davies, www.nathandavies.co.uk
 */

function Plotter() {
    Trace.Information('New Plotter()');
    
    // Highlight ship plot area
    $(this.block).bind('mouseover', function() {
        Plotter.prototype.Highlight($(this));
    });
    
    // Clean up the highlighting
    $(this.block).bind('mouseout', function() {
        Plotter.prototype.RemoveHighlighting();
    });
    
    // Place ship
    $(this.grid).bind('click', function() {
        Plotter.prototype.PlaceShip();
    });
    
    // Change orientation state when space bar has been pressed
    $('body').bind('keyup', function(e) {
        if (e.keyCode == 32)
            Plotter.prototype.ChangeOrientation();
    });
    
    // A bit of OCD
    $(this.grid).bind('mouseout', function() {
        Plotter.prototype.RemoveFocus();
    });
}

Plotter.prototype = {
    block: '#local .grid .block',
    focus: null,
    grid: '#local .grid',
    highlightClass: 'highlight',
    shipClass: 'ship',
    vertical: true,
    
    // Change orientation
    ChangeOrientation: function() {
        this.vertical = !this.vertical;
        
        // Re-highlight
        this.Rehighlight();
    },
    
    // Highlight
    Highlight: function(o) {
        if (o && (ship = this.SelectedShip())) {
            var size = ship.size,
                plot = new Array(),
                post = Math.ceil((size - 1) / 2),
                pre = Math.floor((size - 1) / 2);
            
            // Initial block
            plot[0] = o;
            
            // Vertical ship
            if (this.vertical) {
                var child = '.block:nth-child('+(o.index()+1)+')';
                
                // Correct focus; prevents the shop from overflowing the grid
                if ((index = o.parent().index()) < pre)
                    post += pre - index;
                else if ((index = (o.parent().index() + 1)) > ((length = o.parent().parent().children().length) - post))
                    pre += post - (length - index);
                
                // Post blocks
                for (var i = 0; i < post; i++)
                    plot[plot.length] = plot[plot.length-1].parent().next().children(child);
                
                // Pre blocks
                plot[plot.length] = o;
                for (var i = 0; i < pre; i++)
                    plot[plot.length] = plot[plot.length-1].parent().prev().children(child);
            }
            else {
                // Correct focus; prevents the ship from overflowing the grid
                if ((index = o.index()) < pre)
                    post += pre - index;
                else if ((index = (o.index() + 1)) > ((length = o.parent().children().length) - post))
                    pre += post - (length - index);
                
                // Post blocks
                for (var i = 0; i < post; i++)
                    plot[plot.length] = plot[plot.length-1].next();
                
                // Pre blocks
                plot[plot.length] = o;
                for (var i = 0; i < pre; i++)
                    plot[plot.length] = plot[plot.length-1].prev();
            }
            
            // Highlight blocks
            for (var i = 0; i < plot.length; i++)
                plot[i].addClass(this.highlightClass);
            
            this.focus = o;
        }
    },
    
    // Place ship
    PlaceShip: function() {
        if (this.SelectedShip()) {
            var clear = true,
                plot = new Array();
            
            // Make sure this ship isn't overlapping another
            $(this.block+'.'+this.highlightClass).each(function() {
                if ($(this).hasClass(Plotter.prototype.shipClass))
                    clear = false;
            });
            if (clear) {
                $(this.block+'.'+this.highlightClass).each(function() {
                    // Toggle class
                    $(this)
                        .addClass(Plotter.prototype.shipClass
                                  +' '+Plotter.prototype.SelectedShip().class)
                        .removeClass(Plotter.prototype.highlightClass);
                    
                    // Store the block
                    plot[plot.length] = $(this);
                });
                
                // Save state with the ship
                this.SelectedShip().Plot(plot);
            }
            
            // Ability to remove the ship
            $(this.block+'.'+this.shipClass).unbind('dblclick').bind('dblclick', function() {
                Plotter.prototype.RemoveShip($(this));
            });
            
            // Re-highlight
            this.Rehighlight();
        }
    },
    
    // Re-highlight
    Rehighlight: function() {
        this.RemoveHighlighting();
        this.Highlight(this.focus);
    },
    
    // Remove focus
    RemoveFocus: function() {
        this.focus = null;
    },
    
    // Remove highlighting
    RemoveHighlighting: function() {
        $(this.block+'.'+this.highlightClass).each(function() {
            $(this).removeClass(Plotter.prototype.highlightClass);
        });
    },
    
    // Remove ship
    RemoveShip: function(ship) {
        var shipClass = ship.attr('class'),
            Ships = this.Ships;
        
        // What ship is being removed?
        for (var ship in Ships) {
            if (shipClass.indexOf(Ships[ship].class) != -1) {
                // Remove the ship
                $('.'+Ships[ship].class).removeClass(Ships[ship].class+' '+this.shipClass);
                Ships[ship].Remove();
                break;
            }
        }
        
        // Re-highlight
        this.Rehighlight();
    },
    
    // Selected ship
    SelectedShip: function() {
        var ship,
            Ships = this.Ships;
        
        // Aircraft carrier
        if (!(ship = Ships.aircraftCarrier)) return this.Ships.aircraftCarrier = new AircraftCarrier();
        else if (!ship.Plotted()) return ship;
        
        // Battleship
        if (!(ship = Ships.battleship)) return this.Ships.battleship = new Battleship();
        else if (!ship.Plotted()) return ship;
        
        // Submarine
        if (!(ship = Ships.submarine)) return this.Ships.submarine = new Submarine();
        else if (!ship.Plotted()) return ship;
        
        // Destroyer
        if (!(ship = Ships.destoyer)) return this.Ships.destoyer = new Destroyer();
        else if (!ship.Plotted()) return ship;
        
        // Patrol boat
        if (!(ship = Ships.patrolBoat)) return this.Ships.patrolBoat = new PatrolBoat();
        else if (!ship.Plotted()) return ship;
    },
    
    // Ships
    Ships: {
        aircraftCarrier: null,
        battleship: null,
        destoyer: null,
        patrolBoat: null,
        submarine: null
    }
}