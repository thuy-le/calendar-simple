var Validator = (function() {

    'use strict';

    // Validator
    function Validator(schema) {
        this.schema = schema;
    }

    Validator.prototype.notNull = function() {
        if (this.validationError != null) return this;
        
        if (this.schema == null || this.schema == undefined) {
            this.validationError = new Error(this.schema + " cannot be null");
        }
        
        return this;
    }

    Validator.prototype.range = function(startLabel, endLabel, minRange, maxRange) {
        if (this.validationError != null) return this;

        startLabel = startLabel || "start";
        endLabel = endLabel || "end";
        
        if (this.schema[startLabel] == null || this.schema[endLabel] == null) {
            this.validationError = new Error("invalid range");
        }
        
        if (parseInt(this.schema[startLabel]) > parseInt(this.schema[endLabel])) {
            this.validationError = new Error("invalid range: [" + this.schema[startLabel] + "," + this.schema[endLabel] + "]");
        }

        if (parseInt(this.schema[startLabel]) < minRange || parseInt(this.schema[endLabel]) > maxRange) {
            this.validationError = new Error("invalid range: out of bound [" + this.schema[startLabel] + "," + this.schema[endLabel] + "]");
        }
        
        return this;
    }

    Validator.prototype.array = function() {
        if (this.validationError != null) return this;
        
        if (!(this.schema instanceof Array)) {
            this.validationError = new Error("not an array");
        }
        
        return this;
    }

    Validator.prototype.validate = function() {        
        if (this.validationError) {
            throw this.validationError
        }
    }

    return Validator;
})();
