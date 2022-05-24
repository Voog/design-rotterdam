<!DOCTYPE html>
{%- include "template-settings" -%}
{%- include "template-variables" -%}
<html class="{% if editmode %}editmode{% else %}public{% endif %}" lang="{{ page.language_code }}">
<head prefix="og: http://ogp.me/ns#">
  {% assign front_page = true %}
  {% include "html-head" front_page: true %}
  {% include "edicy-tools-variables" %}
  {% include "edicy-tools-styles" %}
</head>

<body class="front-page{% if site.search.enabled %} search-enabled{% endif %}{% if editmode or site.has_many_languages? %} lang-enabled{% endif %} {% if flags_state %}flags-enabled{% else %}flags-disabled{% endif %}">
  <div class="container">
    {% include "header" %}
    <main class="content" role="main">
      <div class="header-banner js-header-banner js-background-type {{ header_bg_type }}">
        {% if editmode %}<button class="voog-bg-picker-btn js-background-settings" {% unless header_bg_image == '' %}data-bg-image="{{ header_bg_image }}"{% endunless %} {% unless header_bg_image_sizes == '' %}data-bg-image-sizes="{{ header_bg_image_sizes_str | escape }}"{% endunless %} {% unless header_bg_color == nil or header_bg_color == 'rgba(255,255,255,0)' %}data-bg-color="{{ header_bg_color }}"{% endunless %} {% unless header_bg_color_data == nil %}data-bg-color-data="{{ header_bg_color_data_str | escape }}"{% endunless %}></button>{% endif %}
        <div class="background-color"></div>
        <div class="header-body">
          {%- assign content_default_title = "content" | lce -%}
          {%- assign content_default_title_tooltip = "content_tooltip_specific_page" | lce -%}
          <div class="header-inner content-formatted cfx">{% content title=content_default_title title_tooltip=content_default_title_tooltip %}</div>
        </div>
      </div>

      <div class="wrap js-topbar-init">
        {%- assign bottom_content_title = "additional_content" | lce -%}
        {%- assign bottom_content_title_tooltip = "content_tooltip_additional_information" | lce -%}
        <section class="content-body content-formatted cfx" data-search-indexing-allowed="true">{% content name="default" title=bottom_content_title title_tooltip=bottom_content_title_tooltip %}</section>
      </div>
    </main>
    {% include "footer" %}
  </div>
  {% include "site-signout" %}
  {% include "javascripts" %}
  {% include "edicy-tools" front_page: true %}
  <script>site.initFrontPage({% if editmode %}false{% else %}true{% endif %});</script>
</body>
</html>
