<!DOCTYPE html>
{% include "template-variables" %}
<html class="{% if editmode %}editmode{% else %}public{% endif %}" lang="{{ page.language_code }}">
<head prefix="og: http://ogp.me/ns#">
  {% assign items_page = true %}
  {% include "html-head" items_page: true %}
  {% include "edicy-tools-variables" %}
  {% include "edicy-tools-styles" %}
</head>

<body class="item-list-page {% if site.search.enabled %} search-enabled{% endif %}{% if editmode or site.has_many_languages? %} lang-enabled{% endif %} {% if flags_state %}flags-enabled{% else %}flags-disabled{% endif %}">
  <div class="container js-container">
    <div class="container-inner">
      <div class="wrap js-wrap">
        {% include "header" %}
        <main class="content" role="main">
           <div class="content-area" data-search-indexing-allowed="true" {{ edy_intro_edit_text }}>{% content %}</div>
          {% include "menu-breadcrumbs" %}
          <section class="content-item-boxes">
            {% if site.root_item.selected? %}
              {% for level_1 in site.visible_menuitems_with_data %}
                {% if level_1.layout_title == product_list_layout or level_1.layout_title == product_layout %}
                  {% include "product-list-item" menu_level: level_1 %}
                {% endif %}
              {% endfor %}
              {% else %}
              {% include "product-list-loop" menu_items: site.visible_menuitems %}
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
