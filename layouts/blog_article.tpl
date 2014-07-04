<!DOCTYPE html>
<html lang="{{ page.language_code }}">
<head>
  {% include "html-head" %}
</head>

<body class="post-page">
  <div class="container">
    {% include "header" %}
    <main class="content" role="main">
      <article class="post">
        <header class="post-header content-formatted cfx">
          <h1 class="post-title">{% editable article.title %}</h1>
          <time class="post-date" datetime="{{ article.created_at | date : "%Y-%m-%d" }}">{{ article.created_at | format_date : "%B %d, %Y" }}</time>
        </header>
        <section class="post-content">
          <div class="post-excerpt content-formatted cfx">{% editable article.excerpt %}</div>
          <div class="post-body content-formatted cfx">{% editable article.body %}</div>
        </section>

        {% unless article.new_record? %}
        <aside class="comments">
          <h2 class="comments-title">{% case article.comments_count %}{% when 0 %}{{ "no_comments" | lc }}{% else %}<span class="comments-count">{{ article.comments_count }} </span>{{ "comments_for_count" | lc }}{% endcase %}</h2>

          {% include "comment-form" %}

          {% for comment in article.comments %}
            <div class="comment edy-site-blog-comment">
              <div class="comment-header">
                <span class="comment-author">{{ comment.author }}</span>
                <span class="comment-date">{{ comment.created_at | format_date : "%b %d, %Y" }}</span>
                <span>{% removebutton %}</span>
              </div>
              <div class="comment-body">{{ comment.body_html }}</div>
            </div>
          {% endfor %}
        </aside>
        {% endunless %}
      </article>
    </main>
    {% include "footer" %}
  </div>

  {% include "javascripts" %}
  <script type="text/javascript">site.initArticlePage();</script>
</body>
</html>
