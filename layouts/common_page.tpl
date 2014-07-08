<!DOCTYPE html>
<html lang="{{ page.language_code }}">
  <head>
    {% include "html-head" %}
  </head>

  <body class="common-page{% if site.search.enabled %} search-enabled{% endif %}{% if editmode %} editmode{% endif %}">
    <div class="container">
      {% include "header" %}
      <section class="content-header content-formatted cfx">
        {% content name="slogan" %}
      </section>
      <main class="content" role="main">
        {% include "sidebar-left" %}
        <section class="content-body content-formatted">{% content %}</section>
      </main>
      {% include "footer" %}
    </div>
    {% include "javascripts" %}
    <script>site.initCommonPage();</script>
  </body>
</html>
