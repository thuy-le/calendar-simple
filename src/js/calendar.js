var Calendar = (
    function() {

        'use strict';

        // Calendar
        function Calendar(events, settings) {
            this.events = events;
            this.dayStart = settings.dayStart;
            this.dayEnd = settings.dayEnd;
            this.containerHeight = settings.containerHeight;
            this.init();
        }

        Calendar.prototype.init = function() {
            this.dayStartInMinute = this.dayStart * 60;
            this.dayEndInMinute = this.dayEnd * 60;
            this.validate();
            this.buildTemplate();
            this.convertEvents();
            console.log(this.calendarEvents);
        }

        Calendar.prototype.render = function() {
            var html = "";
            var eventUnitHeight = this.containerHeight / (this.dayEndInMinute - this.dayStartInMinute);

            this.calendarEvents.forEach((e, index) => {
                var t = e.start;
                var h = eventUnitHeight * (e.end - e.start);
                var l = e.getOffset() * e.getWidth();

                var style = `style='top: ${t}px; height: ${h}px; left: ${l}%; width: calc(${e.getWidth()}% - 26px)'`;

                html += `<div class='event' ${style}>`;
                html += `<span class='title'>Sample Item ${e.id}</span><br/>`;
                html += `<span>Sample Location ${e.start} ${e.end}</span>`;
                html += `</div>`;
            });

            document.getElementById("calendar-scheduler").innerHTML = html;
        }

        Calendar.prototype.convertEvents = function() {
            var manager = new CalendarEventManager(this.events);
            this.calendarEvents = manager.buildEvents();
        }

        Calendar.prototype.validate = function() {
            (new Validator(this.events)).array().validate();
            this.events.forEach(e => (new Validator(e))
                .notNull()
                .range(null,null,0,this.dayEndInMinute-this.dayStartInMinute)
                .validate()
            );
        }

        Calendar.prototype.buildTemplate = function() {
            var self = this;
            
            var hours = Array.from({length: this.dayEnd - this.dayStart}, (x, i) => i + this.dayStart);
            var blocks = hours.map(h => self.buildHourBlock(h));            

            var templateHtml = "";

            templateHtml += "<div class='calendar-timer'>";
            hours.forEach((h) => {
                var time = Util.convert24HourTime(h);
                var blockHtml = self.buildHourBlock(time.hour, time.indicator);
                templateHtml += blockHtml;
            });
            templateHtml += "</div>";

            templateHtml += "<div id='calendar-scheduler'>";
            templateHtml += "</div>"

            document.getElementById("calendar").innerHTML = templateHtml;
        }

        Calendar.prototype.buildHourBlock = function(hour, indicator) {
            var minutes = Array.from({length: 60}, (x, i) => i + 1);
            var htmlBlock = "";
            htmlBlock += "<div class='calendar-timer-block'>";
            
            htmlBlock += "<div class='timer'>";
            htmlBlock += "<span class='time'>" + hour + ":00" + "</span>";
            htmlBlock += "<span class='indicator'>" + indicator + "</span>";
            htmlBlock += "</div>"

            htmlBlock += "<div class='timer-center'>";
            htmlBlock += "<span class='time'>" + hour + ":30" + "</span>";
            htmlBlock += "</div>";

            htmlBlock += "</div>";
            return htmlBlock;
        }

        return Calendar;

    }
)();
