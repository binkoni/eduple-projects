var app = app || {};

window.addEventListener("load", function() {
app.canvas = document.getElementById("canvas");
app.canvas.width = 100;
app.canvas.height = 100;
app.canvas.style.backgroundColor = "blue";
});

/*
app.Id = {};
app.Id.lastId = 0;

app.Id.generate = function() {
    if(app.Id.lastId == Number.MAX_SAFE_INTEGER)
        app.Id.lastId = 0;
    ++app.Id.lastId;
    return Date.now() + "" + app.Id.lastId;
};

app.Entity = function(id) {
    this.id = id;
    this.components = {};
};

app.Entity.prototype.addComponent = function(component) {
    this.components[component.name] = component;
    component.entityMap.set(this.id, this);
    return this;
};

app.Entity.prototype.removeComponent = function(component) {
    component.entityMap.delete(this.id);
    delete this.components[component.name];
    return this;
};



app.Component = function(name, entityMap) {
    this.name = name;
    this.entityMap = entityMap;
};

app.Position = function(entityMap, params) {
    app.Component.call(this, "position", entityMap);
    this.x = params.x || 0;
    this.y = params.y || 0;
};

app.Position.prototype = Object.create(app.Component.prototype);
app.Position.prototype.constructor = app.Position;

app.Movement = function(entityMap, params) {
    app.Component.call(this, "movement", entityMap);
    this.velX = params.velX || 0;
    this.velY = params.velY || 0;
    this.accX = params.accX || 0;
    this.accY = params.accY || 0;
};


app.Movement.prototype = Object.create(app.Component.prototype);
app.Movement.prototype.constructor = app.Movement;

app.Visual = function(entityMap, params) {
    app.Component.call(this, "visual", entityMap);
};

app.Control = function(entityMap, params) {
    app.Component.call(this, "control", entityMap);
};

app.Control.prototype = Object.create(app.Component.prototype);
app.Control.prototype.constructor = app.Control;

app.CameraDeath = function(entityMap) {
    app.Component.call(this, "cameraDeath", entityMap);
};
app.CameraDeath.prototype = Object.create(app.Component.prototype);
app.CameraDeath.prototype.constructor = app.CameraDeath;

app.Map = function() {
    this.map = [];
};

app.Map.prototype.set = function(key, value) {
    this.map[key] = value;
    return this;
};

app.Map.prototype.delete = function(key) {
    delete this.map[key];
    return this;
};

app.Map.prototype.forEach = function(callback) {
    for(var key in this.map)
        callback(key, this.map[key]);
    return this;
};

app.CompositeMap = function(maps) {
    this.map = [];
    this.maps = [];
    for(var index = 0; index < maps.length; ++index)
        this.maps[index] = maps[index];
};


app.CompositeMap.prototype.get = function(key) {
    var firstElement = this.map[key];
    for(var index in this.maps) {
        if(firstElement == undefined || this.maps[index][key] != firstElement)
            return null;
    }
    return firstElement;
};

app.CompositeMap.prototype.delete = function(key) {
    delete this.map[key];
    for(var index in this.maps)
        delete this.maps[index][key];
    return this;
};

app.CompositeMap.prototype.forEach = function(callback) {
    for(var key in this.map)
        callback(key, this.map[key]);
    return this;
};

app.resizeCanvas = function() {
    app.canvas.width = document.body.offsetWidth;
    app.canvas.height = document.body.offsetHeight;
};

app.handleControl = function(controls, downKeys) {
    controls.forEach(function(id, entity) {
        if(downKeys[37])
            entity.components["movement"].accX = -5;
        if(downKeys[38])
            entity.components["movement"].accY = -5;
        if(downKeys[39])
            entity.components["movement"].accX = 5;
        if(downKeys[40])
            entity.components["movement"].accY = 5;
    });
};

app.handleMovement = function(movements) {
    movements.forEach(function(id, entity) {
        eneity.components["movement"].velX += entity.components["movement"].accX;
        entity.components["movement"].accX = 0;
        entity.components["position"].x += entity.components["movement"].velX;
        entity.components["movement"].velY += entity.components["movement"].accY;
        entity.components["movement"].accY = 0;
        entity.components["position"].y += entity.components["movement"].velY;
    });
};

app.handleCameraDeath = function(cameraDeaths, camera, canvas) {
    cameraDeaths.forEach(function(id, entity) {
        if(entity.components["position"].x - camera.x < 0 ||
            entity.components["position"].x - camera.x > canvas.width ||
            entity.components["position"].y - camera.y < 0 ||
            entity.components["position"].y - camera.y > canvas.height) {
            entity.destroyed = true;
	}
    });
};

app.update = function() {
    for(var i = 0; i < 10; ++i) {
        var e = new app.Entity(app.Id.generate());
        e.addComponent(new app.Control(app.controls))
        .addComponent(new app.Position(app.positions, {x: Math.random()0 * app.canvas.width}))
        .addComponent(new app.Visual(app.visuals))
        .addComponent(new app.CameraDeath(app.CameraDeaths));
    }
    app.handleControl(app.controls, app.downKeys);
    app.handleMovement(app.movements);
    app.handleCameraDeath(app.cameraDeaths, app.camera, app.canvas);
};

app.render = function(canvas, visuals, interpolation, camera) {
    var canvasContext = canvas.getContext("2d");
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    visuals.forEach(function(id, entity) {
        canvasContext.fillRect(entity.components["position"].x + entity.components["movement"].velX * interpolation - camera.x,
                                entity.components["position"].y + entity.components["movement"].velY * interpolation - camera.y);
    });
};

app.loop = function() {
    while(app.nextUpdateTimeStamp < Date.now()) {
        app.update();
        app.nextUpdateTimeStamp += app.updateTimeStep;
    }
    var interpolation = (Date.now() + app.updateTimeStep - app.nextUpdateTimeStamp) / app.updateTimeStep;
    app.render(app.canvs, app.visuals, interpolation, app.camera);
    requestAnimationFrame(app.loop);
};

app.init = function() {
    app.downKeys = [];
    app.updateTimeStep = 1000 / 25;
    app.canvas = document.getElementById("canvas");
    app.canvas.style.backgroundColor = "gray";
    document.body.appendChild(app.canvas);
    app.canvasContexct = app.canvas.getContext("2d");
    window.addEventListener("resize", app.resizeCanvas);
    window.addEventListener("keydown", function(event) {
        app.downKeys[event.keyCode] = true;
    };
    window.addEventListener("keyup", function(event) {
        app.downKeys[event.keyCode] = false;
    });
    app.camera = {x: 0, y: 0};
    app.resizeCanvas();
    app.positions = new app.Map();
    app.movements = new app.CompositeMap([app.positions]);
    app.visuals = new app.CompositeMap([app.positions]);
    app.controls = new app.CompositeMap([app.movements]);
    app.cameraDeaths = new app.CompositeMap([app.positions]);
    app.nextUpdateTimeStamp = Date.now();
    app.loop();
};
*/
