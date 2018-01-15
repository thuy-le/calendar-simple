var CalendarEvent = (function() {

    function CalendarEvent(start, end, id) {
        this.start = start; 
        this.end = end;
        this.id = id;
        this.overlapWith = [];
        this.overlap = false;
        this.offset = 0;
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

    CalendarEvent.prototype.addOverlap = function(el) {
        if (!this.overlapWith.some((e) => e.getId() === el.getId())) {
            this.overlapWith.push(el);
        }
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

    CalendarEvent.prototype.getOffset = function() {
        return this.offset;
    }

    CalendarEvent.prototype.getId = function() {
        return this.id;
    }

    CalendarEvent.prototype.getWidth = function() {
        return this.W;
    }

    CalendarEvent.prototype.calcOffset = function(events) {
        events.forEach((e) => {
            if (e.getId() < this.getId() && _isOverlap(this.start, e.getStart(), this.end, e.getEnd())) {
                this.setOverlap();
                this.addOverlap(e);

                var doubleOverlap = [];
                if (e.countOverlap() > 0) {
                    e.getOverlap().forEach((eo) => {
                        if (eo.getId() < this.getId() && _isOverlap(this.start, eo.getStart(), this.end, eo.getEnd())) {
                            doubleOverlap.push(eo);
                        }
                    });

                    if (doubleOverlap.length > 0) {
                        this.offset = (this.countOverlap() + doubleOverlap.length);
                    }

                    [].push.apply(this.overlapWith, doubleOverlap);

                } else {
                    this.offset = this.countOverlap();
                }
            }
        });
        return this;
    }

    CalendarEvent.prototype.calcWidth = function(events) {
        events.forEach((e) => {
            if (e.countOverlap() > 0 && e.getId() !== this.getId()) {
                e.getOverlap().forEach((eo) => {
                    if (eo.getId() === this.getId()) {
                        this.addOverlap(e);
                    }
                });
            }
        });

        var overlapElems = 1;
        if (this.countOverlap() > 0) {
            overlapElems += 1;
            this.getOverlap().forEach(o => {
                if (this.getOverlap().some(e => (e.getId() !== o.getId()) 
                    && _isOverlap(o.getStart(), e.getStart(), o.getEnd(), e.getEnd()))) {
                    overlapElems += 1;
                }
            });
        }

        this.W = 100 / overlapElems;
        return this;
    }

    return CalendarEvent;

    function _isOverlap(s, ss, e, ee) {
        return s >= ss && e <= ee || s <= ss && e >= ee || s >= ss && s <= ee || s >= ss && e <= ee;
    }

    function _Unique(value, index, self) { 
        return self.indexOf(value) === index;
    }

})();