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
    {% include "topbar" %}
    {% include "header" %}
    <div class="container">
      <section class="content-header content-formatted cfx">{% contentblock name="content_heading_test" %}<h1>How do we love like our coffee?</h1>{% endcontentblock %}</section>
      <main class="content" role="main">
        <div class="content-top">
          {% include "sidebar-left" %}
          <section class="content-body content-first content-formatted">{% content %}</section>
          {% include "sidebar-right" %}
        </div>
        <div class="content-bottom">
          <section class="content-body content-second content-formatted">{% content name="content_bottom_test" %}</section>
        </div>
      </main>
      {% include "footer" %}
    </div>
    {% include "javascripts" %}
    <script>site.initCommonPage();</script>
    <script src="{{ javascripts_path }}/autogrow.js"></script>
    <script>$('.form_field_textarea').autogrow();</script>
  </body>
</html>
