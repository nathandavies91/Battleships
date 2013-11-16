/**
 * Plotter.js
 * --------
 * Author & Copyright (c) 2013: Nathan Davies, www.nathandavies.co.uk
 */

var Plotter = function() {
    if (PeerHandler.Local.IsPlotting() && !$('body').hasClass('plotting')) {
        Trace.Information('New Plotter()');
        var self = this;
        
        // Constants
        var ENTER_KEY = 32;
        
        // Properties
        this.blockClass = '#local .grid .block';
        this.gridClass = '#local .grid';
        this.highlightClass = 'highlight';
        this.readyId = '#ready';
        this.shipClass = 'ship';
        this.vertical = true;
        
        // Ships
        this.Ships = {
            aircraftCarrier: new AircraftCarrier(),
            battleship: new Battleship(),
            submarine: new Submarine(),
            destroyer: new Destroyer(),
            patrolBoat: new PatrolBoat()
        }
        
        // Plotting class
        $('body').addClass('plotting');
        
        // Highlight ship plot area
        $(this.blockClass).bind('mouseover', function() { self.Highlight($(this)); });
        
        // Clean up the highlighting
        $(this.blockClass).bind('mouseout', function() { self.RemoveHighlighting(); });
        
        // Place ship
        $(this.blockClass).bind('click', function() { self.PlaceShip($(this)); });
        
        // Change orientation state when space bar has been pressed
        $('body').bind('keyup', function(e) {
            if (e.keyCode == ENTER_KEY) self.ChangeOrientation();
        });
        
        // A bit of OCD
        $(this.gridClass).bind('mouseout', function() { self.RemoveFocus(); });
    }
}

Plotter.prototype = {
    // Change orientation
    ChangeOrientation: function() {
        this.vertical = !this.vertical;
        this.Rehighlight();
    },
    
    // Disable the ready button
    DisableReady: function() {
        $(this.readyId).addClass('disabled').unbind('click');
    },
    
    // Enable the ready button
    EnableReady: function() {
        var self = this;
        $(this.readyId).removeClass('disabled').bind('click', function() {
            self.FinishPlotting();
        });
    },
    
    // Finish plotting
    FinishPlotting: function() {
        // Unbind all the plotting events
        $(this.blockClass).unbind('mouseover mouseout click');
        $(this.gridClass).unbind('mouseout');
        $(this.blockClass+'.'+this.shipClass).unbind('dblclick');
        $(this.readyId).unbind('click');
        $('body').unbind('keyup');
        
        // Correct cursor
        $('#local .grid .ship').css('cursor', 'default');
        
        // Tidy up
        $('body').removeClass('plotting');
        $(this.readyId+',#local .instructions').remove();
        
        // Update state
        PeerHandler.Local.UpdateState('ready');
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
        }
        if (o)
            this.focus = o;
    },
    
    // Place ship
    PlaceShip: function(focus) {
        var self = this;
        
        if (this.SelectedShip()) {
            var clear = true,
                plot = new Array();
            
            // Make sure this ship isn't overlapping another
            $(this.blockClass+'.'+this.highlightClass).each(function() {
                if ($(this).hasClass(self.shipClass))
                    clear = false;
            });
            if (clear) {
                $(this.blockClass+'.'+this.highlightClass).each(function() {
                    // Toggle class
                    $(this)
                        .addClass(self.shipClass+' '+self.SelectedShip().class)
                        .removeClass(self.highlightClass);
                    
                    // Store the block
                    plot[plot.length] = $(this);
                });
                
                // Save state with the ship
                Trace.Information('Placed ship '+this.SelectedShip().name);
                this.SelectedShip().Plot(plot);
            
                // Ability to remove the ship
                $(this.blockClass+'.'+this.shipClass).unbind('dblclick').bind('dblclick', function() {
                    self.RemoveShip($(this));
                });
                
                // Re-highlight
                this.Rehighlight(focus);
            }
        }
        
        // If there are no ships left to plot, show the ready button
        if (!this.SelectedShip())
            this.EnableReady();
    },
    
    // Re-highlight
    Rehighlight: function(focus) {
        if (focus) this.focus = focus;
        this.RemoveHighlighting();
        this.Highlight(this.focus);
    },
    
    // Remove focus
    RemoveFocus: function() {
        this.focus = null;
    },
    
    // Remove highlighting
    RemoveHighlighting: function() {
        var self = this;
        $(this.blockClass+'.'+this.highlightClass).each(function() {
            $(this).removeClass(self.highlightClass);
        });
    },
    
    // Remove ship
    RemoveShip: function(o) {
        var shipClass = o.attr('class'),
            Ships = this.Ships;
        
        // What ship is being removed?
        for (var ship in Ships) {
            if (shipClass.indexOf(Ships[ship].class) != -1) {
                var identifier = Ships[ship].class;
                
                // Update orientation to match the ship
                this.vertical = ($('.'+identifier).next().is('.'+identifier)) ? false : true;
                
                // Remove the ship
                $('.'+identifier).removeClass(identifier+' '+this.shipClass);
                Ships[ship].Remove();
                Trace.Information('Removed ship '+Ships[ship].name);
                
                break;
            }
        }
        
        // Re-highlight
        this.Rehighlight(o);
        
        // Hide ready
        this.DisableReady();
    },
    
    // Reveal
    Reveal: function(data) {
        for (var i in data)
            $('#remote .grid .row:nth-child('+data[i].y+') .block:nth-child('+data[i].x+')').addClass('reveal');
    },
    
    // Selected ship
    SelectedShip: function() {
        for (var ship in this.Ships)
            if (!this.Ships[ship].Plotted()) return this.Ships[ship];
    }
}