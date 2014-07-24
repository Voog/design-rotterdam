<header class="header">
  <div class="header-inner">
    <section class="header-top">
      <h1 class="header-title">{% unless editmode %}<a href="{{ site.root_item.url }}">{% endunless %}{% editable site.header %}{% unless editmode %}</a>{% endunless %}</h1>

      {% if editmode or site.has_many_languages? %}
        <nav class="lang-menu">
          <button id="lang-menu-toggle" class="toggle-btn lang-menu-toggle lang-flag lang-flag-{{ page.language_code }}">Choose language</button>
          <div id="toggleable-lang-menu" class="lang-menu-popover">
            {% include "lang-menu" %}
          </div>
        </nav>
      {% endif %}
    </section>

    <nav class="main-menu">
      {% include "nav-menu" %}
    </nav>

    {% include 'topbar' %}
  </div>
</header>
