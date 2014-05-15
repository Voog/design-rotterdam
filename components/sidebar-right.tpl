<aside class="sidebar sidebar-right">
  <section class="content-formatted cfx">
    {% contentblock name="content_sidebar_right_test" %}
      {% if page.path == 'products' %}
        <h1>“Here's a great place for a quote.”</h1>
        <div>Robespierre, 24, Haarlem</div>
      {% else %}
        <div>(Drag content here)</div>
      {% endif %}
    {% endcontentblock %}
  </section>
</aside>
