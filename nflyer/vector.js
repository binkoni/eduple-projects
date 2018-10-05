var vec2 = vec2 || {};

vec2.Vector = function(x, y) {
    this.x = x;
    this.y = y;
};

vec2.Vector.fromAngle = function(angle, magnitude) {
    return new vec2.Vector(magnitude * Math.cos(angle), magnitude * Math.sin(angle));
};

vec2.Vector.clone = function(vector) {
    return new vec2.Vector(vector.x, vector.y);
};

vec2.Vector.add = function(vector1, vector2) {
    return new vec2.Vector(vector1.x + vector2.x, vector1.y + vector2.y);
};

vec2.Vector.subtract = function(vector1, vector2) {
    return new vec2.Vector(vector1.x - vector2.x, vector1.y - vector2.y);
};

vec2.Vector.multiply = function(vector, scalar) {
    return new vec2.Vector(vector.x * scalar, vector.y * scalar);
};

vec2.Vector.prototype.clone = function() {
    return new vec2.Vector(this.x, this.y);
};

vec2.Vector.prototype.set = function(vector) {
    this.x = vector.x;
    this.y = vector.y;
    return this;
};

vec2.Vector.prototype.setCoords = function(x, y) {
    this.x = x;
    this.y = y;
    return this;
};

vec2.Vector.prototype.getMagnitude = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
};

vec2.Vector.prototype.getAngle = function() {
    return Math.atan2(this.y, this.x);
};

vec2.Vector.prototype.setAngle = function(angle) {
    var magnitude = this.getMagnitude();
    this.x = magnitude * Math.cos(angle);
    this.y = magnitude * Math.sin(angle);
    return this;
};

vec2.Vector.prototype.setMagnitude = function(magnitude) {
    var angle = this.getAngle();
    this.x = magnitude * Math.cos(angle);
    this.y = magnitude * Math.sin(angle);
    return this;
};

vec2.Vector.prototype.add = function(vector) {
    this.x += vector.x;
    this.y += vector.y;
    return this;
};

vec2.Vector.prototype.subtract = function(vector) {
    this.x -= vector.x;
    this.y -= vector.y;
    return this;
};

vec2.Vector.prototype.multiply = function(scalar) {
    this.x *= scalar;
    this.y *= scalar;
    return this;
};
