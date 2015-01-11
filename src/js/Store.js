var dispatcher = require('./Dispatcher').getInstance();

var StoreProto = {
    get: function(key, defaultValue){
        if(!this.__store){
            this.__store = {};
        }
        var ret = this.__store[key];
        if(ret === undefined){
            return defaultValue;
        }
        return ret;
    },
    set: function(key, val){
        if(!this.__store){
            this.__store = {};
        }
        if(Array.isArray(key)) {
            return key.forEach(this.set, this);
        }
        if(typeof key === 'object') {
            val = key;
            key = val._id;
        }
        this.__store[key] = val;
        dispatcher.dispatch();
        return this; //chaining
    },
    keys: function(){
        return this.__store && Object.keys(this.__store);
    }
};

var instance;

module.exports = {
    getInstance: function(){
        if(!instance){
            instance = Object.create(StoreProto);
        }
        return instance;
    },
    createStore: function(mixin){
        var store = Object.create(StoreProto);
        return store;
    }
};