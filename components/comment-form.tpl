<div class="comment-form{% unless comment.valid? %} form_with_errors{% endunless %}">
  {% commentform %}
    <div class="form_area">
      <div class="form_fields">

        <div class="form_field{% unless comment.valid? %} form_field_with_errors{% endunless %}">
          {% unless comment.valid? %}
            <span class="form_field_error">
              {% for error in comment.errors %}
                {% if forloop.index == 1 %}
                  {{ error | lc }}
                {% endif %}
              {% endfor %}
            </span>
          {% endunless %}
          <label for="commentform-name">{{ "name" | lc }}</label>
          <input type="text" id="commentform-name" class="form_field_textfield form_field_size_small" name="comment[author]" value="{{ comment.author }}">
        </div>

        <div class="form_field{% unless comment.valid? %} form_field_with_errors{% endunless %}">
          {% unless comment.valid? %}
            <span class="form_field_error">
              {% for error in comment.errors %}
                {% if forloop.index == 2 %}
                  {{ error | lc }}
                {% endif %}
              {% endfor %}
            </span>
          {% endunless %}
          <label for="commentform-email">{{ "email" | lc }}</label>
          <input type="text" id="commentform-email" class="form_field_textfield form_field_size_small" name="comment[author_email]" value="{{ comment.author_email }}">
        </div>

        <div class="form_field{% unless comment.valid? %} form_field_with_errors{% endunless %}">
          {% unless comment.valid? %}
            <span class="form_field_error">
              {% for error in comment.errors %}
                {% if forloop.index == 3 %}
                  {{ error | lc }}
                {% endif %}
              {% endfor %}
            </span>
          {% endunless %}
          <label for="commentform-body">{{ "comment" | lc }}</label>
          <textarea id="commentform-body" class="form_field_textarea form_field_size_medium" rows="1" name="comment[body]">{{ comment.body }}</textarea>
        </div>

      </div>

      <div class="form_submit">
        <input type="submit" value="{{ "submit" | lc }}">
      </div>

    </div>
  {% endcommentform %}
</div>
