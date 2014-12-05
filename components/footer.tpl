<footer class="footer content-formatted cfx">
  <div class="wrap">
    {% if site.search.enabled %}{% include "search" %}{% endif %}
    <div class="horizontal-line"></div>
    <div class="gradient-overlay"></div>
    {% xcontent name="footer" %}
  </div>
</footer>

<div class="wrap">
  <div class="voog-reference">{% loginblock %}{{ "footer_login_link" | lc }}{% endloginblock %}</div>
</div>
