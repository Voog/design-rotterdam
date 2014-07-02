{% capture page_title %}{% if article %}{{ article.title }} — {{ page.site_title }}{% else %}{% if site.root_item.selected? %}{{ page.site_title }}{% else %}{{ page.title }} — {{ page.site_title }}{% endif %}{% endif %}{% endcapture %}

<title>{{ page_title }}</title>

<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="viewport" id="viewport-meta" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<meta name="format-detection" content="telephone=no">
<meta name="keywords" content="{{ page.keywords }}">

<!--[if IE]><meta http-equiv="X-UA-Compatible" content="IE=edge"><![endif]-->

{% if site.data.fb_admin %}<meta property="fb:admins" content="{{ site.data.fb_admin }}">{% endif %}
<meta property="og:type" content="{% if article %}article{% else %}website{% endif %}">
<meta property="og:url" content="{{ site.url }}{% if article %}{{ article.url | remove_first:'/' }}{% else %}{{ page.url | remove_first:'/' }}{% endif %}">
<meta property="og:title" content="{{ page_title | escape }}">
<meta property="og:site_name" content="{{ page.site_title | escape }}">
 
{% if article %}
  {% if article.data.fb_image %}
    <meta property="og:image" content="{{ article.data.fb_image }}">
  {% elsif page.data.fb_image %}
    <meta property="og:image" content="{{ page.data.fb_image }}">
  {% elsif site.data.fb_image %}
    <meta property="og:image" content="{{ site.data.fb_image }}">
  {% endif %}
  <meta property="og:description" content="{{ article.excerpt | strip_html | truncate: 200 }}">
  <meta name="description" content="{{ article.excerpt | strip_html | truncate: 200 }}">
{% else %}
  {% if page.data.fb_image %}
    <meta property="og:image" content="{{ page.data.fb_image }}">
  {% elsif site.data.fb_image %}
    <meta property="og:image" content="{{ site.data.fb_image }}">
  {% endif %}
  {% unless page.description == nil or page.description == "" %}
    <meta property="og:description" content="{{ page.description }}">
    <meta name="description" content="{{ page.description }}">
  {% endunless %}
{% endif %}

<link href='http://fonts.googleapis.com/css?family=Montserrat:400,700' rel='stylesheet' type='text/css'>
{% stylesheet_link "main.css?1" %}
{% stylesheet_link "fonts.css?1" %}
<!--[if lt IE 9]>{% stylesheet_link "ie8.css?1" %}<![endif]-->

<script src="{{ javascripts_path }}/modernizr.js?1"></script>
