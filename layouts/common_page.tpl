<!DOCTYPE html>
<html lang="{{ page.language_code }}">
  <head>
    {% include "html-head" %}
    <meta property="og:url" content="{{ site.url }}/{{ page.path }}">
    <meta property="og:title" content="{{ page.title }} — {{ site.name }}">
    <meta property="og:description" content="{{ page.description }}">
    <meta property="og:image" content="{{ site.url }}{{ photos_path }}/{{ page.data.fbimage }}"><!-- TODO: Add image location data tag -->
  </head>

  <body class="common-page">
    <div class="container">
      {% include "header" %}
      <section class="content-header content-formatted cfx">
        {% contentblock name="content_heading" %}How do we love like our coffee?{% endcontentblock %}
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
