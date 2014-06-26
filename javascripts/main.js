;(function($) {
    var wrapTables = function() {
        $('.content-formatted table').wrap('<div class="table-container overthrow"></div>');
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
        $("html").click(function() {
            if ($("#toggleable-lang-menu").hasClass("expanded")) {
                $("#toggleable-lang-menu").removeClass("expanded");
            }
        });
    };

    var handleHeaderPosition = function() {
        var startScroll,
            toHandler,
            endScroll,
            scrolled,
            container = $('.container'),
            header = $('.header'),
            headerStaticArea = $(header).height() + 90,
            headerStaticHeight = headerStaticArea + 40;


        $(window).on("scroll", function(){
            if (!startScroll) {
                startScroll = $(window).scrollTop();
            } else {
                endScroll = $(window).scrollTop();
                scrolled = endScroll - startScroll;

                // Scrolling down and offset is larger than
                if (scrolled > 5 && startScroll > headerStaticArea) {
                    $(header).addClass('header-fixed').css({'top' : -headerStaticArea});
                    $(container).css({'margin-top' : headerStaticArea});

                // Up and fixed area
                } else if (scrolled < -5 && startScroll > headerStaticArea) {
                    $(header).addClass('header-fixed header-animated').css({'top' : 0});

                // Up, static area and header is fixed
                } else if (scrolled < 0 && startScroll <= 50 && $(header).hasClass('header-fixed') === true) {
                    $(header).removeClass('header-fixed header-animated');
                    $(container).css({'margin-top' : 0});
                }
                startScroll = 0;
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
    var initFrontPage = function() {};
    var initCommonPage = function() {};
    var initArticlePage = function() {};
    var initBlogPage = function() {
        var startScroll,
            toHandler,
            endScroll,
            scrolled,
            container = $('.container'),
            header = $('.header'),
            headerStaticArea = $(header).height() + 90,
            headerStaticHeight = headerStaticArea + 40;

        var s = new Steady({
            conditions: {
                'min-scrollY': 0
            },
            throttle: 25,
            handler: function (values, done) {
                var pos = this.tracked;
                if (!startScroll) {
                    startScroll = $(window).scrollTop();
                } else {
                    endScroll = $(window).scrollTop();
                    scrolled = endScroll - startScroll;

                    // Scrolling down and offset is larger than
                    if (scrolled > 5 && startScroll > headerStaticArea) {
                        $(header).addClass('header-fixed').css({'top' : -headerStaticArea});
                        $(container).css({'margin-top' : headerStaticArea});

                    // Up and fixed area
                    } else if (scrolled < -5 && startScroll > headerStaticArea) {
                        $(header).addClass('header-fixed header-animated').css({'top' : 0});

                    // Up, static area and header is fixed
                    } else if (scrolled < 0 && startScroll <= 50 && $(header).hasClass('header-fixed') === true) {
                        $(header).removeClass('header-fixed header-animated');
                        $(container).css({'margin-top' : 0});
                    }
                    startScroll = 0;
                }
                $('.post').each(function(n, el) {
                    var offset = 30;
                    var $header = $(el).find('.post-header');
                    var topBoundary = 0 + offset
                    var bottomBoundary = -($(el).height() - offset - $header.height());
                    // scroll is between top and bottom of the .post

                    if (pos[n].cb() < topBoundary) {
                        // scroll is inside .post
                        if (pos[n].cb() > bottomBoundary) {
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
                done();
            }
        });

        window.steady = s;

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
    };


    var init = function() {
        toggleMainMenu();
        toggleLangMenu();
        handlePopoverMenuHide();
        handleHeaderPosition();
        handleWindowResize();
        wrapTables();
        if ($('.table-container').length > 0) {
            checkScrollBar();
            handleTableHorizontalScrolling();
        }
    };

    window.site = $.extend(window.site || {}, {
        initCommonPage: initFrontPage,
        initCommonPage: initCommonPage,
        initBlogPage: initBlogPage,
        initArticlePage: initArticlePage
    });

    init();
})(jQuery);
