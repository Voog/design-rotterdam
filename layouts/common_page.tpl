<!DOCTYPE html>
<html lang="{{ page.language_code }}">
  <head>
    {% include "html-head" %}
  </head>

  <body class="common-page">
    <div class="container">
      {% include "header" %}
      <section class="content-header content-formatted cfx">{% contentblock name="content_heading_test" %}<h1>How do we love like our coffee?</h1>{% endcontentblock %}</section>
      {% include "sidebar-left" %}
      <main class="content" role="main">
        <section class="content-body content-formatted">{% content %}</section>
      </main>
      {% include "sidebar-right" %}
    </div>
    {% include "javascripts" %}
  </body>
</html>