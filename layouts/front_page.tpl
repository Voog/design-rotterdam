<!DOCTYPE html>
<html lang="{{ page.language_code }}">
  <head>
    {% include "html-head" %}
    <meta property="og:url" content="{{ site.url }}">
    <meta property="og:title" content="{{ site.name }}">
    <meta property="og:description" content="{{ page.description }}">
    <meta property="og:image" content="{{ site.url }}{{ photos_path }}/{{ page.data.fbimage }}"><!-- TODO: Add image location data tag -->
  </head>
  
  <body class="front-page">
    <div class="container">
      {% include "header" %}
      <main class="content content-formatted cfx" role="main">
        
      </main>
      {% include "footer" %}
    </div>
  
    {% include "javascripts" %}
  </body>
</html>