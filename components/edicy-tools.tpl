{% editorjsblock %}
  <script src='{{ site.static_asset_host }}/libs/edicy-tools/latest/edicy-tools.js'></script>
  <script>
    var siteData = new Edicy.CustomData({
      type: 'site'
    });

    $('.js-option-toggle-flags').on('click', function(event) {
      event.stopPropagation();

      if ($(this).hasClass('js-flag-disable-btn')) {
        var flagsState = false;
      } else {
        var flagsState = true;
      }

      siteData.set("flags_state", flagsState);

      $(this).toggleClass('js-flag-disable-btn');
      $('.js-menu-lang-wrap').toggleClass('flags-enabled flags-disabled');
    });

    // HEADER BANNER BACKGROUND PICKER.
    var pageData = new Edicy.CustomData({
      type: 'page',
      id: '{{ page.id }}'
    });

    // HEADER BACKGROUND IMAGE AND COLOR PREVIEW LOGIC FUNCTION.
    var headerBgPreview = function(data, header) {
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

      // Defines the variables used in preview logic.
      var suitableImage = data.imageSizes ? getImageByWidth(data.imageSizes, $(window).width()) : 'none',
          headerBgImage = (data.image && data.image !== '') ? 'url(' + suitableImage.url + ')' : 'none',
          headerBgColor = (data.color && data.color !== '') ? data.color : 'rgba(255,255,255,0)',
          headerBgColorOpacity = (data.colorData && data.colorData !== '') ? data.colorData.a : 'none',
          headerBgColorLightness = (data.colorData && data.colorData !== '' && data.colorData.lightness) ? data.colorData.lightness : 'none',
          colorExtractImage = $('<img>'),
          colorExtractCanvas = $('<canvas>'),
          colorExtractUrl = (data.image && data.image !== '') ? data.image : null;

          // Updates the header background lightness class.
          if (colorExtractUrl) {
            colorExtractImage.attr('src', colorExtractUrl.replace(/.*\/photos/g,'/photos'));
            colorExtractImage.load(function() {
              ColorExtract.extract(colorExtractImage[0], colorExtractCanvas[0], function(data) {
                headerBgImageColor = data.bgColor;
                headerBgCombinedLightness = site.getCombinedLightness(headerBgImageColor, headerBgColor);

                // Checks the opacity of the header background color and sets the lightness class depending on it's value.
                if (headerBgCombinedLightness >= 0.5) {
                  $('.js-background-type').addClass('light-background').removeClass('dark-background');
                } else {
                  $('.js-background-type').addClass('dark-background').removeClass('light-background');
                }
              });
            });
          } else {
            headerBgCombinedLightness = null;
            // Checks the opacity of the header background color and sets the lightness class depending on it's value.
            if (headerBgColorOpacity >= 0.5) {
              $('.js-background-type').addClass(headerBgColorLightness >= 0.5 ? 'light-background' : 'dark-background').removeClass(headerBgColorLightness >= 0.5 ? 'dark-background' : 'light-background');
            } else {
              $('.js-background-type').addClass('light-background').removeClass('dark-background');
            };
          };

      // Updates the header background image and background color.
      $(header).css({'background-image' : headerBgImage});
      $(header).find('.background-color').css({'background-color' : headerBgColor});
    };

    // HEADER BACKGROUND IMAGE AND COLOR SAVE LOGIC FUNCTION.
    var headerBgCommit = function(data, dataName) {
      var commitData = $.extend(true, {}, data);
      commitData.image = data.image || '';
      commitData.imageSizes = data.imageSizes || '';
      commitData.color = data.color || 'transparent';
      commitData.combinedLightness = headerBgCombinedLightness;
      pageData.set(dataName, commitData);
    }

    // Front page left content area background picker.
    var headerBg = new Edicy.BgPicker($('.js-background-settings'), {
        picture: true,
        target_width: 600,
        color: true,
        showAlpha: true,

      preview: function(data) {
        headerBgPreview(data, '.js-header-banner');
      },

      commit: function(data) {
        headerBgCommit(data, 'header_bg');
      }
    });

  </script>
{% endeditorjsblock %}
