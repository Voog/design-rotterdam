{% include "topbar" %}
<header class="header">
  <div class="header-inner cfx">
    <div class="header-left">
      <div class="header-title content-formatted">{% unless editmode %}<a href="{{ site.root_item.url }}">{% endunless %}{% editable site.header %}{% unless editmode %}</a>{% endunless %}</div>
    </div>

    <div class="header-right">
      <nav class="main-menu">
        {% include "nav-menu" %}
      </nav>

      {% if editmode or site.search.enabled or site.has_many_languages? %}
        <div class="header-options">
          {% include "search" %}

          {% if editmode or site.has_many_languages? %}
            <nav class="lang-menu js-menu-lang-wrap {% if flags_state %}flags-enabled{% else %}flags-disabled{% endif %}">
              <button id="lang-menu-toggle" class="toggle-btn lang-menu-toggle lang-flag lang-flag-{{ page.language_code }} {% if flags_state %}flags-enabled{% else %}flags-disabled{% endif %}">
                {% if editmode or flags_state == false %}
                  <span class="lang-title">
                    {% for language in site.languages %}{% if language.selected? %}{{ language.title }}{% endif %}{% endfor %}
                    <span class="ico-popover-toggle">▼</span>
                  </span>
                {% endif %}
              </button>
              <div id="toggleable-lang-menu" class="lang-menu-popover">
                {% include "lang-menu" %}
              </div>
            </nav>
          {% endif %}
        </div>
      {% endif %}
    </div>
  </div>
</header>
