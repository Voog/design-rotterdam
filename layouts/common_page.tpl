<!DOCTYPE html>
{%- include "template-settings" -%}
{%- include "template-variables" -%}
<html class="{% if editmode %}editmode{% else %}public{% endif %}" lang="{{ page.language_code }}">
<head prefix="og: http://ogp.me/ns#">
  {% assign common_page = true %}
  {% include "html-head" common_page: true %}
  {% include "edicy-tools-variables" %}
</head>

<body class="common-page content-page{% if site.search.enabled %} search-enabled{% endif %}{% if editmode or site.has_many_languages? %} lang-enabled{% endif %} {% if flags_state %}flags-enabled{% else %}flags-disabled{% endif %}">
  <div class="container">
    {% include "header" %}
    <section class="content-header content-formatted cfx" data-search-indexing-allowed="true">
      {%- assign page_title_content_title = "title" | lce -%}
      {%- assign page_title_content_title_tooltip = "content_tooltip_current_page_title" | lce -%}
      {% content name="slogan" title=page_title_content_title title_tooltip=page_title_content_title_tooltip %}
    </section>
    <main class="content" role="main">
      {% include "sidebar-left" %}
      {%- assign content_default_title = "content" | lce -%}
      <section class="content-body content-formatted" data-search-indexing-allowed="true" {{ edy_intro_edit_text }}>{% content title=content_default_title %}</section>
    </main>
    {% include "footer" %}
  </div>
  {% include "site-signout" %}
  {% include "javascripts" %}
  {% include "edicy-tools" %}
  <script>site.initCommonPage({% if editmode %}false{% else %}true{% endif %});</script>
</body>
</html>
