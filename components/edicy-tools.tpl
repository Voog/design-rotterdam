{% editorjsblock %}
  <script src='{{ site.static_asset_host }}/libs/edicy-tools/latest/edicy-tools.js'></script>

  {% if _isSettingsEditor == true %}
    {% include "settings-editor" %}
  {% endif %}

  <script>
    var siteData = new Edicy.CustomData({
      type: 'site'
    });

    var pageData = new Edicy.CustomData({
      type: 'page',
      id: '{{ page.id }}'
    });

    {% if items_page %}
      site.bindContentItemImgDropAreas('{{ "drag_picture_for_product_here" | lc: editor_locale | escape }}');
      site.bindContentItemImageCropToggle();

      {%if site.data.settings_root_item %}
        rootItemValuesObj = {{ site.data.settings_root_item | json }};
      {% else %}
        rootItemValuesObj = {};
      {% endif %};

      site.bindRootItemSettings(rootItemValuesObj);
    {% endif %}

    // Initiates language flag toggleing functionality.
    site.toggleFlags();

    // Front page left content area background picker.
    var headerBg = new Edicy.BgPicker($('.js-background-settings'), {
        picture: true,
        target_width: 600,
        color: true,
        showAlpha: true,

      preview: function(data) {
        site.headerBgPreview(data, '.js-header-banner');
      },

      commit: function(data) {
        site.headerBgCommit(data, 'header_bg');
      }
    });

    site.bindCustomTexteditorStyles('{{ "button" | lc: editor_locale }}');
  </script>
{% endeditorjsblock %}
