{% if site.data.animation == false or site.data.animation == '' or site.data.animation == nil %}
  {% assign animation = false %}
{% else %}
  {% assign animation = site.data.animation %}
{% endif %}

<div class="animation-toggle">
  <label for="animation-toggle">Animation enabled:</label>
  <input type="checkbox" name="animation-toggle" id="animation-toggle"{% if animation %} checked="checked"{% endif %}>
</div>
