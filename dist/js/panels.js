"use strict";

function swipePanels(){

    var panels = document.querySelector('.panels'),
        jsPrefixes = ['', 'Webkit', 'Moz', 'ms'],
        transform = "transform",
        prefix;

    jsPrefixes.forEach(function(jsPrefix){
        if(!prefix && jsPrefix+transform in panels.style){
            prefix = jsPrefix;
        }
    });

    var coords = {},
        isSwiping = false;

    var getCoords = function(touch){
        return {x: touch.pageX, y: touch.pageY };
    };

    panels.addEventListener('touchstart', function(e){
        var touch = e.touches[0];
        coords = getCoords(touch);
    });

    panels.addEventListener('touchmove', function(e){
        var touch = e.touches[0],
            movingCoords = getCoords(touch),
            diff = {
                x: movingCoords.x - coords.x,
                y: movingCoords.y - coords.y
            };
        console.log(diff);
    });

    panels.addEventListener('touchend', function(e){
        isSwiping = false;
    });


}

swipePanels();