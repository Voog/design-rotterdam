'use strict';

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

/* General JS */
;(function($) {

  var editmode = $('html').hasClass('editmode');

  // Remove comments if debouncing is used.
  // Function to limit the rate at which a function can fire.
  // var debounce = function(func, wait, immediate) {
  //   var timeout;
  //   return function() {
  //     var context = this, args = arguments;
  //     var later = function() {
  //       timeout = null;
  //       if (!immediate) func.apply(context, args);
  //     };
  //     var callNow = immediate && !timeout;
  //     clearTimeout(timeout);
  //     timeout = setTimeout(later, wait);
  //     if (callNow) func.apply(context, args);
  //   };
  // };

  var toggleFlags = function() {
    $('.js-option-toggle-flags').on('click', function(event) {
      event.stopPropagation();

      if ($(this).hasClass('js-flag-disable-btn')) {
        var flagsState = false;
      } else {
        var flagsState = true;
      }

      $(this).toggleClass('js-flag-disable-btn');
      $('body').toggleClass('flags-enabled flags-disabled');

      siteData.set("flags_state", flagsState);
    });
  };

  var bindFallbackHeaderLeftWidthCalculation = function() {
    var headerWidth = $('.js-header-inner').width(),
        headerRight = $('.js-header-right'),
        headerRightWidth = headerRight.width(),
        headerRightMargin = parseInt(headerRight.css('margin-left')) + 1;


    $('.js-header-left').css('min-width', headerWidth - headerRightWidth - headerRightMargin);
  };

  // TODO: Remove if Edicy is going to wrap table with the container
  var wrapTables = function() {
    if (!editmode) {
      $.each($('.content-formatted table'), function() {
        $(this).wrap('<div class="table-container"></div>');
      });
    }
  };

  var toggleMainMenu = function() {
    $('.js-menu-toggle').click(function() {
      $(this).toggleClass('open');
      $('.mobile-menu').toggleClass('expanded');
      if ($(this).hasClass('open')) {
        $('.js-search').addClass('hidden');
      } else {
        $('.js-search').removeClass('hidden');
      }
    });
  };

  var toggleLangMenu = function() {
    $('#lang-menu-toggle').click(function(event) {
      event.stopPropagation();
      $(this).toggleClass('open');
      $('#toggleable-lang-menu').toggleClass('expanded');
    });
    $('body').on('click', function(event) {
      var $t = $(event.target);
      if ($t.closest('.toggleable-lang-menu').length === 0 && !$t.is('#toggleable-lang-menu')) {
        $('#toggleable-lang-menu').removeClass('expanded');
        $('body').removeClass('voog-search-visible');
      }
      $('#lang-menu-toggle').removeClass('open');
    });
  };

  var handlePopoverMenuHide = function() {
    $('html').click(function(event) {
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

  var handleSearch = function() {
    $('.js-search-reset').click(function(event) {
      event.preventDefault();
      $('body').removeClass('voog-search-visible');
    });

    $('.js-search-open').click(function(event) {
      event.stopPropagation();
      $('body').addClass('voog-search-visible');
      $('.js-search-input').val('').focus();
    });

    $('.js-search-close').click(function(event) {
      $('body').removeClass('voog-search-visible');
    });

    $('.js-search-input').click(function(event) {
      event.stopPropagation();
    });

    $('.js-voog-search-modal-inner').click(function(event) {
      event.stopPropagation();
    });
  };

  var handleWindowResize = function() {
    // Add functions that should be trgiggered while resizing the window here.
    // Example:
    // $(window).resize(debounce(yourFunctionName, 3000));
  };

  // Returns the suitable version of the image depending on the viewport width.
  var getImageByWidth = function(sizes, targetWidth) {
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

  var headerBgImageSizesContains = function(sizes, url) {
    for (var i = sizes.length; i--;) {
      if (url.indexOf(sizes[i].url.trim()) > -1) {
        return true;
      }
    }
    return false;
  };

  // Checks the lightness sum of header background image and color and sets the lightness class depending on it's value.
  var handleHeaderImageLightnessClass = function() {
    if (headerBgCombinedLightness >= 0.5) {
      $('.js-background-type').addClass('light-background').removeClass('dark-background');
    } else {
      $('.js-background-type').addClass('dark-background').removeClass('light-background');
    }
  };

  // Header background image and color preview logic function.
  var headerBgPreview = function(data, header) {
    // Defines the variables used in preview logic.

    var headerBgImagePrevious = $('.js-header-banner').css('background-image'),
        headerBgImageSuitable = data.imageSizes ? getImageByWidth(data.imageSizes, $(window).width()) : null,
        headerBgImage = (data.image && data.image !== '') ? 'url(' + headerBgImageSuitable.url + ')' : 'none',
        headerBgImageSizes = (data.imageSizes && data.imageSizes !== '') ? data.imageSizes : null,
        headerBgColor = (data.color && data.color !== '') ? data.color : 'rgba(0,0,0,0)',
        headerBgColorDataLightness = (data.colorData && data.colorData !== '') ? data.colorData.lightness : 1,
        colorExtractImage = $('<img>'),
        colorExtractCanvas = $('<canvas>'),
        colorExtractImageUrl = (data.image && data.image !== '') ? data.image : null;

    if (colorExtractImageUrl) {
      if (headerBgImageSizesContains(headerBgImageSizes, headerBgImagePrevious)) {
        headerBg.headerBgImageColor = headerBg.headerBgImageColor ? headerBg.headerBgImageColor : 'rgba(178,198,207,1)';
        headerBgCombinedLightness = getCombinedLightness(headerBg.headerBgImageColor, headerBgColor);
        handleHeaderImageLightnessClass();
      } else {
        colorExtractImage.attr('src', colorExtractImageUrl.replace(/.*\/(photos|voogstock)/g,'/photos'));
        colorExtractImage.on('load', function() {
          ColorExtract.extract(colorExtractImage[0], colorExtractCanvas[0], function(data) {
            headerBg.headerBgImageColor = data.bgColor ? data.bgColor : 'rgba(255,255,255,1)';
            headerBgCombinedLightness = getCombinedLightness(headerBg.headerBgImageColor, headerBgColor);
            handleHeaderImageLightnessClass();
          });
        });
      };
    } else {
      headerBg.headerBgImageColor = 'rgba(255,255,255,1)';
      headerBgCombinedLightness = getCombinedLightness(headerBg.headerBgImageColor, headerBgColor);
      handleHeaderImageLightnessClass();
    };

    // Updates the header background image and background color.
    $(header).css({'background-image' : headerBgImage});
    $(header).find('.background-color').css({'background-color' : headerBgColor});
  };

  // Header background image and color save logic function.
  var headerBgCommit = function(data, dataName) {
    var commitData = $.extend(true, {}, data);
    commitData.image = data.image || '';
    commitData.imageSizes = data.imageSizes || '';
    commitData.color = data.color || 'rgba(255,255,255,0)';
    commitData.combinedLightness = headerBgCombinedLightness;
    pageData.set(dataName, commitData);
  }

  var colorSum = function(bgColor, fgColor) {
    if (bgColor && fgColor) {
      if (typeof bgColor == 'string') {
        bgColor = bgColor.replace(/rgba?\(/,'').replace(/\)/,'').split(',');
        $.each(bgColor, function(n, x) {bgColor[n] = +x;});
      }
      if (typeof fgColor == 'string') {
        fgColor = fgColor.replace(/rgba?\(/,'').replace(/\)/,'').split(',');
        $.each(fgColor, function(n, x) {fgColor[n] = +x;});
      }
      if (typeof bgColor == 'object' && bgColor.hasOwnProperty('length')) {
        if (bgColor.length == 3) { bgColor.push(1.0); }
      }
      if (typeof fgColor == 'object' && fgColor.hasOwnProperty('length')) {
        if (fgColor.length == 3) { fgColor.push(1.0); }
      }
      var result = [0, 0, 0, 0];
      result[3] = 1 - (1 - fgColor[3]) * (1 - bgColor[3]);
      if (result[3] === 0) { result[3] = 1e-6; }
      result[0] = Math.min(fgColor[0] * fgColor[3] / result[3] + bgColor[0] * bgColor[3] * (1 - fgColor[3]) / result[3], 255);
      result[1] = Math.min(fgColor[1] * fgColor[3] / result[3] + bgColor[1] * bgColor[3] * (1 - fgColor[3]) / result[3], 255);
      result[2] = Math.min(fgColor[2] * fgColor[3] / result[3] + bgColor[2] * bgColor[3] * (1 - fgColor[3]) / result[3], 255);
      return $.map(result, function(e) { return Math.floor(e); });
    }
  };

  var getCombinedColor = function(bgColor, fgColor) {
    var sum = colorSum(bgColor || [255,255,255,1], fgColor || [255,255,255,1]);
    return sum;
  };

  var getCombinedLightness = function(bgColor, fgColor) {
    var combinedColor = getCombinedColor(bgColor, fgColor);
    var color = Math.round(((+combinedColor[0]) * 0.2126 + (+combinedColor[1]) * 0.7152 + (+combinedColor[2]) * 0.0722) / 2.55) / 100;
    return color;
  };

  var handleHeaderColorScheme = function(lightness) {
    if (typeof lightness != 'undefined') {
      if (lightness > 0.6) {
        $('.header-wrapper').addClass('light').removeClass('dark');
      } else {
        $('.header-wrapper').addClass('dark').removeClass('light');
      }
    }
  };

  var handlePostMinHeight = function() {
    $(window).ready(function(){
      $('.post').each(function(n, el) {
        var $post = $(el);
        var height = $post.find('.post-header').height();
        $post.find('.post-content').css('min-height', height);
      });
    });
  };

  var focusCommentsWithErrors = function() {
    $(document).ready(function() {
      if ($('.comment-form').hasClass('form_with_errors')) {
        $('html, body').scrollTop($('.comment-form').offset().top);
      } else if ($('form').find('.form_error, .form_notice').length > 0) {
        $('html, body').scrollTop($('.form_error, .form_notice').closest('form').offset().top);
      }
    });
  };

  // Initiations
  var initFrontPage = function(animation) {
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
  var initCommonPage = function(animation) {
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
    $(window).ready(function() {
      if (!($.trim($('.content-header').get(0).innerHTML))) {
        $('.content-header').hide();
      }
    });
  };
  var initArticlePage = function(animation) {
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
  var initBlogPage = function(animation) {
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

  var initStickyElements = function(opts) {
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
      posts.each(function(n, el) {
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
            $('.topbar').addClass('fixed').css({'top' : -headerStaticArea});
          } else if (scrolled < -5 && startScroll > headerStaticArea) {
            $('.topbar').addClass('fixed').css({'top' : 0});
          } else if (scrolled < 0 && startScroll <= 100 && $('.topbar').hasClass('fixed') === true) {
            $(container).css({'margin-top' : 0});
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
          setTimeout(function() {
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
      $('.post').each(function(n, el) {
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

  var hideHeader = function() {
    $(header).addClass('header-fixed').css({'top' : -headerStaticArea});
    $(container).css({'padding-top' : headerStaticArea});
  };

  var fixHeader = function() {
    var headerOffset;

    if ($('body').hasClass('edy-checkout-button-visible')) {
      headerOffset = $('.edy-ecommerce-shopping-cart-button').outerHeight();
    } else {
      headerOffset = 0;
    }

    $(header).addClass('header-fixed header-animated').css({'top' : headerOffset});

    $(container).css({'padding-top' : headerStaticArea});
  };

  var resetHeader = function() {
    $(header).removeClass('header-fixed header-animated');
    $(container).css({'padding-top' : 0});
    $('.post.fixed-header').removeClass('fixed-header');
  };

  var hideFooter = function() {
    $(footer).addClass('footer-fixed footer-animated footer-hidden');
    $(footer).css('bottom', -$(footer).outerHeight());
  };

  var resetFooter = function() {
    $(footer).removeClass('footer-fixed footer-animated footer-hidden');
    $('body').removeClass('voog-search-visible');
    $(footer).css({'bottom': '', 'left': '' });
    $(container).css({'margin-bottom' : ''});
  };

  var fixFooter = function(expanded) {
    expanded = expanded || false;
    $(footer).addClass('footer-fixed footer-animated');
    $(footer).css({
      'left' : $('.container').offset().left,
      'bottom': (expanded ? 0 : (-$(footer).height() + 60))
    });
    $(container).css({'margin-bottom' : footerStaticArea});
  };

  var expandFooter = function(expand) {
    if (expand) {
      if ($(footer).hasClass('footer-fixed')) {
        clearTimeout(footerExpandTimeout);
        fixFooter(true);
        $('footer .gradient-overlay').hide();
      }
    } else {
      if ($('footer').hasClass('footer-fixed')) {
        footerExpandTimeout = setTimeout(function() {
          fixFooter(false);
          $('footer .gradient-overlay').show();
        }, 1500);
      }
    }
  };

  var onScroll = function() {
    latestKnownScrollY = window.scrollY;
    requestTick();
  };

  var requestTick = function() {
    if (!ticking) { requestAnimationFrame(update); }
    ticking = true;
  };

  var update = function() {
    ticking = false;
    // NOTE: Animated header on mobile screen is too buggy. To fix it a huge
    // refactor is needed. Disableing it is a quicker and less painful method.
    if ($(window).width() > 640) {
      handler(getPostHeights());
    }
  };

  $(window).on('load resize', function() {
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

  $('footer').bind('mouseenter', function() {
    expandFooter(true);
  }).bind('mouseleave', function() {
    expandFooter(false);
  });
};

var bindCustomTexteditorStyles = function(buttonTranslation) {
  window.edy = window.edy || [];
  edy.push(['texteditorStyles', {name: buttonTranslation, tagname:'a', attribute: {'href': '#'}, classname: 'custom-btn', toggle: true}]);
};

var init = function() {
  toggleMainMenu();
  toggleLangMenu();
  handlePopoverMenuHide();
  handleWindowResize();
  handleSearch();
  wrapTables();
  focusCommentsWithErrors();

  $('.content form').edicyFormPlaceholders();

  if (!Modernizr.flexbox && editmode) {
    bindFallbackHeaderLeftWidthCalculation();
  };
};

// ===========================================================================
  // Sets functions that will be initiated on items list layouts.
  // ===========================================================================
  var initItemsPage = function() {
    if (!editmode()) {
      bindContentItemImageLazyload();
    }
  };

// ===========================================================================
  // Toggles product categories visibility in main menu.
  // ===========================================================================
  var bindRootItemSettings = function(rootItemValuesObj) {
    if (!('show_product_related_pages_in_main_menu' in rootItemValuesObj)) {
      rootItemValuesObj.show_product_related_pages_in_main_menu = false;
    }

    $('.js-root-item-settings-toggle').each(function(index, languageMenuSettingsButton) {
      var rootItemSettingsEditor = new Edicy.SettingsEditor(languageMenuSettingsButton, {
        menuItems: [
          {
            "titleI18n": "show_in_main_menu",
            "type": "checkbox",
            "key": "show_product_related_pages_in_main_menu",
            "states": {
              "on": true,
              "off": false
            }
          }
        ],

        buttonTitleI18n: "settings",

        values: rootItemValuesObj,

        containerClass: ['js-root-item-settings-popover', 'js-prevent-sideclick'],

        preview: function(data) {
          if (!data.show_product_related_pages_in_main_menu === true) {
            $('.js-menu-item-products').addClass('is-hidden');
          } else {
            $('.js-menu-item-products').removeClass('is-hidden');
          }
        },

        commit: function(data) {
          siteData.set('settings_root_item', data);
        }
      });
    });
  };

// ===========================================================================
  // Binds editmode image drop areas.
  // ===========================================================================
  var bindContentItemImgDropAreas = function(placeholderText) {
    $('.js-content-item-img-drop-area').each(function(index, imgDropAreaTarget) {
      var $imgDropAreaTarget = $(imgDropAreaTarget),
          $contentItemBox = $imgDropAreaTarget.closest('.js-content-item-box'),
          itemId = $contentItemBox.data('item-id'),
          itemType = $contentItemBox.data('item-type'),
          itemData = new Edicy.CustomData({
            type: itemType,
            id: itemId
          });

      var imgDropArea = new Edicy.ImgDropArea($imgDropAreaTarget, {
        positionable: false,
        target_width: 1280,
        placeholder: '<div class="edy-img-drop-area-placeholder">' + placeholderText + '</div>',
        removeBtn: '<div class="edy-img-drop-area-remove-image">' +
                      '<div class="edy-img-drop-area-remove-image-ico">' +
                        '<svg width="16" height="20" viewBox="0 0 26 30" xmlns="http://www.w3.org/2000/svg">' +
                          '<g fill-rule="nonzero" fill="currentColor">' +
                            '<g transform="translate(2 5)">' +
                              '<path d="M0 .997h2V21c0 1 1 2 2 2h14c1 0 2-1 2-2V1h2v20c0 2.25-1.75 4-4 4H4c-2.25 0-4-1.75-4-4V.997z"/>' +
                              '<rect x="10" y="4" width="2" height="16" rx="1"/>' +
                              '<rect x="5" y="4" width="2" height="16" rx="1"/>' +
                              '<rect x="15" y="4" width="2" height="16" rx="1"/>' +
                            '</g>' +
                            '<path d="M26 4v2H0V4h7V2c0-1 1-2 2-2h8c1 0 2 1 2 2v2h7zM9 4h8V3c0-.5-.5-1-1-1h-6c-.5 0-1 .5-1 1v1z"/>' +
                          '</g>' +
                        '</svg>' +
                      '</div>' +
                    '</div>',

        change: function(data) {
          var imageId;

          $imgDropAreaTarget
            .removeClass('is-cropped')
            .addClass('not-cropped')
            .css('opacity', .1)
          ;

          if (data) {
            imageId = data.original_id;

            $contentItemBox
              .removeClass('without-image is-loaded with-error')
              .addClass('with-image not-loaded')
            ;

            setImageOrientation($contentItemBox, data.width, data.height);
          } else {
            imageId = null;

            $contentItemBox
              .removeClass('with-image is-loaded with-error')
              .addClass('without-image not-loaded')
            ;

            $contentItemBox.find('.edy-img-drop-area-placeholder').css('opacity', 0);
          }

          setItemImage($contentItemBox, $imgDropAreaTarget, itemId, imageId, itemType);
        }
      });
    });
  };

  var setImageOrientation = function($contentItemBox, width, height) {
    var $imgDropAreaTarget = $contentItemBox.find('.js-content-item-img-drop-area'),
        $cropToggleButton = $contentItemBox.find('.js-toggle-crop-state');

    if (width > height) {
      $imgDropAreaTarget
        .removeClass('image-landscape image-square image-portrait')
        .addClass('image-landscape')
      ;
    } else if (width === height) {
      $imgDropAreaTarget
        .removeClass('image-landscape image-square image-portrait')
        .addClass('image-square')
      ;
    } else {
      $imgDropAreaTarget
        .removeClass('image-landscape image-square image-portrait')
        .addClass('image-portrait')
      ;
    }

    if ($imgDropAreaTarget.hasClass('image-square')) {
      $cropToggleButton
        .removeClass('is-visible')
        .addClass('is-hidden')
      ;
    } else {
      $cropToggleButton
        .removeClass('is-hidden')
        .addClass('is-visible')
      ;
    }
  };

  var setItemImage = function($contentItemBox, $imgDropArea, itemId, imageId, itemType) {
    var apiType = itemType === 'article' ? 'articles' : 'pages',
        itemData = new Edicy.CustomData({
          type: itemType,
          id: itemId
        });

    $.ajax({
       type: 'PATCH',
       contentType: 'application/json',
       url: '/admin/api/' + apiType +'/' + itemId,
       data: JSON.stringify({'image_id': imageId}),
       dataType: 'json',
       success: function(data) {
         itemData.set('image_crop_state', 'not-cropped');
         $contentItemBox.removeClass('not-loaded with-error').addClass('is-loaded');
         $contentItemBox.find('.edy-img-drop-area-placeholder').css('opacity', 1);
         $imgDropArea.css('opacity', 1);
       },
       timeout: 30000,
       error: function(data) {
         $contentItemBox.removeClass('not-loaded is-loaded with-error').addClass('with-error');
       }
    });
  };

  // ===========================================================================
  // Sets functions that will be initiated globally when resizing the browser
  // window.
  // ===========================================================================
  var bindContentItemImageCropToggle = function() {
    $('.js-toggle-crop-state').on('click', function() {
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
          .addClass('not-cropped')
        ;

        imageCropState = 'not-cropped';
      } else {
        $imgDropAreaTarget
          .removeClass('not-cropped')
          .addClass('is-cropped')
        ;

        imageCropState = 'is-cropped';
      }

      itemData.set('image_crop_state', imageCropState);
    });
  };

  // ===========================================================================
  // Load article cover images only when they are close or appearing in the
  // viewport.
  // ===========================================================================
  var bindContentItemImageLazyload = function() {
    $(document).ready(function() {
      setTimeout(function() {
        $('.js-content-item-box').addClass('not-loaded');
      }, 3000);
    });

    $('.js-lazyload').lazyload({
      threshold : 500,
      effect : "fadeIn",
      placeholder: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',

      load: function() {
        var $contentItemBox = $(this).closest('.js-content-item-box');

        $contentItemBox.removeClass('not-loaded with-error').addClass('is-loaded');

        setTimeout(function() {
          $contentItemBox.removeClass('not-loaded with-error');
          $contentItemBox.find('.js-loader').remove();
        }, 3000);
      }
    });
  };

  // ===========================================================================
  // Function to detect if site is displayed in editmode.
  // ===========================================================================
  var editmode = function () {
    return $('html').hasClass('editmode');
  };

  // ===========================================================================
  // Sets header menu initial width attribute for menu mode calculation.
  // ===========================================================================
  var setHeaderMenuInitialWidth = function() {
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
  toggleFlags: toggleFlags,
  getImageByWidth: getImageByWidth,
  headerBgPreview: headerBgPreview,
  headerBgCommit: headerBgCommit,
  initItemsPage: initItemsPage,
  handleHeaderColorScheme: handleHeaderColorScheme,
  bindCustomTexteditorStyles: bindCustomTexteditorStyles,
  bindRootItemSettings: bindRootItemSettings,
  bindContentItemImgDropAreas: bindContentItemImgDropAreas,
  bindContentItemImageCropToggle: bindContentItemImageCropToggle
});

init();
})(jQuery);
