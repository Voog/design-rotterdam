<!DOCTYPE html>
<html class="{% if editmode %}editmode{% else %}public{% endif %}" lang="{{ page.language_code }}">
<head prefix="og: http://ogp.me/ns#">
  {% assign front_page = true %}
  {% include "html-head" %}
  {% include "edicy-tools-variables" %}
  {% include "edicy-tools-styles" %}
</head>

<body class="front-page{% if site.search.enabled %} search-enabled{% endif %}">
  <div class="container">
    {% include "header" %}
    <main class="content" role="main">

      <div class="header-banner js-header-banner js-background-type">
        {% if editmode %}<button class="voog-bg-picker-btn js-background-settings" data-bg-image="{{ header_bg_image }}" data-bg-image-sizes="{{ header_bg_image_sizes_str | escape }}" {% unless header_bg.color == nil %}data-bg-color="{{ header_bg_color }}"{% endunless %} data-bg-color-data="{{ header_bg_image_color_data_str | escape }}"></button>{% endif %}
        <div class="background-color"></div>
        <div class="header-body">
          <div class="header-inner content-formatted cfx">{% content %}</div>
        </div>
      </div>

      <div class="wrap js-topbar-init">
        <section class="content-body content-formatted cfx" data-search-indexing-allowed="true">{% content name="default" %}</section>
      </div>
    </main>
    {% include "footer" %}
  </div>
  {% include "javascripts" %}
  {% include "edicy-tools" %}
  <script>site.initFrontPage({% if editmode %}false{% else %}true{% endif %});</script>
</body>
</html>
