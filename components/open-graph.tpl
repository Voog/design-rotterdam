{% comment %}FACEBOOK OPEN GRAPH META TAGS{% endcomment%}
{% comment %}https://developers.facebook.com/tools/debug - Debug after each modification{% endcomment %}
{% if site.data.fb_admin %}<meta property="fb:admins" content="{{ site.data.fb_admin }}">{% endif %}
<meta property="og:type" content="{% if article %}article{% else %}website{% endif %}">
{% if article %}{% assign og_url = article.url %}{% else %}{% assign og_url = page.url %}{% endif %}
<meta property="og:url" content="{{ site.url }}{{ og_url | remove_first: '/' }}">
<meta property="og:title" content="{{ page_title | escape }}">
<meta property="og:site_name" content="{{ page.site_title | escape }}">

{% comment %}Open Graph image{% endcomment %}
{% if page.image == nil and front_page and header_bg_image_sizes != nil and header_bg_image_sizes != '' %}
  {% assign og_image_url = header_bg_image_sizes[0].url %}
  {% assign og_image_width = header_bg_image_sizes[0].width %}
  {% assign og_image_height = header_bg_image_sizes[0].height %}
{% else %}
  {% if article %}
    {% if article.image? %}
      {% assign og_image_url = article.image.url %}
      {% assign og_image_content_type = article.image.content_type %}
      {% assign og_image_width = article.image.width %}
      {% assign og_image_height = article.image.height %}
    {% endif %}
  {% elsif page.image? %}
    {% assign og_image_url = page.image.url %}
    {% assign og_image_content_type = page.image.content_type %}
    {% assign og_image_width = page.image.width %}
    {% assign og_image_height = page.image.height %}
  {% endif %}
{% endif %}

{% if og_image_url %}<meta property="og:image" content="{{ og_image_url }}">{% endif %}
{% if og_image_content_type %}<meta property="og:image:type" content="{{ og_image_content_type }}">{% endif %}
{% if og_image_width %}<meta property="og:image:width" content="{{ og_image_width }}">{% endif %}
{% if og_image_height %}<meta property="og:image:height" content="{{ og_image_height }}">{% endif %}

{% comment %}Open Graph description{% endcomment %}
{% if article %}{% assign description = article.description %}{% else %}{% assign description = page.description %}{% endif %}
{% if description != nil and description != '' %}
  <meta property="og:description" content="{{ description }}">
  <meta name="description" content="{{ description }}">
{% endif %}
