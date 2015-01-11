var React = require('react'),
    dispatcher = require('./Dispatcher').getInstance(),
    store = require('./Store').getInstance(),
    PanelGroup = require('./PanelGroup');

store.set('starred', {
    items: [{
            label: "@wrreed-bot",
            count: 4
        },
        "#bugs",
        "@chris",
        "#dev",
        "#general",
        "#ideas",
        "#invite",
        "@jakob",
        "#marketing",
        "@nick",
        "@nikita",
        "#progress",
        "@preslav",
        "@vithushan"
    ]
});

store.set('chat', {
    items: [
        "@alex",
        "@ben",
        "@brendan",
        "@carlos",
        "@cdubbs",
        "@kerry",
        "@seva"
    ]
});

store.set('channels', {
    items: [
        "#ecm",
        "#invites"
    ]});

store.set('channelData',{
    items: [
        {user: "CP", text: "Hey Kerry, I'm looking forward to presenting at the project day in January. Preparation is all complete :)"},
        {user: "KB", text: "Awesome, can't wait to see it!"}
    ],
    title: "#ECM",
    type: "Read Only",
    members: ['@cpresc', '@test1', '@test2']
});

var app;

dispatcher.on('*', function() {
    if (app) app.forceUpdate();
});

if (window) {
    window._store = store;
}

app = React.render(React.createElement(PanelGroup), document.body);
