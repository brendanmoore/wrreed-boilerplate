var express = require('express');


var app = express();

var chatData = {
    items: [
        "@alex",
        "@ben",
        "@brendan",
        "@carlos",
        "@cdubbs",
        "@kerry",
        "@seva"
    ]
};

var starredData = {
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
};

var channels = {
    items: [
        "#ecm",
        "#invites"
    ]};

var channelData = {
    items: [
        {user: "CP", text: "Hey Kerry, I'm looking forward to presenting at the project day in January. Preparation is all complete :)"},
        {user: "KB", text: "Awesome, can't wait to see it!"},
        {user: "KB", text: "Awesome, can't wait to see it!"},
        {user: "KB", text: "Awesome, can't wait to see it!"},
        {user: "KB", text: "Awesome, can't wait to see it!"}
    ],
    title: "#ECM",
    type: "Read Only",
    members: ['@cpresc', '@test1', '@test2']
};

app.use('', express.static(__dirname + '/www'));

app.get('/chat', function(req, res){
    res.send(chatData);
});

app.get('/starred', function(req, res){
    res.send(starredData);
});

app.get('/channels', function(req, res){
    res.send(channels);
});

app.get('/channelData', function(req, res){
    res.send(channelData);
});

app.listen(8001);