var EventEmitter = require('events').EventEmitter;

var DispatcherProto = {
    _ee: new EventEmitter(),
    _isDispatching: false,
    dispatch: function(){
        if(this._isDispatching) return;
        var self = this;
        this._isDispatching = true;
        process.nextTick(function(){
            self.emit('*');
            self._isDispatching = false;
        });
    },
    emit: function(){
        var args = Array.prototype.slice.call(arguments);

        this._ee.emit.apply(this._ee, args);
        // console.log('emitting...', args);
        if(evt !== '*'){
            var evt = args.splice(0,1, '*');
            this._ee.emit.apply(this._ee, args);
        }
    },
    on: function(event, listener){
        // console.log('addingListener', event);
        this._ee.addListener(event, listener);
    },
    off: function(event, listener){
        this._ee.removeListener(event, listener);
    }
};

var instance;

module.exports.getInstance = function(){
        if(!instance){
            instance = Object.create(DispatcherProto);
            console.log(instance);
        }
        return instance;
};
