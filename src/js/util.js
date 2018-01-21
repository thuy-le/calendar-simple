var Util = (function() {

    'use strict';

    return {
        convert24HourTime: function(hour) {
            var indicator = hour < 12 ? "am" : "pm";
            return {hour: ((hour + 11) % 12 + 1), indicator: indicator};
        },
        isOverlap: function(s, ss, e, ee) {
            return s < ss && e > ss || e > ee && s < ee || e > ss && e < ee;
        }
    };
})();