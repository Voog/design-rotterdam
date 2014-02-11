<header class="header">
  <section class="header-banner">
    <h1 class="header-title">{% unless editmode %}<a href="{{ site.root_item.url }}">{% endunless %}{% editable site.header %}{% unless editmode %}</a>{% endunless %}</h1>
  </section>
  <nav class="nav-menu">
    {% include "nav-menu" %}
  </nav>
</header>