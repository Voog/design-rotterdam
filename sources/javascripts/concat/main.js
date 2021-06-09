'use strict';

/* Form placeholders */
(function ($) {
  var EdicyFormPlaceholders = function (el) {
    this.$el = $(el);
    this.init();
  };

  EdicyFormPlaceholders.prototype = {
    init: function () {
      $('.form_field').each($.proxy(function (idx, field) {
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

/* General JS */
;
(function ($) {
  // ===========================================================================
  // Binds site search functionality.
  // ===========================================================================
  var bindSiteSearch = function (searchForm, languageCode, noResultsString) {
    if (searchForm) {
      var search = new VoogSearch(searchForm, {
        // This defines the number of results per query.
        per_page: 10,
        // Language code for restricting the search to page language.
        lang: languageCode,
        // If given, an DOM element results are rendered inside that element
        resultsContainer: $('.js-voog-search-modal-inner').get(0),
        // Defines if modal should close on sideclick.
        sideclick: true,
        // Mobile checkpoint
        mobileModeWidth: 640,
        // Updates results on every keypress.
        updateOnKeypress: true,
        // String for feedback if no results are found.
        noResults: noResultsString
      });
    }
  };

  // TODO: Remove if Edicy is going to wrap table with the container
  var wrapTables = function () {
    $.each($('.content-formatted table'), function () {
      $(this).wrap('<div class="table-container"></div>');
    });
  };

  var toggleMainMenu = function () {
    $('.js-menu-toggle').click(function () {
      $(this).toggleClass('open');
      $('.mobile-menu').toggleClass('expanded');
      if ($(this).hasClass('open')) {
        $('.js-search').addClass('hidden');
      } else {
        $('.js-search').removeClass('hidden');
      }
    });
  };

  var toggleLangMenu = function () {
    $('#lang-menu-toggle').click(function (event) {
      event.stopPropagation();
      $(this).toggleClass('open');
      $('#toggleable-lang-menu').toggleClass('expanded');
    });
    $('body').on('click', function (event) {
      var $t = $(event.target);
      if ($t.closest('.toggleable-lang-menu').length === 0 && !$t.is('#toggleable-lang-menu')) {
        $('#toggleable-lang-menu').removeClass('expanded');
        $('body').removeClass('voog-search-visible');
      }
      $('#lang-menu-toggle').removeClass('open');
    });
  };

  var handlePopoverMenuHide = function () {
    $('html').click(function (event) {
      var $t = $(event.target);
      if ($t.closest('.mobile-menu').length === 0 && $t.closest('.toggle-btn').length === 0) {
        if ($('.mobile-menu').hasClass('expanded')) {
          $('.mobile-menu').removeClass('expanded');
          $('.js-menu-toggle').removeClass('open');

          if (!$('.js-menu-toggle').hasClass('open')) {
            $('.js-search').removeClass('hidden');
          }
        }
      }
    });
  };

  var handleSearch = function () {
    $('.js-search-reset').click(function (event) {
      event.preventDefault();
      $('body').removeClass('voog-search-visible');
    });

    $('.js-search-open').click(function (event) {
      event.stopPropagation();
      $('body').addClass('voog-search-visible');
      $('.js-search-input').val('').focus();
    });

    $('.js-search-close').click(function (event) {
      $('body').removeClass('voog-search-visible');
    });

    $('.js-search-input').click(function (event) {
      event.stopPropagation();
    });

    $('.js-voog-search-modal-inner').click(function (event) {
      event.stopPropagation();
    });
  };

  var handleWindowResize = function () {
    // Add functions that should be trgiggered while resizing the window here.
    // Example:
    // $(window).resize(debounce(yourFunctionName, 3000));
  };

  // Returns the suitable version of the image depending on the viewport width.
  var getImageByWidth = function (sizes, targetWidth) {
    var prevImage;

    for (var i = 0, max = sizes.length; i < max; i++) {
      if (sizes[i].width < targetWidth) {
        return prevImage || sizes[i];
      }
      prevImage = sizes[i];
    }
    // Makes sure that smallest is returned if all images bigger than targetWidth.
    return sizes[sizes.length - 1];
  };

  var headerBgImageSizesContains = function (sizes, url) {
    for (var i = sizes.length; i--;) {
      if (url.indexOf(sizes[i].url.trim()) > -1) {
        return true;
      }
    }
    return false;
  };

  // Checks the lightness sum of header background image and color and sets the lightness class depending on it's value.
  var handleHeaderImageLightnessClass = function () {
    if (headerBgCombinedLightness >= 0.5) {
      $('.js-background-type').addClass('light-background').removeClass('dark-background');
    } else {
      $('.js-background-type').addClass('dark-background').removeClass('light-background');
    }
  };

  var handleHeaderColorScheme = function (lightness) {
    if (typeof lightness != 'undefined') {
      if (lightness > 0.6) {
        $('.header-wrapper').addClass('light').removeClass('dark');
      } else {
        $('.header-wrapper').addClass('dark').removeClass('light');
      }
    }
  };

  var handlePostMinHeight = function () {
    $(window).ready(function () {
      $('.post').each(function (n, el) {
        var $post = $(el);
        var height = $post.find('.post-header').height();
        $post.find('.post-content').css('min-height', height);
      });
    });
  };

  var focusCommentsWithErrors = function () {
    $(document).ready(function () {
      if ($('.comment-form').hasClass('form_with_errors')) {
        $('html, body').scrollTop($('.comment-form').offset().top);
      } else if ($('form').find('.form_error, .form_notice').length > 0) {
        $('html, body').scrollTop($('.form_error, .form_notice').closest('form').offset().top);
      }
    });
  };

  // Initiations
  var initFrontPage = function (animation) {
    animation = typeof animation == 'undefined' ? false : animation;
    if (animation) {
      initStickyElements({
        stickyHeader: true,
        stickyMobileMenu: true,
        stickyFooter: false,
        stickyPostHeaders: false
      });
    }
  };
  var initCommonPage = function (animation) {
    animation = typeof animation == 'undefined' ? false : animation;
    if (animation) {
      initStickyElements({
        stickyHeader: true,
        stickyMobileMenu: true,
        stickyFooter: false,
        stickyPostHeaders: false
      });
    }
    if ($.fn.autogrow) {
      $('.form_field_textarea').autogrow();
    }
    $(window).ready(function () {
      if (!($.trim($('.content-header').get(0).innerHTML))) {
        $('.content-header').hide();
      }
    });
  };
  var initArticlePage = function (animation) {
    animation = typeof animation == 'undefined' ? false : animation;
    if (animation) {
      initStickyElements({
        stickyHeader: true,
        stickyMobileMenu: true,
        stickyFooter: false,
        stickyPostHeaders: false
      });
    }
    if ($.fn.autogrow) {
      $('.form_field_textarea').autogrow();
    }
  };
  var initBlogPage = function (animation) {
    animation = typeof animation == 'undefined' ? false : animation;
    if (animation) {
      initStickyElements({
        stickyHeader: true,
        stickyMobileMenu: true,
        stickyFooter: true,
        stickyPostHeaders: true
      });
    }
    handlePostMinHeight();
  };

  var initStickyElements = function (opts) {
    var stickyHeader = opts.stickyHeader || false,
      stickyMobileMenu = opts.stickyMobileMenu || false,
      stickyFooter = opts.stickyFooter || false,
      stickyPostHeaders = opts.stickyPostHeaders || false,
      startScroll,
      endScroll,
      scrolled,
      container = $('.container'),
      header = $('.header'),
      footer = $('.footer'),
      headerStaticArea = $(header).height() + 90,
      footerStaticArea = $(footer).height() + 90,
      footerExpandTimeout,
      latestKnownScrollY = 0,
      ticking = false;

    var getPostHeights = function () {
      var posts = $('.post'),
        heights = [];
      posts.each(function (n, el) {
        heights.push(el.getBoundingClientRect().top);
      });
      return heights;
    };

    var handler = function (postHeights) {
      if (!startScroll) {
        startScroll = $(window).scrollTop();
      } else {
        endScroll = $(window).scrollTop();
        scrolled = endScroll - startScroll;
        if (window.innerWidth < 640 && stickyMobileMenu) {
          if (scrolled > 5 && startScroll > headerStaticArea) {
            $('.topbar').addClass('fixed').css({
              'top': -headerStaticArea
            });
          } else if (scrolled < -5 && startScroll > headerStaticArea) {
            $('.topbar').addClass('fixed').css({
              'top': 0
            });
          } else if (scrolled < 0 && startScroll <= 100 && $('.topbar').hasClass('fixed') === true) {
            $(container).css({
              'margin-top': 0
            });
            $('.topbar').removeClass('fixed');
          }
        }
        if (window.innerWidth > 640 && stickyFooter) {
          if ($('.post').eq(0).offset().top - $(window).innerHeight() + 90 < $(document).scrollTop()) {
            if (startScroll + window.innerHeight <= $(document).height() - footerStaticArea - 40) {
              // above footer
              if (scrolled < -5) {
                fixFooter(false);
                // down and above footer
              } else if (scrolled > 5) {
                hideFooter();
              }
            } else {
              // down and below footer + 90px
              resetFooter();
            }
          } else {
            resetFooter();
          }
        }
        if (stickyHeader && $(header).find('.header-inner').height() < 60) {
          // Scrolling down and offset is larger than
          if (scrolled > 5 && startScroll > headerStaticArea) {
            hideHeader();

            // Up and fixed area
          } else if (scrolled < -5 && startScroll > headerStaticArea) {
            fixHeader();
            setTimeout(function () {
              if ($(window).scrollTop() <= headerStaticArea) {
                resetHeader();
              }
            }, 20);

            // Up, static area and header is fixed
          } else if (scrolled < -5 && startScroll <= headerStaticArea) {
            resetHeader();
          }
        }
        startScroll = 0;
      }
      if (window.innerWidth > 640 && stickyPostHeaders) {
        $('.post').each(function (n, el) {
          var offset = 30,
            $header = $(el).find('.post-header'),
            topBoundary = 0 + offset,
            bottomBoundary = -($(el).height() - offset - $header.height());

          // scroll is between top and bottom of the .post
          if (postHeights[n] < topBoundary) {
            // scroll is inside .post
            if (postHeights[n] > bottomBoundary) {
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
    };

    var hideHeader = function () {
      $(header).addClass('header-fixed').css({
        'top': -headerStaticArea
      });
      $(container).css({
        'padding-top': headerStaticArea
      });
    };

    var fixHeader = function () {
      var headerOffset;

      if ($('body').hasClass('edy-checkout-button-visible')) {
        headerOffset = $('.edy-ecommerce-shopping-cart-button').outerHeight();
      } else {
        headerOffset = 0;
      }

      $(header).addClass('header-fixed header-animated').css({
        'top': headerOffset
      });

      $(container).css({
        'padding-top': headerStaticArea
      });
    };

    var resetHeader = function () {
      $(header).removeClass('header-fixed header-animated');
      $(container).css({
        'padding-top': 0
      });
      $('.post.fixed-header').removeClass('fixed-header');
    };

    var hideFooter = function () {
      $(footer).addClass('footer-fixed footer-animated footer-hidden');
      $(footer).css('bottom', -$(footer).outerHeight());
    };

    var resetFooter = function () {
      $(footer).removeClass('footer-fixed footer-animated footer-hidden');
      $('body').removeClass('voog-search-visible');
      $(footer).css({
        'bottom': '',
        'left': ''
      });
      $(container).css({
        'margin-bottom': ''
      });
    };

    var fixFooter = function (expanded) {
      expanded = expanded || false;
      $(footer).addClass('footer-fixed footer-animated');
      $(footer).css({
        'left': $('.container').offset().left,
        'bottom': (expanded ? 0 : (-$(footer).height() + 60))
      });
      $(container).css({
        'margin-bottom': footerStaticArea
      });
    };

    var expandFooter = function (expand) {
      if (expand) {
        if ($(footer).hasClass('footer-fixed')) {
          clearTimeout(footerExpandTimeout);
          fixFooter(true);
          $('footer .gradient-overlay').hide();
        }
      } else {
        if ($('footer').hasClass('footer-fixed')) {
          footerExpandTimeout = setTimeout(function () {
            fixFooter(false);
            $('footer .gradient-overlay').show();
          }, 1500);
        }
      }
    };

    var onScroll = function () {
      latestKnownScrollY = window.scrollY;
      requestTick();
    };

    var requestTick = function () {
      if (!ticking) {
        requestAnimationFrame(update);
      }
      ticking = true;
    };

    var update = function () {
      ticking = false;
      // NOTE: Animated header on mobile screen is too buggy. To fix it a huge
      // refactor is needed. Disableing it is a quicker and less painful method.
      if ($(window).width() > 640) {
        handler(getPostHeights());
      }
    };

    $(window).on('load resize', function () {
      // NOTE: Animated header on mobile screen is too buggy. To fix it a huge
      // refactor is needed. Disableing it is a quicker and less painful method.
      if ($(window).width() > 640) {
        handler(getPostHeights());
      } else {
        $('.container').css({
          'padding-top': '',
          'margin-bottom': ''
        });

        $('.header-fixed').removeClass('header-fixed header-animated').css('top', '');
      }
    }).on('scroll', onScroll);

    $('footer').bind('mouseenter', function () {
      expandFooter(true);
    }).bind('mouseleave', function () {
      expandFooter(false);
    });
  };

  var init = function () {
    toggleMainMenu();
    toggleLangMenu();
    handlePopoverMenuHide();
    handleWindowResize();
    handleSearch();
    wrapTables();
    focusCommentsWithErrors();

    $('.content form').edicyFormPlaceholders();
  };

  // ===========================================================================
  // Sets functions that will be initiated on items list layouts.
  // ===========================================================================
  var initItemsPage = function () {
    bindContentItemImageLazyload();
  };

  // ===========================================================================
  // Toggles product categories visibility in main menu.
  // ===========================================================================
  var bindRootItemSettings = function (rootItemValuesObj) {
    if (!('show_product_related_pages_in_main_menu' in rootItemValuesObj)) {
      rootItemValuesObj.show_product_related_pages_in_main_menu = false;
    }

    $('.js-root-item-settings-toggle').each(function (index, languageMenuSettingsButton) {
      var rootItemSettingsEditor = new Edicy.SettingsEditor(languageMenuSettingsButton, {
        menuItems: [{
          "titleI18n": "show_in_main_menu",
          "type": "checkbox",
          "key": "show_product_related_pages_in_main_menu",
          "states": {
            "on": true,
            "off": false
          }
        }],

        buttonTitleI18n: "settings",

        values: rootItemValuesObj,

        containerClass: ['js-root-item-settings-popover', 'js-prevent-sideclick'],

        preview: function (data) {
          if (!data.show_product_related_pages_in_main_menu === true) {
            $('.js-menu-item-products').addClass('is-hidden');
          } else {
            $('.js-menu-item-products').removeClass('is-hidden');
          }
        },

        commit: function (data) {
          siteData.set('settings_root_item', data);
        }
      });
    });
  };

  // ===========================================================================
  // Sets functions that will be initiated globally when resizing the browser
  // window.
  // ===========================================================================
  var bindContentItemImageCropToggle = function () {
    $('.js-toggle-crop-state').on('click', function () {
      var $contentItemBox = $(this).closest('.js-content-item-box'),
        $imgDropAreaTarget = $contentItemBox.find('.js-content-item-img-drop-area'),
        itemId = $contentItemBox.data('item-id'),
        itemType = $contentItemBox.data('item-type'),
        itemData = new Edicy.CustomData({
          type: itemType,
          id: itemId
        }),
        imageCropState;

      if ($imgDropAreaTarget.hasClass('is-cropped')) {
        $imgDropAreaTarget
          .removeClass('is-cropped')
          .addClass('not-cropped');

        imageCropState = 'not-cropped';
      } else {
        $imgDropAreaTarget
          .removeClass('not-cropped')
          .addClass('is-cropped');

        imageCropState = 'is-cropped';
      }

      itemData.set('image_crop_state', imageCropState);
    });
  };

  // ===========================================================================
  // Load article cover images only when they are close or appearing in the
  // viewport.
  // ===========================================================================
  var bindContentItemImageLazyload = function () {
    $(document).ready(function () {
      setTimeout(function () {
        $('.js-content-item-box').addClass('not-loaded');
      }, 3000);
    });

    $('.js-lazyload').lazyload({
      threshold: 500,
      effect: "fadeIn",
      placeholder: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',

      load: function () {
        var $contentItemBox = $(this).closest('.js-content-item-box');

        $contentItemBox.removeClass('not-loaded with-error').addClass('is-loaded');

        setTimeout(function () {
          $contentItemBox.removeClass('not-loaded with-error');
          $contentItemBox.find('.js-loader').remove();
        }, 3000);
      }
    });
  };

  // ===========================================================================
  // Sets header menu initial width attribute for menu mode calculation.
  // ===========================================================================
  var setHeaderMenuInitialWidth = function () {
    var $headerMenu = $('.js-header-menu');

    $headerMenu.attr('data-initial-width', $headerMenu.outerWidth(true));
  };

  // Enables the usage of the initiations outside this file.
  // For example add "<script>site.initBlogPage();</script>" at the end of the "Blog & News" page to initiate blog listing view functions.

  window.site = $.extend(window.site || {}, {
    initFrontPage: initFrontPage,
    initCommonPage: initCommonPage,
    initBlogPage: initBlogPage,
    initArticlePage: initArticlePage,
    getImageByWidth: getImageByWidth,
    initItemsPage: initItemsPage,
    handleHeaderColorScheme: handleHeaderColorScheme,
    bindRootItemSettings: bindRootItemSettings,
    bindContentItemImageCropToggle: bindContentItemImageCropToggle,
    bindSiteSearch: bindSiteSearch
  });

  init();
})(jQuery);
