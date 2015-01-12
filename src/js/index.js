var React = require('react'),
    dispatcher = require('./Dispatcher').getInstance(),
    store = require('./Store').getInstance(),
    PanelGroup = require('./PanelGroup'),
    xhr = require('./xhr');


var app;

dispatcher.on('*', function() {
    if (app) app.forceUpdate();
});


xhr('/chat').then(function(data){
    store.set('chat', data);
});

xhr('/starred').then(function(data){
    store.set('starred', data);
});

xhr('/channels').then(function(data){
    store.set('channels', data);
});

xhr('/channelData').then(function(data){
    store.set('channelData', data);
});


if (window) {
    window._store = store;
}

app = React.render(React.createElement(PanelGroup), document.body);
