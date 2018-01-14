var CalendarEvent = (function() {

    function CalendarEvent(start, end) {
        this.start = start; 
        this.end = end;
        this.overlapWith = [];
        this.overlap = false;
        this.left = 0;
    }

    CalendarEvent.prototype.getStart = function() {
        return this.start;
    }

    CalendarEvent.prototype.getEnd = function() {
        return this.end;
    }

    CalendarEvent.prototype.setOverlap = function() {
        this.overlap = true;
    }

    CalendarEvent.prototype.addOverlap = function(e) {
        this.overlapWith.push(e);
    }

    CalendarEvent.prototype.getOverlap = function(e) {
        return this.overlapWith;
    }

    CalendarEvent.prototype.isOver = function() {
        return this.overlap;
    }

    CalendarEvent.prototype.countOverlap = function() {
        return this.overlapWith.length;
    }

    CalendarEvent.prototype.getLeftPosition = function() {
        return this.left;
    }

    CalendarEvent.prototype.calcOverlap = function(events, idx) {
        events.forEach((e, i) => {
            if (i < idx && _isOverlap(this.start, e.getStart(), this.end, e.getEnd())) {
                this.setOverlap();
                if (e.countOverlap() > 0) {
                    e.getOverlap().forEach((eo, io) => {
                        if (io < idx && _isOverlap(this.start, eo.getStart(), this.end, eo.getEnd())) {
                            this.addOverlap(eo);
                        }
                    });                    
                } else { 
                    this.addOverlap(e);
                }
                this.left = this.countOverlap() * 200;
            }
        });
        return this;
    }

    return CalendarEvent;

    function _isOverlap(s, ss, e, ee) {
        return s >= ss && e <= ee || s <= ss && e >= ee || s >= ss && s <= ee || s >= ss && e <= ee;
    }

})();