{% comment %}FACEBOOK OPEN GRAPH META TAGS{% endcomment%}
{% comment %}https://developers.facebook.com/tools/debug - Debug after each modification{% endcomment %}
{% if site.data.fb_admin %}<meta property="fb:admins" content="{{ site.data.fb_admin }}">{% endif %}
<meta property="og:type" content="{% if article %}article{% else %}website{% endif %}">
<meta property="og:url" content="{{ site.url }}{% if article %}{{ article.url | remove_first: '/' }}{% else %}{{ page.url | remove_first:'/' }}{% endif %}">
<meta property="og:title" content="{{ page_title | escape }}">
<meta property="og:site_name" content="{{ page.site_title | escape }}">

{% comment %}Open Graph image{% endcomment %}

{% if page.image == nil and front_page and header_bg_image_sizes != nil and header_bg_image_sizes != '' %}
  <meta property="og:image" content="{{ header_bg_image_sizes[0].url }}">
  <meta property="og:image:width" content="{{ header_bg_image_sizes[0].width }}">
  <meta property="og:image:height" content="{{ header_bg_image_sizes[0].height }}">
{% else %}
  {% if article %}
    {% if article.image? %}
      <meta property="og:image" content="{{ article.image.url }}">
      <meta property="og:image:type" content="{{ article.image.content_type }}">
      <meta property="og:image:width" content="{{ article.image.width }}">
      <meta property="og:image:height" content="{{ article.image.height }}">
    {% endif %}
  {% elsif page.image? %}
    <meta property="og:image" content="{{ page.image.url }}">
    <meta property="og:image:type" content="{{ page.image.content_type }}">
    <meta property="og:image:width" content="{{ page.image.width }}">
    <meta property="og:image:height" content="{{ page.image.height }}">
  {% endif %}
{% endif %}

{% comment %}Open Graph description{% endcomment %}
{% if article %}{% assign description = article.description %}{% else %}{% assign description = page.description %}{% endif %}
{% if description != nil and description != '' %}
  <meta property="og:description" content="{{ description }}">
  <meta name="description" content="{{ description }}">
{% endif %}
