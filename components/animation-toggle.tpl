{% if site.data.animation == false %}
  {% assign animation = false %}
{% else %}
  {% assign animation = true %}
{% endif %}

{% if editmode or previewmode %}
<div class="animation-toggle">
  <label for="animation-toggle">Animation enabled:</label>
  <input type="checkbox" name="animation-toggle" id="animation-toggle"{% if animation %} checked="checked"{% endif %}>
</div>
{% endif %}
