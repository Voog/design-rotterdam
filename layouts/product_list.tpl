<!DOCTYPE html>
{%- include "template-settings" -%}
{%- include "template-variables" -%}
<html class="{% if editmode %}editmode{% else %}public{% endif %}" lang="{{ page.language_code }}">
<head prefix="og: http://ogp.me/ns#">
  {% assign items_page = true %}
  {% include "html-head" items_page: true %}
  {% include "edicy-tools-variables" %}
  {% include "edicy-tools-styles" %}
</head>

<body class="item-list-page content-page{% if site.search.enabled %} search-enabled{% endif %}{% if editmode or site.has_many_languages? %} lang-enabled{% endif %} {% if flags_state %}flags-enabled{% else %}flags-disabled{% endif %}">
  {% include "template-svg-spritesheet" %}
  <div class="container js-container">
    <div class="container-inner">
      <div class="wrap js-wrap">
        {% include "header" %}
        <main class="content" role="main">
          {%- assign content_default_title = "content" | lce -%}
          {%- assign content_default_title_tooltip = "content_tooltip_specific_page" | lce -%}
          <div class="intro-content content-formatted" data-search-indexing-allowed="true">{% content title=content_default_title title_tooltip=content_default_title_tooltip %}</div>
          {% include "menu-breadcrumbs" %}
          <section class="content-item-boxes">
            {% if site.root_item.selected? %}
              {% for level_1 in site.menuitems_with_data %}
                {% if level_1.layout_title == product_list_layout or level_1.layout_title == product_layout %}
                  {% include "product-list-item" menu_level: level_1 %}
                {% endif %}
              {% endfor %}
              {% else %}
              {% include "product-list-loop" %}
            {% endif %}
          </section>

        </main>
      </div>
    </div>

    {% include "footer" %}
  </div>
  {% include "javascripts" %}
  {% include "edicy-tools" items_page = true %}
  <script>site.initItemsPage({% if editmode %}false{% else %}true{% endif %});</script>
</body>
</html>
