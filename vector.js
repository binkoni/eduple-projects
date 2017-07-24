var app = app || {};

app.Vector = function(x, y) {
    this.x = x;
    this.y = y;
};

app.Vector.fromAngle = function(angle, magnitude) {
    return new app.Vector(magnitude * Math.cos(angle), magnitude * Math.sin(angle));
};

app.Vector.clone = function(vector) {
    return new app.Vector(vector.x, vector.y);
};

app.Vector.add = function(vector1, vector2) {
    return new app.Vector(vector1.x + vector2.x, vector1.y + vector2.y);
};

app.Vector.subtract = function(vector1, vector2) {
    return new app.Vector(vector1.x - vector2.x, vector1.y - vector2.y);
};

app.Vector.multiply = function(vector, scalar) {
    return new app.Vector(vector.x * scalar, vector.y * scalar);
};

app.Vector.prototype.clone = function() {
    return new app.Vector(this.x, this.y);
};

app.Vector.prototype.set = function(vector) {
    this.x = vector.x;
    this.y = vector.y;
    return this;
};

app.Vector.prototype.setCoords = function(x, y) {
    this.x = x;
    this.y = y;
    return this;
};

app.Vector.prototype.getMagnitude = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
};

app.Vector.prototype.getAngle = function() {
    return Math.atan2(this.y, this.x);
};

app.Vector.prototype.setAngle = function(angle) {
    var magnitude = this.getMagnitude();
    this.x = magnitude * Math.cos(angle);
    this.y = magnitude * Math.sin(angle);
    return this;
};

app.Vector.prototype.setMagnitude = function(magnitude) {
    var angle = this.getAngle();
    this.x = magnitude * Math.cos(angle);
    this.y = magnitude * Math.sin(angle);
    return this;
};

app.Vector.prototype.add = function(vector) {
    this.x += vector.x;
    this.y += vector.y;
    return this;
};

app.Vector.prototype.subtract = function(vector) {
    this.x -= vector.x;
    this.y -= vector.y;
    return this;
};

app.Vector.prototype.multiply = function(scalar) {
    this.x *= scalar;
    this.y *= scalar;
    return this;
};
