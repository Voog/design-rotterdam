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
      Gawker has blamed Quentin Tarantino for generating<br>the media frenzy that led the website to link to a leaked screenplay for the Oscar-winning film-maker's now-abandoned western The Hateful Eight. It also claimed Tarantino enjoyed fans reading his work and wanted the draft script to be published online.
      This is why we do it
      Tarantino has filed a copyright lawsuit against Gawker Media for disseminating copies of the 146-page screenplay, claiming the company's Defamer blog went "too far" by linking to an anonymous host where fans could read it in full.

    </main>
    {% include "footer" %}
  </div>

  {% include "javascripts" %}
</body>
</html>
