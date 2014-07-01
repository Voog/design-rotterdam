{% if site.search.enabled %}
<form class="search search-form js-search-form" id="site-search">
  <div class="search-box">
    <a href="#search" class="search-submit js-search-submit"></a>
    <a href="#close" class="search-close js-search-close"></a>
    <input type="text" class="search-input" placeholder="{{ "search"|lc }}" />
  </div>
</form>
{% endif %}
