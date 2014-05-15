<!DOCTYPE html>
<html lang="{{ page.language_code }}">
<head>
  {% include "html-head" %}
  <meta property="og:url" content="{{ site.url }}/{{ article.url }}">
  <meta property="og:title" content="{{ article.title }} — {{ page.site_title }}">
  <meta property="og:description" content="{{ article.excerpt | strip_html | truncate : 200 }}">
  <meta property="og:image" content="{{ site.url }}{{ photos_path }}/{{ page.data.fbimage }}"><!-- TODO: Add image location data tag -->
</head>

<body class="post-page">
  {% include "topbar" %}
  <div class="container">
    {% include "header" %}
    <main class="content" role="main">
      <article class="post">
        <header class="post-header">
          <h1 class="post-title">{% editable article.title %}</h1>
          <time class="post-date" datetime="{{ article.created_at | date : "%Y-%m-%d" }}">{{ article.created_at | date : "%B %d, %Y" }}</time>
        </header>
        <section class="post-content">
          <div class="post-excerpt content-formatted cfx">{% editable article.excerpt %}</div>
          <div class="post-body content-formatted cfx">{% editable article.body %}</div>
        </section>

        <aside class="comments">
          <h2 class="comments-title">{% case article.comments_count %}{% when 0 %}{{ "no_comments" | lc }}{% else %}<span class="comments-count">{{ article.comments_count }} </span>{{ "comments_for_count" | lc }}{% endcase %}</h2>

          {% include "commentform" %}

          {% for comment in article.comments %}
            <div class="comment">
              <div class="comment-header">
                <span class="comment-author">{{ comment.author }}</span>
                <span class="comment-date">{{ comment.created_at | date : "%b %d, %Y" }}</span>
              </div>
              <div class="comment-body">{{ comment.body }}</div>
            </div>
          {% endfor %}
        </aside>
      </article>
    </main>
    {% include "footer" %}
  </div>

  {% include "javascripts" %}
  <script src="{{ javascripts_path }}/autogrow.js"></script>
  <script>$('.form_field_textarea').autogrow();</script>
</body>
</html>
