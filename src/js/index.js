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
    layOutDay([
        {start: 479, end: 627}, 
        {start: 282, end: 613},
        {start: 81, end: 125}, 
        {start: 355, end: 643},
        {start: 195, end: 305}, 
        {start: 460, end: 675},
        {start: 618, end: 719}, 
        // {start: 30, end: 150},
        // {start: 30, end: 150}, 
        // {start: 30, end: 150}, 
        // {start: 540, end: 600}, 
        // {start: 560, end: 620}, 
        // {start: 610, end: 670}
    ]);
}
