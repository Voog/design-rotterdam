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

                if (scrolled > 5 && startScroll > headerStaticArea) {
                    // Scrolling down and offset is larger than
                    $(header).addClass('header-fixed').css({'top' : -headerStaticArea});
                    $(container).css({'margin-top' : headerStaticArea});
                } else if (scrolled < -5 && startScroll > headerStaticArea) {
                    // Up and fixed area
                    $(header).addClass('header-fixed header-animated').css({'top' : 0});
                } else if (scrolled < 0 && startScroll <= 50 && $(header).hasClass('header-fixed') === true) {
                    // Up, static area and header is fixed
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
    var initFrontPage = function() {
    };

    var initCommonPage = function() {
    };

    var initBlogPage = function() {
    };

    var initArticlePage = function() {
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
