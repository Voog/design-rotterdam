/**
 * Auto-growing textareas; technique ripped from Facebook
 *
 * http://github.com/jaz303/jquery-grab-bag/tree/master/javascripts/jquery.autogrow-textarea.js
 */
(function($)
{
    $.fn.autogrow = function(options)
    {
        return this.filter('textarea').each(function()
        {
            var self         = this;
            var $self        = $(self);
            var minHeight    = $self.height();
            var noFlickerPad = $self.hasClass('autogrow-short') ? 0 : parseInt($self.css('lineHeight')) || 0;

            var shadow = $('<div></div>').css({
                position:    'absolute',
                top:         -10000,
                left:        -10000,
                width:       $self.width(),
                fontSize:    $self.css('fontSize'),
                fontFamily:  $self.css('fontFamily'),
                fontWeight:  $self.css('fontWeight'),
                lineHeight:  $self.css('lineHeight'),
                resize:      'none',
          'word-wrap': 'break-word'
            }).appendTo(document.body);

            var update = function(event)
            {
                var times = function(string, number)
                {
                    for (var i=0, r=''; i<number; i++) r += string;
                    return r;
                };

                var val = self.value.replace(/</g, '&lt;')
                                    .replace(/>/g, '&gt;')
                                    .replace(/&/g, '&amp;')
                                    .replace(/\n$/, '<br/>&nbsp;')
                                    .replace(/\n/g, '<br/>')
                                    .replace(/ {2,}/g, function(space){ return times('&nbsp;', space.length - 1) + ' ' });

        // Did enter get pressed?  Resize in this keydown event so that the flicker doesn't occur.
        if (event && event.data && event.data.event === 'keydown' && event.keyCode === 13) {
          val += '<br />';
        }

                shadow.css('width', $self.width());
                shadow.html(val + (noFlickerPad === 0 ? '...' : '')); // Append '...' to resize pre-emptively.
                $self.height(Math.max(shadow.height() + noFlickerPad, minHeight));
            }

            $self.change(update).keyup(update).keydown({event:'keydown'},update);
            $(window).resize(update);

            update();
        });
    };
})(jQuery);

/*! overthrow - An overflow:auto polyfill for responsive design. - v0.7.0 - 2013-11-04

* Copyright (c) 2013 Scott Jehl, Filament Group, Inc.; Licensed MIT */
/*! Overthrow. An overflow:auto polyfill for responsive design. (c) 2012: Scott Jehl, Filament Group, Inc. http://filamentgroup.github.com/Overthrow/license.txt */
(function( w, undefined ){

  var doc = w.document,
    docElem = doc.documentElement,
    enabledClassName = "overthrow-enabled",

    // Touch events are used in the polyfill, and thus are a prerequisite
    canBeFilledWithPoly = "ontouchmove" in doc,

    // The following attempts to determine whether the browser has native overflow support
    // so we can enable it but not polyfill
    nativeOverflow =
      // Features-first. iOS5 overflow scrolling property check - no UA needed here. thanks Apple :)
      "WebkitOverflowScrolling" in docElem.style ||
      // Test the windows scrolling property as well
      "msOverflowStyle" in docElem.style ||
      // Touch events aren't supported and screen width is greater than X
      // ...basically, this is a loose "desktop browser" check.
      // It may wrongly opt-in very large tablets with no touch support.
      ( !canBeFilledWithPoly && w.screen.width > 800 ) ||
      // Hang on to your hats.
      // Whitelist some popular, overflow-supporting mobile browsers for now and the future
      // These browsers are known to get overlow support right, but give us no way of detecting it.
      (function(){
        var ua = w.navigator.userAgent,
          // Webkit crosses platforms, and the browsers on our list run at least version 534
          webkit = ua.match( /AppleWebKit\/([0-9]+)/ ),
          wkversion = webkit && webkit[1],
          wkLte534 = webkit && wkversion >= 534;

        return (
          /* Android 3+ with webkit gte 534
          ~: Mozilla/5.0 (Linux; U; Android 3.0; en-us; Xoom Build/HRI39) AppleWebKit/534.13 (KHTML, like Gecko) Version/4.0 Safari/534.13 */
          ua.match( /Android ([0-9]+)/ ) && RegExp.$1 >= 3 && wkLte534 ||
          /* Blackberry 7+ with webkit gte 534
          ~: Mozilla/5.0 (BlackBerry; U; BlackBerry 9900; en-US) AppleWebKit/534.11+ (KHTML, like Gecko) Version/7.0.0 Mobile Safari/534.11+ */
          ua.match( / Version\/([0-9]+)/ ) && RegExp.$1 >= 0 && w.blackberry && wkLte534 ||
          /* Blackberry Playbook with webkit gte 534
          ~: Mozilla/5.0 (PlayBook; U; RIM Tablet OS 1.0.0; en-US) AppleWebKit/534.8+ (KHTML, like Gecko) Version/0.0.1 Safari/534.8+ */
          ua.indexOf( "PlayBook" ) > -1 && wkLte534 && !ua.indexOf( "Android 2" ) === -1 ||
          /* Firefox Mobile (Fennec) 4 and up
          ~: Mozilla/5.0 (Mobile; rv:15.0) Gecko/15.0 Firefox/15.0 */
          ua.match(/Firefox\/([0-9]+)/) && RegExp.$1 >= 4 ||
          /* WebOS 3 and up (TouchPad too)
          ~: Mozilla/5.0 (hp-tablet; Linux; hpwOS/3.0.0; U; en-US) AppleWebKit/534.6 (KHTML, like Gecko) wOSBrowser/233.48 Safari/534.6 TouchPad/1.0 */
          ua.match( /wOSBrowser\/([0-9]+)/ ) && RegExp.$1 >= 233 && wkLte534 ||
          /* Nokia Browser N8
          ~: Mozilla/5.0 (Symbian/3; Series60/5.2 NokiaN8-00/012.002; Profile/MIDP-2.1 Configuration/CLDC-1.1 ) AppleWebKit/533.4 (KHTML, like Gecko) NokiaBrowser/7.3.0 Mobile Safari/533.4 3gpp-gba
          ~: Note: the N9 doesn't have native overflow with one-finger touch. wtf */
          ua.match( /NokiaBrowser\/([0-9\.]+)/ ) && parseFloat(RegExp.$1) === 7.3 && webkit && wkversion >= 533
        );
      })();

  // Expose overthrow API
  w.overthrow = {};

  w.overthrow.enabledClassName = enabledClassName;

  w.overthrow.addClass = function(){
    if( docElem.className.indexOf( w.overthrow.enabledClassName ) === -1 ){
      docElem.className += " " + w.overthrow.enabledClassName;
    }
  };

  w.overthrow.removeClass = function(){
    docElem.className = docElem.className.replace( w.overthrow.enabledClassName, "" );
  };

  // Enable and potentially polyfill overflow
  w.overthrow.set = function(){

    // If nativeOverflow or at least the element canBeFilledWithPoly, add a class to cue CSS that assumes overflow scrolling will work (setting height on elements and such)
    if( nativeOverflow ){
      w.overthrow.addClass();
    }

  };

  // expose polyfillable
  w.overthrow.canBeFilledWithPoly = canBeFilledWithPoly;

  // Destroy everything later. If you want to.
  w.overthrow.forget = function(){

    w.overthrow.removeClass();

  };

  // Expose overthrow API
  w.overthrow.support = nativeOverflow ? "native" : "none";

})( this );

(function( w, o, undefined ){

  // o is overthrow reference from overthrow-polyfill.js
  if( o === undefined ){
    return;
  }

  // Easing can use any of Robert Penner's equations (http://www.robertpenner.com/easing_terms_of_use.html). By default, overthrow includes ease-out-cubic
  // arguments: t = current iteration, b = initial value, c = end value, d = total iterations
  // use w.overthrow.easing to provide a custom function externally, or pass an easing function as a callback to the toss method
  o.easing = function (t, b, c, d) {
    return c*((t=t/d-1)*t*t + 1) + b;
  };

  // tossing property is true during a programatic scroll
  o.tossing = false;

  // Keeper of intervals
  var timeKeeper;

  /* toss scrolls and element with easing

  // elem is the element to scroll
  // options hash:
    * left is the desired horizontal scroll. Default is "+0". For relative distances, pass a string with "+" or "-" in front.
    * top is the desired vertical scroll. Default is "+0". For relative distances, pass a string with "+" or "-" in front.
    * duration is the number of milliseconds the throw will take. Default is 100.
    * easing is an optional custom easing function. Default is w.overthrow.easing. Must follow the easing function signature

  */
  o.toss = function( elem, options ){
    o.intercept();
    var i = 0,
      sLeft = elem.scrollLeft,
      sTop = elem.scrollTop,
      // Toss defaults
      op = {
        top: "+0",
        left: "+0",
        duration: 50,
        easing: o.easing,
        finished: function() {}
      },
      endLeft, endTop, finished = false;

    // Mixin based on predefined defaults
    if( options ){
      for( var j in op ){
        if( options[ j ] !== undefined ){
          op[ j ] = options[ j ];
        }
      }
    }

    // Convert relative values to ints
    // First the left val
    if( typeof op.left === "string" ){
      op.left = parseFloat( op.left );
      endLeft = op.left + sLeft;
    }
    else {
      endLeft = op.left;
      op.left = op.left - sLeft;
    }
    // Then the top val
    if( typeof op.top === "string" ){

      op.top = parseFloat( op.top );
      endTop = op.top + sTop;
    }
    else {
      endTop = op.top;
      op.top = op.top - sTop;
    }

    o.tossing = true;
    timeKeeper = setInterval(function(){
      if( i++ < op.duration ){
        elem.scrollLeft = op.easing( i, sLeft, op.left, op.duration );
        elem.scrollTop = op.easing( i, sTop, op.top, op.duration );
      }
      else{
        if( endLeft !== elem.scrollLeft ){
          elem.scrollLeft = endLeft;
        } else {
          // if the end of the vertical scrolling has taken place
          // we know that we're done here call the callback
          // otherwise signal that horizontal scrolling is complete
          if( finished ) {
            op.finished();
          }
          finished = true;
        }

        if( endTop !== elem.scrollTop ){
          elem.scrollTop = endTop;
        } else {
          // if the end of the horizontal scrolling has taken place
          // we know that we're done here call the callback
          if( finished ) {
            op.finished();
          }
          finished = true;
        }

        o.intercept();
      }
    }, 1 );

    // Return the values, post-mixin, with end values specified
    return { top: endTop, left: endLeft, duration: o.duration, easing: o.easing };
  };

  // Intercept any throw in progress
  o.intercept = function(){
    clearInterval( timeKeeper );
    o.tossing = false;
  };

})( this, this.overthrow );

(function( w, o, undefined ){

  // o is overthrow reference from overthrow-polyfill.js
  if( o === undefined ){
    return;
  }

  o.scrollIndicatorClassName = "overthrow";

  var doc = w.document,
    docElem = doc.documentElement,
    // o api
    nativeOverflow = o.support === "native",
    canBeFilledWithPoly = o.canBeFilledWithPoly,
    configure = o.configure,
    set = o.set,
    forget = o.forget,
    scrollIndicatorClassName = o.scrollIndicatorClassName;

  // find closest overthrow (elem or a parent)
  o.closest = function( target, ascend ){
    return !ascend && target.className && target.className.indexOf( scrollIndicatorClassName ) > -1 && target || o.closest( target.parentNode );
  };

  // polyfill overflow
  var enabled = false;
  o.set = function(){

    set();

    // If nativeOverflow or it doesn't look like the browser canBeFilledWithPoly, our job is done here. Exit viewport left.
    if( enabled || nativeOverflow || !canBeFilledWithPoly ){
      return;
    }

    w.overthrow.addClass();

    enabled = true;

    o.support = "polyfilled";

    o.forget = function(){
      forget();
      enabled = false;
      // Remove touch binding (check for method support since this part isn't qualified by touch support like the rest)
      if( doc.removeEventListener ){
        doc.removeEventListener( "touchstart", start, false );
      }
    };

    // Fill 'er up!
    // From here down, all logic is associated with touch scroll handling
      // elem references the overthrow element in use
    var elem,

      // The last several Y values are kept here
      lastTops = [],

      // The last several X values are kept here
      lastLefts = [],

      // lastDown will be true if the last scroll direction was down, false if it was up
      lastDown,

      // lastRight will be true if the last scroll direction was right, false if it was left
      lastRight,

      // For a new gesture, or change in direction, reset the values from last scroll
      resetVertTracking = function(){
        lastTops = [];
        lastDown = null;
      },

      resetHorTracking = function(){
        lastLefts = [];
        lastRight = null;
      },

      // On webkit, touch events hardly trickle through textareas and inputs
      // Disabling CSS pointer events makes sure they do, but it also makes the controls innaccessible
      // Toggling pointer events at the right moments seems to do the trick
      // Thanks Thomas Bachem http://stackoverflow.com/a/5798681 for the following
      inputs,
      setPointers = function( val ){
        inputs = elem.querySelectorAll( "textarea, input" );
        for( var i = 0, il = inputs.length; i < il; i++ ) {
          inputs[ i ].style.pointerEvents = val;
        }
      },

      // For nested overthrows, changeScrollTarget restarts a touch event cycle on a parent or child overthrow
      changeScrollTarget = function( startEvent, ascend ){
        if( doc.createEvent ){
          var newTarget = ( !ascend || ascend === undefined ) && elem.parentNode || elem.touchchild || elem,
            tEnd;

          if( newTarget !== elem ){
            tEnd = doc.createEvent( "HTMLEvents" );
            tEnd.initEvent( "touchend", true, true );
            elem.dispatchEvent( tEnd );
            newTarget.touchchild = elem;
            elem = newTarget;
            newTarget.dispatchEvent( startEvent );
          }
        }
      },

      // Touchstart handler
      // On touchstart, touchmove and touchend are freshly bound, and all three share a bunch of vars set by touchstart
      // Touchend unbinds them again, until next time
      start = function( e ){

        // Stop any throw in progress
        if( o.intercept ){
          o.intercept();
        }

        // Reset the distance and direction tracking
        resetVertTracking();
        resetHorTracking();

        elem = o.closest( e.target );

        if( !elem || elem === docElem || e.touches.length > 1 ){
          return;
        }

        setPointers( "none" );
        var touchStartE = e,
          scrollT = elem.scrollTop,
          scrollL = elem.scrollLeft,
          height = elem.offsetHeight,
          width = elem.offsetWidth,
          startY = e.touches[ 0 ].pageY,
          startX = e.touches[ 0 ].pageX,
          scrollHeight = elem.scrollHeight,
          scrollWidth = elem.scrollWidth,

          // Touchmove handler
          move = function( e ){

            var ty = scrollT + startY - e.touches[ 0 ].pageY,
              tx = scrollL + startX - e.touches[ 0 ].pageX,
              down = ty >= ( lastTops.length ? lastTops[ 0 ] : 0 ),
              right = tx >= ( lastLefts.length ? lastLefts[ 0 ] : 0 );

            // If there's room to scroll the current container, prevent the default window scroll
            if( ( ty > 0 && ty < scrollHeight - height ) || ( tx > 0 && tx < scrollWidth - width ) ){
              e.preventDefault();
            }
            // This bubbling is dumb. Needs a rethink.
            else {
              changeScrollTarget( touchStartE );
            }

            // If down and lastDown are inequal, the y scroll has changed direction. Reset tracking.
            if( lastDown && down !== lastDown ){
              resetVertTracking();
            }

            // If right and lastRight are inequal, the x scroll has changed direction. Reset tracking.
            if( lastRight && right !== lastRight ){
              resetHorTracking();
            }

            // remember the last direction in which we were headed
            lastDown = down;
            lastRight = right;

            // set the container's scroll
            elem.scrollTop = ty;
            elem.scrollLeft = tx;

            lastTops.unshift( ty );
            lastLefts.unshift( tx );

            if( lastTops.length > 3 ){
              lastTops.pop();
            }
            if( lastLefts.length > 3 ){
              lastLefts.pop();
            }
          },

          // Touchend handler
          end = function( e ){

            // Bring the pointers back
            setPointers( "auto" );
            setTimeout( function(){
              setPointers( "none" );
            }, 450 );
            elem.removeEventListener( "touchmove", move, false );
            elem.removeEventListener( "touchend", end, false );
          };

        elem.addEventListener( "touchmove", move, false );
        elem.addEventListener( "touchend", end, false );
      };

    // Bind to touch, handle move and end within
    doc.addEventListener( "touchstart", start, false );
  };

})( this, this.overthrow );

(function( w, undefined ){

  // Auto-init
  w.overthrow.set();

}( this ));

/* Form placeholders */
(function($) {
    var EdicyFormPlaceholders = function(el) {
        this.$el = $(el);
        this.init();
    };

    EdicyFormPlaceholders.prototype = {
        init: function() {
            $('.form_field').each($.proxy(function(idx, field) {
                if ($(field).find('input[type="text"]').length > 0) {
                    $(field).find('input[type="text"]').attr('placeholder', $(field).find('label').text());
                    $(field).find('label').hide();
                    if ($.fn.placeholder) {
                        $(field).find('input[type="text"]').placeholder();
                    }
                }
                if ($(field).find('textarea').length > 0) {
                    $(field).find('textarea').attr('placeholder', $(field).find('label').text());
                    $(field).find('label').hide();
                    if ($.fn.placeholder) {
                        $(field).find('textarea').placeholder();
                    }
                }
            }, this));
        }
    };

    $.fn.edicyFormPlaceholders = function () {
        return this.each(function () {
            var data = $(this).data('edicyFormPlaceholders');
            if (!data) {
                $(this).data('edicyFormPlaceholders', new EdicyFormPlaceholders(this));
            }
        });
    };
})(jQuery);

/* STEADY.JS */
function Steady(opts) {
  if ( !opts ) throw new Error('missing options');
  if ( !opts.handler ) throw new Error('missing handler parameter');


  this.scrollElement = opts.scrollElement || window;
  this.conditions = opts.conditions || {};
  this.handler   = opts.handler;
  this.values    = {};
  this.tracked   = {};
  this.success   = false;
  this.throttleVal = opts.throttle || 100;
  this.processing = false;
  this.stopped = false;


  this._parse();

  if ( this.scrollElement.hasOwnProperty('scrollY') ) {
    this._addBottom();
    this._addScrollX();
    this._addScrollY();
  } else {
    this._addBottomEl();
    this._addScrollTop();
    this._addScrollLeft();
  }

  this._addWidth();
  this._onScroll();

}


Steady.prototype.addCondition = function(name, value) {
  this.conditions[name] = value;
  this._parse();
};
Steady.prototype.removeCondition = function(name) {
  delete this.conditions[name];
  this._parse();
};
Steady.prototype.addTracker  = function(name, fn) {
  this.tracked[name] = { cb: fn, name: name};
};

Steady.prototype._addScrollX = function() {
  this.addTracker('scrollX', function(window) {
    return window.scrollX;
  });
};
Steady.prototype._addScrollY = function() {
  this.addTracker('scrollY', function(window) {
    return window.scrollY;
  });
};

Steady.prototype._addBottom = function() {
  this.addTracker('bottom', function(window) {
    var height = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight, 
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    );
    return height - (window.scrollY + window.innerHeight);
  });
};

Steady.prototype._addBottomEl = function() {
  var self = this;
  this.addTracker('bottom', function(window) {
    var height = Math.max(
      self.scrollElement.scrollHeight,
      self.scrollElement.offsetHeight
    );
    return height - ( self.scrollElement.scrollTop + self.scrollElement.offsetHeight);
  });
};

Steady.prototype._addScrollTop = function() {
  var self = this;
  this.addTracker('scrollTop', function(window) {
    return self.scrollElement.scrollTop;
  });
};

Steady.prototype._addScrollLeft = function() {
  var self = this;
  this.addTracker('scrollLeft', function(window) {
    return self.scrollElement.scrollLeft;
  });
};

Steady.prototype._addWidth = function() {
  this.addTracker('width', function(window) {
    return window.innerWidth;
  });
};


Steady.prototype._parse = function() {
  this._parsed = {};
  this._wantedTrackers = [];
  this._parsedMax = {};
  this._parsedMin = {};

  for ( var condition in this.conditions ) {
    if( !this.conditions.hasOwnProperty(condition) ) continue;
    
    var operator = condition.substr(0, 4);

    switch(operator) {
      case 'min-':
        this._wantedTrackers.push(condition.substr(4, condition.length));
        this._parsedMin[condition.substr(4, condition.length)] = this.conditions[condition];
        break;
      case 'max-':
        this._wantedTrackers.push(condition.substr(4, condition.length));
        this._parsedMax[condition.substr(4, condition.length)] = this.conditions[condition];
        break;
      default:
        this._wantedTrackers.push(condition);
        this._parsed[condition] = this.conditions[condition];
    }

  }
};

Steady.prototype._check = function() {
  var results = [];
  
  for( var name in this.values ) {
    if ( this._parsed.hasOwnProperty(name) ) {
      results.push( this._parsed[name] == this.values[name] );
    }
    if ( this._parsedMin.hasOwnProperty(name) ) {
      results.push( this._parsedMin[name] <= this.values[name] ); 
    }

    if ( this._parsedMax.hasOwnProperty(name) ) {
      results.push( this._parsedMax[name] >= this.values[name] );
    }
  }

  if ( results.length && results.indexOf(false) == -1 ) {
    this.processing = true;

    var cb = this._done.bind(this);
    window.requestAnimationFrame(this.handler.bind(this, this.values, cb));
  }
};

Steady.prototype._done = function() {
  this.processing = false;
};

Steady.prototype._onScroll = function() {
  this._onScrollHandler = this._throttledHandler();
  this.scrollElement.addEventListener('scroll', this._onScrollHandler, false);
};

Steady.prototype._throttledHandler = function() {
  var self = this;
  return this.throttle(function(e) {

    if ( !self._wantedTrackers.length || self.processing ) return;
    
    for (var i = 0; i < self._wantedTrackers.length; i++) {

      if ( !self.tracked[self._wantedTrackers[i]] ) continue;

      self.values[self._wantedTrackers[i]] = self.tracked[self._wantedTrackers[i]].cb(window);
    }
    
    window.requestAnimationFrame(self._check.bind(self));
  }, this.throttleVal);
};

Steady.prototype.stop = function() {
  if ( ! this.stopped  ) {
    this.scrollElement.removeEventListener('scroll', this._onScrollHandler, false);
    this.stopped = true;
  }
};

Steady.prototype.resume = function() {
  if ( this.stopped  ) 
    this._onScroll();
    this.stopped = false;
};


// i use it to avoid calling the onscroll function many times.
Steady.prototype.throttle = function(fn, delay) {
  var timer;

  return function () {
    var context = this;
    var args = arguments;

    if ( timer ) return;

    timer = true;
    setTimeout(function () {
      fn.apply(context, args);
      timer = false;
    }, delay);
  };
};


if (typeof module === 'object' && module.exports) {
  module.exports = Steady;
}

/* General JS */
;(function($) {
    var wrapTables = function() {
        if (!$('.content-formatted table').parent().hasClass('table-container overthrow')) {
            $('.content-formatted table').wrap('<div class="table-container overthrow"></div>');
        }
    };

    var toggleMainMenu = function() {
        $('.js-menu-toggle').click(function() {
            $(this).toggleClass('open');
            $('.mobile-menu').toggleClass('expanded');
        });
    };

    var toggleLangMenu = function() {
        $('#lang-menu-toggle').click(function(event) {
            event.stopPropagation();
            $('#toggleable-lang-menu').toggleClass('expanded');
        });
    };

    var handlePopoverMenuHide = function() {
        $("html").click(function(event) {
            var $t = $(event.target);
            if ((!$t.closest('.mobile-menu').length > 0) && (!$t.closest('.toggle-btn').length > 0)) {
                if ($(".mobile-menu").hasClass('expanded')) {
                    $(".mobile-menu").removeClass('expanded');
                    $('.js-menu-toggle').removeClass('open');
                }
            }
        });
    };

    var handleSubMenuLocation = function() {
        if($(window).width() <= 999){
            $('.sidebar-left').prependTo('.content-top .content-first');
        } else {
            $('.sidebar-left').prependTo('.content-top');
        }
    };

    var checkScrollBar = function() {
        jQuery.fn.hasScrollBar = function(direction) {
            if (direction == 'vertical') {
                return this.get(0).scrollHeight > this.innerHeight();
            } else if (direction == 'horizontal') {
                return this.get(0).scrollWidth > this.innerWidth();
            }
            return false;
        }
    };

    var handleTableHorizontalScrolling = function() {
        $.each($('.table-container'), function() {
            if ($(this).hasScrollBar('horizontal') === true) {
                $(this).addClass('horizontal-scroll');
            } else {
                $(this).removeClass('horizontal-scroll');
            }
        });
    };

    var handleWindowResize = function() {
        $(window).resize(function() {
            handleSubMenuLocation();
            handleTableHorizontalScrolling();
        });
    };

    // Initiations
    var initFrontPage = function() {
        initStickyElements({
            stickyHeader: true,
            stickyMobileMenu: true,
            stickyFooter: true,
            stickyPostHeaders: true
        });
    };
    var initCommonPage = function() {
        initStickyElements({
            stickyHeader: true,
            stickyMobileMenu: true,
            stickyFooter: false,
            stickyPostHeaders: false
        });
        if ($.fn.autogrow) {
            $('.form_field_textarea').autogrow();
        }
    };
    var initArticlePage = function() {
        initStickyElements({
            stickyHeader: true,
            stickyMobileMenu: true,
            stickyFooter: false,
            stickyPostHeaders: false
        });
        if ($.fn.autogrow) {
            $('.form_field_textarea').autogrow();
        }
    };
    var initBlogPage = function() {
        initStickyElements({
            stickyHeader: true,
            stickyMobileMenu: true,
            stickyFooter: true,
            stickyPostHeaders: true
        });
    };

    var initStickyElements = function(opts) {
        var stickyHeader = opts.stickyHeader || false;
        var stickyMobileMenu = opts.stickyMobileMenu || false;
        var stickyFooter = opts.stickyFooter || false;
        var stickyPostHeaders = opts.stickyPostHeaders || false;
        var startScroll,
            toHandler,
            endScroll,
            scrolled,
            container = $('.container'),
            header = $('.header'),
            footer = $('.footer'),
            headerStaticArea = $(header).height() + 90,
            headerStaticHeight = headerStaticArea + 40,
            footerStaticArea = $(footer).height() + 90,
            footerStaticHeight = footerStaticArea + 40;
        var s = new Steady({
            conditions: {
                'min-scrollY': 0
            },
            throttle: 25,
            handler: function (values, done) {
                if (!startScroll) {
                    startScroll = $(window).scrollTop();
                } else {
                    endScroll = $(window).scrollTop();
                    scrolled = endScroll - startScroll;
                    if (window.innerWidth < 640 && stickyMobileMenu) {
                        if (scrolled > 5 && startScroll > headerStaticArea) {
                            $('.topbar').addClass('fixed').css({'top' : -headerStaticArea});
                        } else if (scrolled < -5 && startScroll > headerStaticArea) {
                            $('.topbar').addClass('fixed').css({'top' : 0});
                        } else if (scrolled < 0 && startScroll <= 100 && $('.topbar').hasClass('fixed') === true) {
                            $(container).css({'margin-top' : 0});
                            $('.topbar').removeClass('fixed');
                        }
                    }
                    if (window.innerWidth > 640 && stickyFooter) {
                        // up and above footer
                        if (scrolled < -5 && (startScroll + window.innerHeight) < ($('html').height())) {
                            $(footer).addClass('footer-fixed footer-animated').css({'bottom' : 0});
                            $(footer).css({'left' : $('.container').offset().left});
                            $(container).css({'margin-bottom' : footerStaticArea});
                        // down and above footer
                        } else if (scrolled > 5 && (startScroll + window.innerHeight) < ($('html').height())) {
                            $(footer).removeClass('footer-fixed footer-animated').css({'bottom': -footerStaticArea});
                            $('body').removeClass('voog-search-visible');
                            $(container).css({'margin-bottom' : 0});
                        }
                    }
                    // Scrolling down and offset is larger than
                    if (stickyHeader) {
                        if (scrolled > 5 && startScroll > headerStaticArea) {
                            $(header).addClass('header-fixed').css({'top' : -headerStaticArea});
                            $(container).css({'margin-top' : headerStaticArea});

                        // Up and fixed area
                        } else if (scrolled < -5 && startScroll > headerStaticArea) {
                            $(header).addClass('header-fixed header-animated').css({'top' : 0});

                        // Up, static area and header is fixed
                        } else if (scrolled < 0 && startScroll <= headerStaticArea && $(header).hasClass('header-fixed') === true) {
                            $(header).removeClass('header-fixed header-animated');
                            $(container).css({'margin-top' : 0});
                        }
                    }
                    startScroll = 0;
                }
                if (window.innerWidth > 640 && stickyPostHeaders) {
                    var posts = this.tracked;
                    $('.post').each(function(n, el) {
                        var offset = 30;
                        var $header = $(el).find('.post-header');
                        var topBoundary = 0 + offset
                        var bottomBoundary = -($(el).height() - offset - $header.height());
                        // scroll is between top and bottom of the .post

                        if (posts[n].cb() < topBoundary) {
                            // scroll is inside .post
                            if (posts[n].cb() > bottomBoundary) {
                                $header.removeClass('top bottom');
                                $(el).addClass('fixed-header');
                            // scroll is below .post
                            } else {
                                $header.addClass('bottom').removeClass('top');
                                $(el).removeClass('fixed-header');
                            }
                        // scroll is above .post
                        } else {
                            $header.addClass('top').removeClass('bottom');
                            $(el).removeClass('fixed-header');
                        }
                    });
                }
                done();
            }
        });

        $('.post').each(function(n, el) {
            s.addTracker(n, function(window) {
                var rect = el.getBoundingClientRect();
                return rect.top;
            });
        });

        s.stop();
        setTimeout(function() {
            s.resume();
        }, 200);

        $(window).on('load resize', function() {s.handler({}, function(){});})
    };


    var init = function() {
        toggleMainMenu();
        toggleLangMenu();
        handlePopoverMenuHide();
        handleWindowResize();
        wrapTables();
        if ($('.table-container').length > 0) {
            checkScrollBar();
            handleTableHorizontalScrolling();
        }
        $('.content form').edicyFormPlaceholders();
    };

    window.site = $.extend(window.site || {}, {
        initFrontPage: initFrontPage,
        initCommonPage: initCommonPage,
        initBlogPage: initBlogPage,
        initArticlePage: initArticlePage
    });

    init();
})(jQuery);
