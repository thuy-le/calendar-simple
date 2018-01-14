var Util = (function() {

    'use strict';

    return {
        convert24HourTime: function(hour) {
            var indicator = hour < 12 ? "am" : "pm";
            return {hour: ((hour + 11) % 12 + 1), indicator: indicator};
        }
    };
})();