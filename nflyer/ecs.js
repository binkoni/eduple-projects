var ECS = ECS || {};

ECS.IdGenerator = function() {
    this.lastId = 0;
};

ECS.IdGenerator.prototype.generate = function() {
    if(this.lastId == this.lastId + 1)
        this.lastId = 0;
    ++this.lastId;
    return Date.now() + "" + this.lastId;
};

ECS._Entity = function(id) {
    this.id = id;
    this.components = {};
};

ECS.Component = function(componentName) {
    this.componentName = componentName;
};

ECS.System = function(systemName) {
    this.systemName = systemName;
    this.entities = {};
};

ECS.System.prototype.needsEntity = function(entity) {
   throw Error("Method not implemented")
};

ECS.System.prototype.entityDestroyed = function(entity) {
    delete this.entities[entity.id];
};

ECS.System.prototype.componentAdded = function(entity) {
    if(this.needsEntity(entity))
        this.entities[entity.id] = entity;
};

ECS.System.prototype.componentRemoved = function(entity) {
    if(!this.needsEntity(entity))
        delete this.entities[entity.id];
};

ECS.System.prototype.process = function() {
    throw Error("Method not implemented")
}

ECS.Manager = function(idGenerator) {
    this.idGenerator = idGenerator || new ECS.IdGenerator();
    this.entities = {};
    this.systems = {};
};

ECS.Manager.prototype.createEntity = function() {
    var id = this.idGenerator.generate();
    var entity = new ECS._Entity(id);
    this.entities[id] = entity;
    return entity;
};

ECS.Manager.prototype.destroyEntity = function(id) {
    for(var index in this.systems)
        this.systems[index].entityDestroyed(this.entities[id]);
    delete this.entities[id];
};

ECS.Manager.prototype.addComponent = function(entity, component) {
    entity.components[component.componentName] = component;
    for(var index in this.systems)
        this.systems[index].componentAdded(entity);
};

ECS.Manager.prototype.removeComponent = function(entity, componentName) {
    delete entity.components[componentName];
    for(var index in this.systems)
        this.systems[index].componentRemoved(entity);
};

ECS.Manager.prototype.addSystem = function(system) {
    this.systems[system.systemName] = system;
};

ECS.Manager.prototype.removeSystem = function(systemName) {
    delete this.system[systemName];
};

ECS.Manager.prototype.processEntities = function() {
   for(var index in this.systems)
	this.systems[index].process()
}
