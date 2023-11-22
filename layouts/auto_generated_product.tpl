<!DOCTYPE html>
{%- include "template-settings" -%}
{%- include "template-variables" -%}
<html class="{% if editmode %}editmode{% else %}public{% endif %}" lang="{{ page.language_code }}">
<head prefix="og: http://ogp.me/ns#">
  {% include "html-head" items_page: true %}
  {% include "edicy-tools-variables" %}
  {% include "edicy-tools-styles" %}

  {% sd_product %}
</head>

{%- capture bottom_content_html -%}
  {%- unless editmode -%}
    {%- content bind=product name="content" -%}
  {%- endunless -%}
{%- endcapture -%}

{%- assign bottom_content_size = bottom_content_html | strip | size -%}

{%- capture gallery_content_html -%}
  {%- unless editmode -%}
    {%- content bind=product name="gallery" -%}
  {%- endunless -%}
{%- endcapture -%}

{%- assign gallery_content_size = gallery_content_html | strip | size -%}

{%- capture product_social_html -%}
  {%- unless editmode -%}
    {%- xcontent name="product-social" -%}
  {%- endunless -%}
{%- endcapture -%}

{%- assign product_social_size = product_social_html | strip | size -%}

<body class="item-page content-page{% if site.search.enabled %} search-enabled{% endif %}{% if editmode or site.has_many_languages? %} lang-enabled{% endif %} {% if flags_state %}flags-enabled{% else %}flags-disabled{% endif %}">
  {% include "template-svg-spritesheet" %}
  <div class="container js-container">
    <div class="container-inner">
      <div class="wrap js-wrap">

        {% include "header" %}

        <main class="content" role="main">
          {% include "menu-breadcrumbs-sd" %}
          <div class="items-body product-content">
            <div class="flex-col">
              <div class="content-illustrations">

                {%- if product.image != blank %}
                  {% assign item_image_state = "with-image" %}
                {% else %}
                  {% assign item_image_state = "without-image" %}
                {% endif -%}

                <div class="content-item-box {{ item_image_state }} js-content-item-box">
                  <div class="item-top product-image">
                    {%- if product.image != blank -%}
                      <div class="top-inner aspect-ratio-inner product-page-image">
                        {%- assign image_class = "item-image not-cropped" -%}
                        {% image product.image target_width: "600" class: image_class loading: "lazy" %}
                      </div>
                    {%- endif -%}
                  </div>
                </div>

                {%- if gallery_content_size > 0 or editmode -%}
                  <div class="content-gallery content-formatted js-product-gallery" data-search-indexing-allowed="true">
                    {%- assign gallery_title = "gallery" | lce -%}
                    {%- assign gallery_title_tooltip = "content_tooltip_additional_images" | lce -%}
                    {% content bind=product name="gallery" title=gallery_title title_tooltip=gallery_title_tooltip %}
                  </div>
                {%- endif -%}

              </div>
            </div>
            <div class="flex-col">
              <div class="content-body js-product-content-right">
                <div class="content-item-title content-formatted">
                  <h1>{%- editable product.name -%}</h1>
                </div>

                {%- capture original_price -%}
                  {% if product.price_min_with_tax != product.price_max_with_tax -%}
                    {{- product.price_min_with_tax | money_with_currency: product.currency -}}
                    <span> – </span>
                  {%- endif -%}
                  {{- product.price_max_with_tax | money_with_currency: product.currency -}}
                {%- endcapture -%}

                <div class="product-price">
                  {% if product.on_sale? -%}
                    <s class="product-price-original">
                      {{- original_price -}}
                    </s>
                  {% endif -%}

                  <span class="product-price-final">
                    {%- if product.on_sale? -%}
                      {% if product.effective_price_min_with_tax != product.effective_price_max_with_tax %}
                        {{- product.effective_price_min_with_tax | money_with_currency: product.currency -}}
                        <span> – </span>
                      {%- endif -%}
                      {{- product.effective_price_max_with_tax | money_with_currency: product.currency -}}
                    {% else %}
                      {{ original_price }}
                    {% endif -%}
                  </span>
                </div>

                <div class="content-formatted" data-search-indexing-allowed="true">
                  {%- if editmode or product.description != blank -%}
                    <div class="product-description">
                      {%- editable product.description -%}
                    </div>
                  {% endif -%}

                  <div class="js-buy-btn-content">
                    {% include "buy-button" %}
                  </div>

                  {%- if editmode or product_social_size > 0 -%}
                    <div class="product-cross-page-info">
                      {%- assign cross_page_info_title = "cross_page_info" | lce -%}
                      {%- assign cross_page_info_title_tooltip = "content_tooltip_all_pages_same_type" | lce -%}
                      {% xcontent name="product-social" title=cross_page_info_title title_tooltip=cross_page_info_title_tooltip %}
                    </div>
                  {%- endif -%}

                  {%- assign content_title = "content" | lce -%}
                  {%- assign content_title_tooltip = "content_tooltip_specific_page" | lce -%}
                  {% content bind=product title=content_title title_tooltip=content_title_tooltip %}
                </div>
              </div>
            </div>
          </div>

           {%- if bottom_content_size > 0 or editmode -%}
            <section
              class="content-product-wide content-area"
              data-search-indexing-allowed="true">
              {%- assign bottom_content_title = "additional_content" | lce -%}
              {%- assign bottom_content_title_tooltip = "content_tooltip_additional_information" | lce -%}
              {% content bind=product name="content" title=bottom_content_title title_tooltip=bottom_content_title_tooltip %}
            </section>
          {%- endif -%}

        </main>
      </div>
    </div>
    {% include "footer" %}
  </div>
  {% include "javascripts" %}
  {% include "edicy-tools" %}

  <script>
    if (site) {
      site.handleProductPageContent();
      {%- if editmode and product %}
        site.handleProductImageClick({{ product.id }});
      {% endif -%}
    }
  </script>
</body>
</html>
