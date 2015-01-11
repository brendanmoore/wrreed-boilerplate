var Promise = require('es6-promise').Promise,
    headers = {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
    };

function xhr(url, method, data){

    return new Promise(function(resolve, reject){

        var x = new XMLHttpRequest();
        x.open((method || 'get').toUpperCase(), url, true);
        x.addEventListener('load', function(e){
            var resp = x.responseText ? JSON.parse(x.responseText) : null;
            resolve(resp);
        });
        x.onerror = function(){
            reject(x);
        };
        Object.keys(headers).forEach(function(h){
            x.setRequestHeader(h, headers[h]);
        });

        x.send(data ? JSON.stringify(data) : undefined);
    });


}

module.exports = xhr;