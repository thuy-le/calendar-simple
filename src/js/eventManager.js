var CalendarEventManager = (function() {

    function CalendarEventManager(events) {
        this.events = events;
    }

    CalendarEventManager.prototype.init = function() {
        this.calendarEvents = this.events.map((e, idx) => new CalendarEvent(e.start, e.end, idx));
    }

    CalendarEventManager.prototype.calcOverlap = function() {
        this.calendarEvents = this.calendarEvents.map((currEvt) => {
            this.calendarEvents.forEach(evt => {
                if (evt.getId() < currEvt.getId() && this.isOverlap(currEvt, evt)) {
                    currEvt.addOverlap(evt);
                }
            });
            return currEvt;
        });
    }

    CalendarEventManager.prototype.isOverlap = function(ce, e) {
        return Util.isOverlap(ce.start, e.start, ce.end, e.end);
    }

    CalendarEventManager.prototype.buildEvents = function() {
        this.init();
        this.calcOverlap();
        this.calendarEvents = this.calendarEvents.map((e) => e.calcOffset());
        this.calendarEvents = this.calendarEvents.map((e) => e.calcWidth(this.calendarEvents));
        return this.calendarEvents;
    }

    return CalendarEventManager;

    function _addUnique(evts, el) {
        if (!evts.some((e) => e.getId() === el.getId())) {
            evts.push(el);
        }
    }

})();