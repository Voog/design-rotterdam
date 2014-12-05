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

    // Header background image and color preview logic function.
    var HeaderBgPreview = function(data, Header) {
      // Returns the suitable version of the image depending on the viewport width.
      var getImageByWidth = function(sizes, targetWidth) {
        var prevImage;

        for (var i = sizes.length; i--;) {
          if (sizes[i].width > targetWidth) {
            return prevImage || sizes[i];
          }
        }
        // Makes sure that smallest is returned if all images bigger than targetWidth.
        return sizes[sizes.length - 1]
      };

      // Defines the suitable image based on the viewport width.
      var suitableImage = data.imageSizes ? getImageByWidth(data.imageSizes, $(window).width()) : 'none';

      var HeaderBgImage = (data.image && data.image !== '') ? 'url(' + suitableImage.url + ')' : 'none',
          HeaderBgColor = (data.color && data.color !== '') ? data.color : 'transparent',
          HeaderBgColorOpacity = (data.colorData && data.colorData !== '') ? data.colorData.a : 'none',
          HeaderBgColorLightness = (data.colorData && data.colorData !== '' && data.colorData.lightness) ? data.colorData.lightness : 'none';

      // Removes the current lightness class.
      $(Header).find('.js-background-type').removeClass('light-background dark-background');
      // Checks the opacity of the Header background color and sets the lightness class depending on it's value.
      if (HeaderBgColorOpacity >= 0.2) {
        $(Header).find('.js-background-type').addClass(HeaderBgColorLightness >= 0.5 ? 'light-background' : 'dark-background');
      } else {
        $(Header).find('.js-background-type').addClass('light-background');
      };

      // Updates the Header background image and background color.
      $(Header).css({'background-image' : HeaderBgImage});
      $(Header).find('.background-color').css({'background-color' : HeaderBgColor});
    };

    // Header background image and color save logic function.
    var HeaderBgCommit = function(data, dataName) {
      var commitData = $.extend(true, {}, data);
      commitData.image = data.image || '';
      commitData.imageSizes = data.imageSizes || '';
      commitData.color = data.color || 'transparent';
      pageData.set(dataName, commitData);
    }

    // Front page left content area background picker.
    var HeaderBg = new Edicy.BgPicker($('.js-background-settings'), {
        picture: true,
        target_width: 600,
        color: true,
        showAlpha: true,

      preview: function(data) {
        HeaderBgPreview(data, '.js-header-banner');
      },

      commit: function(data) {
        HeaderBgCommit(data, 'header_bg');
      }
    });

  </script>
{% endeditorjsblock %}
