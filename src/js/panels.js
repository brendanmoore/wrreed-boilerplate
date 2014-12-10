"use strict";
/* jshint browser: true */
function swipePanels(){

    if ( !window.requestAnimationFrame ) {

        window.requestAnimationFrame = ( function() {

            return window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {

                window.setTimeout( callback, 1000 / 60 );

            };

        } )();

    }

    var home = document.querySelector('.home'),
        detail = document.querySelector('.detail'),
        panels = document.querySelector('.panels'),
        pageIndicator = document.querySelector('.page-indicator'),
        menuTrigger = document.querySelector('.menu-trigger'),
        backTrigger = document.querySelector('.back-trigger'),
        menus = panels.querySelectorAll('.panel-menu'),
        dots = Array.prototype.slice.call(pageIndicator.children),
        jsPrefixes = ['', 'webkit', 'moz', 'ms'],
        transform = "transform",
        transition = "transition",
        prefix;

    if( !('transform' in panels.style) ){
        jsPrefixes.forEach(function(jsPrefix){
            if(!prefix && jsPrefix+"Transform" in panels.style){
                prefix = jsPrefix;
            }
        });
    }

    if(prefix){
        transform = prefix + 'Transform';
        transition = prefix + 'Transition';
    }

    var width,
        coords = {},
        delta,
        isScrolling = false,
        isSwiping = false,
        isMoving = false,
        menuOpen = false,
        detailShowing = false,
        pos = 0;

    var getCoords = function(touch){
        return {x: touch.pageX, y: touch.pageY };
    };

    var movePanel = function(){
        if(!isMoving){
            panels.parentNode.classList.add('moving');
            isMoving = true;
        }
        if(delta){
            var val = (pos * 100 * -1) + (delta.x/(width/3) * 100);
            panels.style[transition] = 'none';
            console.log(val, transform);
            panels.style[transform] = 'translate3d('+val+ 'vw, 0, 0)';
        }
    };

    var finish = function(){
        panels.style[transition] = null;
        if(delta && Math.abs(delta.x) > 60){
            //we move scroll left!;
            if(delta.x < -1){
                pos = pos === 2 ? pos : pos + 1;
            }else{
                pos = pos === 0 ? pos : pos - 1;
            }
        }
        var val = pos * 100 * -1;
        panels.style[transform] = 'translate3d('+val+ 'vw, 0, 0)';
        setPageIndicator(pos);
    };

    var finished = function(){
        panels.parentNode.classList.remove('moving');
        isMoving = false;
    }

    var setPageIndicator = function(i){
        dots.forEach(function(dot){
            dot.classList.remove('active');
        });
        dots[i].classList.add('active');
    };

    var debounce = function(func, wait, immediate) {
        var timeout, result;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) result = func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) result = func.apply(context, args);
            return result;
        };
    };

    var toggleMenu = function(){
        var val = menuOpen ? 0 : (menus[pos].offsetHeight + 50);
        menus[pos].style[transform] = 'translate3d(0, ' + val + 'px, 0)';
        menuOpen = !menuOpen;
    }

    var finishedScrolling = debounce(function(e){
        isScrolling = false;
        console.log('finishedScrolling');
    }, 300);

    panels.addEventListener('scroll', function(e){
        isScrolling = true;
        finishedScrolling(e);
    }, true);

    panels.addEventListener('touchstart', function(e){
        var touch = e.touches[0];
        coords = getCoords(touch);
        width = panels.offsetWidth;
    });

    panels.addEventListener('touchmove', function(e){
        if(isScrolling || menuOpen || detailShowing) return;

        var touch = e.touches[0],
            movingCoords = getCoords(touch);

        delta = {
            x: movingCoords.x - coords.x,
            y: movingCoords.y - coords.y
        };
        if(Math.abs(delta.x) > 10){
            isSwiping = true;
        }
        if(isSwiping){
            e.preventDefault();
            e.stopPropagation();
            window.requestAnimationFrame(function(){
                movePanel(delta);
            });
        }
    });

    var transitionend;
    if('onWebkitTransitionEnd' in window){
        transitionend = 'webkitTransitionEnd';
    }else{
        transitionend = 'transitionend';
    }

    panels.addEventListener(transitionend, function(e){
        finished();
    });

    panels.addEventListener('touchend', function(e){
        isSwiping = false;
        if(isMoving){
            finish();
        }
        delta = null;
        coords = null;
    });

    menuTrigger.addEventListener('click', function(e){
        if(!isMoving){
            toggleMenu();
        }
        e.stopPropagation();
    });

    var toggleDetail = function(){
        if(isScrolling || isSwiping || isMoving) return;

        if(!detailShowing) scrollChannelText();

        var val = (detailShowing ? 0 : 100) * -1,
            style = 'translate3d('+val+'vw,0,0)';

        detail.style[transform] = style;
        home.style[transform] = style;
        detailShowing = !detailShowing;
    };

    document.addEventListener('click', function(e){
        console.log(e);
        if(e.target.tagName === 'A'){
            toggleDetail();
        }
    });

    backTrigger.addEventListener('click', function(e){
        toggleDetail();
        e.stopPropagation();
    });

    var scrollChannelText = function(){
        var discussion = detail.querySelector('.text-list');
        if(discussion && discussion.lastElementChild){
            discussion.lastElementChild.scrollIntoView();
        }
    };

    var addMessage = function(text){
        if(!text) return;
        console.log(text);
        var li = document.createElement('li');
        li.innerHTML = '<article class="text-list-bubble right">'+text+'</article>';
        li.className = 'text-list-item right';
        detail.querySelector('.text-list').appendChild(li);
    }

    var sendMessage = function(){
        var input = document.querySelector('.panel-footer-input');
        addMessage(input.value);
        scrollChannelText();
        input.value = "";
    }

    document.querySelector('.send-trigger').addEventListener('click', function(e){
        sendMessage();
    });


    // function toggleFullScreen() {
    //   var doc = window.document;
    //   var docEl = doc.documentElement;

    //   var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    //   var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

    //   if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
    //     requestFullScreen.call(docEl);
    //   }
    //   else {
    //     cancelFullScreen.call(doc);
    //   }
    // }

    // toggleFullScreen();

}

module.exports = swipePanels;