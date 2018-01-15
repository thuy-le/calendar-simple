var layOutDay = (
    function() {

        'use strict';

        const DAY_START = 9; //Calendar starts from 9AM
        const DAY_END = 21; // Calendar ends at 9PM
        const CONTAINER_HEIGHT = 720;

        return function(events, settings) {
            settings = settings || {
                dayStart: DAY_START,
                dayEnd: DAY_END,
                containerHeight: CONTAINER_HEIGHT                
            };

            var c = new Calendar(events, settings);
            c.render();
        }
    }
)();

window.onload = function() {
    /* Add your logic here */
    layOutDay([{start: 30, end: 150}, {start: 30, end: 150}, {start: 540, end: 600}, {start: 560, end: 620}, {start: 610, end: 670}]);
}
