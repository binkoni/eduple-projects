var app = app || {};

app.IdGenerator = function() {
    this.lastId = 0;
};

app.IdGenerator.prototype.generate = function() {
    if(this.lastId == this.lastId + 1)
        this.lastId = 0;
    ++this.lastId;
    return Date.now() + "" + this.lastId;
};

app.Entity = function(id) {
    this.id = id;
    this.components = {};
};

app.Component = function(componentName) {
    this.componentName = componentName;
};

app.System = function(systemName) {
    this.systemName = systemName;
    this.entities = {};
};

app.System.prototype.needsEntity = function(entity) {
    return false;
};

app.System.prototype.entityDestroyed = function(entity) {
    delete this.entities[entity.id];
};

app.System.prototype.componentAdded = function(entity) {
    if(this.needsEntity(entity))
        this.entities[entity.id] = entity;
};

app.System.prototype.componentRemoved = function(entity) {
    if(!this.needsEntity(entity))
        delete this.entities[entity.id];
};

app.Ecs = function(idGenerator) {
    this.idGenerator = idGenerator;
    this.entities = {};
    this.systems = {};
};

app.Ecs.prototype.createEntity = function() {
    var id = this.idGenerator.generate();
    this.entities[id] = new app.Entity(id);
};

app.Ecs.prototype.destroyEntity = function(id) {
    for(var index in this.systems)
        this.systems[index].entityDestroyed(this.entities[id]);
    delete this.entities[id];
};

app.Ecs.prototype.addComponent = function(entity, component) {
    entity.components[component.componentName] = component;
    for(var index in this.systems)
        this.systems[index].componentAdded(entity);
};

app.Ecs.prototype.removeComponent = function(entity, componentName) {
    delete entity.components[componentName];
    for(var index in this.systems)
        this.systems[index].componentRemoved(entity);
};

app.Ecs.prototype.addSystem = function(system) {
    this.systems[system.systemName] = system;
};

app.Ecs.prototype.removeSystem = function(systemName) {
    delete this.system[systemName];
};
