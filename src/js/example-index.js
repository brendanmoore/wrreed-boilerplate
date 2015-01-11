var swipePanels = require('./panels-native'),
    xhr = require('./xhr'),
    dispatcher = require('./Dispatcher').getInstance();
dispatcher.on('*', function(){
    console.log(arguments);
});
swipePanels();