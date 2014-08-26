{% if site.has_language_tags? %}
<div class="tags-container">
  <nav class="tags">
    <span>{{ 'filter_posts' | lc }}:</span>
    <a class="tag-link js-tags-all{% unless tags.size > 0 %} active{% endunless %}" href="{{ site.url }}{{ site.blogs.first.page.path }}">{{ 'all_posts' | lc }}</a>
    {% for tag in site.language_tags %}
      {% assign activestr = "" %}
      {% for tmptag in tags %}
        {% if tmptag.name == tag.name %}
          {% assign activestr = " active" %}
        {% endif %}
      {% endfor %}
      <a class="tag-link{{ activestr }}" href="{{ site.url }}{{ site.blogs.first.page.path }}/tagged/{{ tag.path }}">{{ tag.name }}</a>
    {% endfor %}
    </ul>
  </nav>
</div>
{% endif %}
