<!DOCTYPE html>
<html lang="{{ page.language_code }}">
<head>
  {% include "html-head" %}
  <meta property="og:url" content="{{ site.url }}/{{ page.path }}">
  <meta property="og:title" content="{{ page.title }} — {{ site.name }}">
  <meta property="og:description" content="{{ page.description }}">
  <meta property="og:image" content="{{ site.url }}{{ photos_path }}/{{ page.data.fbimage }}"><!-- TODO: Add image location data tag -->
  {{ blog.rss_link }}
</head>

<body class="blog-page">
  {% include "topbar" %}
  <div class="container">
    {% include "header" %}
    <main class="content" role="main">
      {% if editmode %}<div style="padding-bottom: 10px">{% addbutton %}</div>{% endif %}
      {% for article in articles %}
        <article class="post">
          <header class="post-header">
            <h1 class="post-title"><a href="{{ article.url }}">{{ article.title }}</a></h1>
            <time datetime="{{ article.created_at | date : "%Y-%m-%d" }}" class="post-date">{{ article.created_at | date : "%b %d, %Y" }}</time>
          </header>

          <section class="post-content">
            <div class="post-excerpt content-formatted cfx">{{ article.excerpt }}</div>
            <div class="post-body content-formatted cfx">{{ article.body }}</div>
          </section>
        </article>
      {% endfor %}
    </main>
    {% include "footer" %}
  </div>
  {% include "javascripts" %}
  <script type="text/javascript">site.initBlogPage();</script>
</body>
</html>
