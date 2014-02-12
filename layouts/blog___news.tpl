<!DOCTYPE html>
<html lang="{{ page.language_code }}">
<head>
  {% include "html-head" %}
</head>

<body class="blog-page">
  <div class="container">
    {% include "header" %}
    <main class="content" role="main">
      {% for article in articles %}
        <article class="post">
          <header class="post-header">
            <h1 class="post-title"><a href="{{ article.url }}">{{ article.title }}</a></h1>
            <time datetime="{{ article.created_at | date : "%Y-%m-%d" }}" class="post-date">{{ article.created_at | date : "%b %d, %Y" }}</time>
          </header>
          
          <section class="post-content">
            <div class="post-excerpt content-formatted cfx">{{ article.excerpt }}</div>
          </section>
        </article>
      {% endfor %}
    </main>
    {% include "footer" %}
  </div>
  {% include "javascripts" %}
</body>
</html>