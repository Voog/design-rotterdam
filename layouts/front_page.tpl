<!DOCTYPE html>
<html class="{% if editmode %}editmode{% else %}public{% endif %}" lang="{{ page.language_code }}">
<head prefix="og: http://ogp.me/ns#">
  {% include "html-head" %}
</head>

<body class="front-page blog-page{% if site.search.enabled %} search-enabled{% endif %}">
  <div class="container">
    {% include "header" %}
    <main class="content" role="main">
      <section class="content-body content-formatted">{% content %}</section>
      {% for article in site.latest_articles %}
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
    <div class="voog-reference">{% loginblock %}{{ "footer_login_link" | lc }}{% endloginblock %}</div>
  </div>
  {% include "javascripts" %}
  <script type="text/javascript">site.initFrontPage();</script>
</body>
</html>
