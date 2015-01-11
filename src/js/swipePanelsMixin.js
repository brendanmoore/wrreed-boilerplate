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

var jsPrefixes = ['', 'webkit', 'moz', 'ms'],
    transform = "transform",
    transition = "transition",
    prefix;

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

/**
 * If we are doing a native scroll (vertically) we want to prevent our swipe
 * code from being able to run, only after a short delay after the scroll is
 * finished do we remove the flag.
 */
var finishedScrolling = debounce(function(e){
    isScrolling = false;
    //console.log('finishedScrolling');
}, 300);

var transitionend;
if('onWebkitTransitionEnd' in window){
    transitionend = 'webkitTransitionEnd';
}else{
    transitionend = 'transitionend';
}



module.exports = {
    /**
     * Once the manual swiping is over we calculate whether or not the
     * swipe distance was enough to trigger a panel change. This panel
     * change is handle by the native CSS transition.
     */
     finish: function(el){
        var state = {style: {}};
            el.style[transition] = null;
        if(delta && Math.abs(delta.x) > 60){
            //we move scroll left!;
            if(delta.x < -1){
                pos = pos === 2 ? pos : pos + 1;
            }else{
                pos = pos === 0 ? pos : pos - 1;
            }
        }
        var val = pos * 100 * -1;
        el.style[transform] = 'translate3d('+val+ 'vw, 0, 0)';
        state.activePanel = pos;
        this.setState(state);
        // setPageIndicator(pos);
    },

    finished: function(){
        this.setState({'moving': false});
        isMoving = false;
    },

    /**
     * Here we manually move the panel via updates from the `touchmove` event
     * so we have to set `transition: none` in order to prevent the jank!
     */
    movePanel: function(el){
        var state = {};
        if(!isMoving){
            //setting a helper class and flag in order to prevent
            //accidental triggering of other navigation elements.
            state.moving = true;
            isMoving = true;
        }
        if(delta){
            state.style = {};
            var val = (pos * 100 * -1) + (delta.x/(width/3) * 100);
            //Make sure we dont overscroll left...
            if(val > 0){
                val = 0;
            }
            //Make sure we dont overscroll right...
            if(val < -200){
                val = -200;
            }
            el.style[transition] = 'none';
            el.style[transform] = 'translate3d('+val+ 'vw, 0, 0)';
        }
        this.setState(state);
    },
    componentDidMount: function(){


        var el = this.refs.topLevelPanels.getDOMNode(),
            self = this;

        width = el.offsetWidth;

        if( !('transform' in el.style) ){
            jsPrefixes.forEach(function(jsPrefix){
                if(!prefix && jsPrefix+"Transform" in el.style){
                    prefix = jsPrefix;
                }
            });
        }

        if(prefix){
            transform = prefix + 'Transform';
            transition = prefix + 'Transition';
        }

        el.addEventListener('scroll', function(e){
            isScrolling = true;
            finishedScrolling(e);
        }, true);

        el.addEventListener('touchstart', function(e){
            var touch = e.touches[0];
            coords = getCoords(touch);
        });

        el.addEventListener('touchmove', function(e){
            if(isScrolling || self.state.menuOpen || detailShowing) return;

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
                //Using requestAnimationFrame ensures a smooth swiping action
                //while the touchmove or `swipe` is being performed.
                window.requestAnimationFrame(function(){
                    self.movePanel(el);
                });
            }
        });

        el.addEventListener(transitionend, function(e){
            self.finished();
        });

        el.addEventListener('touchend', function(e){
            isSwiping = false;
            if(isMoving){
                self.finish(el);
            }
            delta = null;
            coords = null;
        });


    }
}