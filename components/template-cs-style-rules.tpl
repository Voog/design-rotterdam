body {
  color: var(--content-color);
  background-color: var(--color-bg);
  font-family: var(--font-two);
}

.container {
  -webkit-hyphens: var(--site-hyphens);
      -ms-hyphens: var(--site-hyphens);
          hyphens: var(--site-hyphens);
}

.post-header,
.tags,
.post-page .tags,
.comments,
.comment-form input,
.comment-form textarea,
.footer,
.voog-reference,
.front-page .content-body,
.common-page .content-header,
.header,
.menu,
.lang-menu-toggle,
.search .search-input,
.voog-search-result,
.sidebar,
.sidebar-left .content-formatted h1,
.header-banner .header-inner {
  font-family: var(--font-one);
}

.content-formatted h1,
.content-formatted h2,
.content-formatted h3,
.content-formatted h4,
.content-formatted h5,
.content-formatted h6,
.content-formatted form,
.content-formatted .form,
.content-formatted form input,
.content-formatted form textarea {
  font-family: var(--font-one);
}

@media screen and (max-width: 640px) {
  .topbar {
    font-family: var(--font-one);
  }
}
.header .header-inner,
.front-page .wrap,
.content-page .container {
  max-width: var(--site-width);
}

.header-banner .header-body {
  width: var(--focus-area-width);
  -webkit-hyphens: var(--focus-area-hyphens);
      -ms-hyphens: var(--focus-area-hyphens);
          hyphens: var(--focus-area-hyphens);
}

.front-page .content-body {
  color: var(--color-secondary);
}

.header .header-inner .header-title, .header .header-inner .header-title a, .header .header-inner .header-title a:hover {
  color: var(--header-site-title-color);
  font-size: var(--header-site-title-font-size);
  font-style: var(--header-site-title-font-style);
  font-weight: var(--header-site-title-font-weight);
  line-height: var(--header-site-title-line-height);
  -webkit-hyphens: var(--header-site-title-hyphens);
      -ms-hyphens: var(--header-site-title-hyphens);
          hyphens: var(--header-site-title-hyphens);
  -webkit-text-decoration: var(--header-site-title-text-decoration);
          text-decoration: var(--header-site-title-text-decoration);
  text-transform: var(--header-site-title-text-transform);
}
.header.header-fixed {
  background-color: var(--color-bg);
}

@media screen and (min-width: 640px) {
  .lang-menu .lang-flag {
    color: var(--header-mainmenu-active-color);
  }

  .main-menu li a {
    color: var(--header-mainmenu-color);
  }
  .main-menu li a:hover,
  .main-menu li.active a:hover {
    color: var(--header-mainmenu-hover-color);
  }
  .main-menu li.active a {
    color: var(--header-mainmenu-active-color);
  }
}
.main-menu li a {
  font-size: var(--header-mainmenu-font-size);
  font-style: var(--header-mainmenu-font-style);
  font-weight: var(--header-mainmenu-font-weight);
  line-height: var(--header-mainmenu-line-height);
  -webkit-hyphens: var(--header-mainmenu-hyphens);
      -ms-hyphens: var(--header-mainmenu-hyphens);
          hyphens: var(--header-mainmenu-hyphens);
  -webkit-text-decoration: var(--header-mainmenu-text-decoration);
          text-decoration: var(--header-mainmenu-text-decoration);
  text-transform: var(--header-mainmenu-text-transform);
}
.main-menu li a:hover,
.main-menu li.active a:hover {
  font-style: var(--header-mainmenu-hover-font-style);
  font-weight: var(--header-mainmenu-hover-font-weight);
  -webkit-text-decoration: var(--header-mainmenu-hover-text-decoration);
          text-decoration: var(--header-mainmenu-hover-text-decoration);
  text-transform: var(--header-mainmenu-hover-text-transform);
}
.main-menu li.active a {
  font-style: var(--header-mainmenu-active-font-style);
  font-weight: var(--header-mainmenu-active-font-weight);
  -webkit-text-decoration: var(--header-mainmenu-active-text-decoration);
          text-decoration: var(--header-mainmenu-active-text-decoration);
  text-transform: var(--header-mainmenu-active-text-transform);
}

.blog-page .post-read-more-btn {
  font-style: var(--button-font-style);
  font-weight: var(--button-font-weight);
  -webkit-hyphens: var(--button-hyphens);
      -ms-hyphens: var(--button-hyphens);
          hyphens: var(--button-hyphens);
  color: var(--button-color);
  -webkit-text-decoration: var(--button-text-decoration);
          text-decoration: var(--button-text-decoration);
  text-transform: var(--button-text-transform);
  background-color: var(--button-background-color);
}
.blog-page .post-title,
.blog-page .post-title a {
  color: var(--blog-list-title-color);
  font-size: var(--blog-list-title-font-size);
  font-style: var(--blog-list-title-font-style);
  font-weight: var(--blog-list-title-font-weight);
  line-height: var(--blog-list-title-line-height);
  -webkit-hyphens: var(--blog-list-title-hyphens);
      -ms-hyphens: var(--blog-list-title-hyphens);
          hyphens: var(--blog-list-title-hyphens);
  -webkit-text-decoration: var(--blog-list-title-text-decoration);
          text-decoration: var(--blog-list-title-text-decoration);
  text-transform: var(--blog-list-title-text-transform);
}
.blog-page .post-date {
  color: var(--blog-list-date-color);
  font-size: var(--blog-list-date-font-size);
  font-style: var(--blog-list-date-font-style);
  font-weight: var(--blog-list-date-font-weight);
  line-height: var(--blog-list-date-line-height);
  -webkit-text-decoration: var(--blog-list-date-text-decoration);
          text-decoration: var(--blog-list-date-text-decoration);
  text-transform: var(--blog-list-date-text-transform);
}
.blog-page .tags {
  color: var(--content-color);
}
.blog-page .tags .tag-link {
  color: var(--content-color);
  opacity: .6;
}
.blog-page .tags .tag-link.active {
  border-bottom-color: var(--content-color);
  color: var(--content-color);
  opacity: 1;
}

.comments-title {
  font-size: var(--content-font-size);
}

.comment-author {
  color: var(--content-color);
}

.comment-body,
.comment-date {
  color: var(--content-color);
  opacity: .6;
}

.common-page .content-header,
.post-page .post-header h1 {
  font-size: var(--content-title-font-size);
  font-style: var(--content-title-font-style);
  font-weight: var(--content-title-font-weight);
  -webkit-hyphens: var(--content-title-hyphens);
      -ms-hyphens: var(--content-title-hyphens);
          hyphens: var(--content-title-hyphens);
  line-height: var(--content-title-line-height);
  color: var(--content-title-color);
  -webkit-text-decoration: var(--content-title-text-decoration);
          text-decoration: var(--content-title-text-decoration);
  text-transform: var(--content-title-text-transform);
}

@media screen and (min-width: 640px) {
  .blog-page .post-excerpt,
  .blog-page .post-body {
    margin-left: var(--blog-list-margin);
    margin-right: var(--blog-list-margin);
  }

  .post-page .post-excerpt,
  .post-page .post-body {
    margin-left: var(--blog-article-margin);
    margin-right: var(--blog-article-margin);
  }
  .post-page .tags {
    margin-left: var(--blog-article-margin);
  }
}
@media screen and (min-width: 640px) and (max-width: 999px) {
  .comments {
    margin-left: var(--blog-article-margin);
  }
}
@media screen and (min-width: 999px) {
  .post-page .post-content {
    max-width: calc(100% - 365px);
  }
}
.post-page .post-date {
  color: var(--post-date-color);
  font-size: var(--post-date-font-size);
  font-style: var(--post-date-font-style);
  font-weight: var(--post-date-font-weight);
  line-height: var(--post-date-line-height);
  -webkit-text-decoration: var(--post-date-text-decoration);
          text-decoration: var(--post-date-text-decoration);
  text-transform: var(--post-date-text-transform);
}

.sub-menu li a {
  font-size: var(--content-submenu-font-size);
  font-style: var(--content-submenu-font-style);
  font-weight: var(--content-submenu-font-weight);
  -webkit-hyphens: var(--content-submenu-hyphens);
      -ms-hyphens: var(--content-submenu-hyphens);
          hyphens: var(--content-submenu-hyphens);
  line-height: var(--content-submenu-line-height);
  color: var(--content-submenu-color);
  -webkit-text-decoration: var(--content-submenu-text-decoration);
          text-decoration: var(--content-submenu-text-decoration);
  text-transform: var(--content-submenu-text-transform);
}
.sub-menu li a:hover,
.sub-menu li.active a:hover {
  font-style: var(--content-submenu-hover-font-style);
  font-weight: var(--content-submenu-hover-font-weight);
  -webkit-hyphens: var(--content-submenu-hyphens);
      -ms-hyphens: var(--content-submenu-hyphens);
          hyphens: var(--content-submenu-hyphens);
  line-height: var(--content-submenu-line-height);
  color: var(--content-submenu-hover-color);
  -webkit-text-decoration: var(--content-submenu-hover-text-decoration);
          text-decoration: var(--content-submenu-hover-text-decoration);
  text-transform: var(--content-submenu-hover-text-transform);
}
.sub-menu li.active a {
  font-style: var(--content-submenu-active-font-style);
  font-weight: var(--content-submenu-active-font-weight);
  -webkit-hyphens: var(--content-submenu-hyphens);
      -ms-hyphens: var(--content-submenu-hyphens);
          hyphens: var(--content-submenu-hyphens);
  line-height: var(--content-submenu-line-height);
  color: var(--content-submenu-active-color);
  -webkit-text-decoration: var(--content-submenu-active-text-decoration);
          text-decoration: var(--content-submenu-active-text-decoration);
  text-transform: var(--content-submenu-active-text-transform);
}
.sub-menu li.active a:hover {
  text-transform: var(--content-submenu-active-text-transform);
}

.content-formatted {
  font-size: var(--content-font-size);
  -webkit-hyphens: var(--content-hyphens);
      -ms-hyphens: var(--content-hyphens);
          hyphens: var(--content-hyphens);
  line-height: var(--content-line-height);
  color: var(--content-color);
}
.content-formatted a {
  color: var(--content-links-color);
  font-style: var(--content-links-font-style);
  font-weight: var(--content-links-font-weight);
  -webkit-text-decoration: var(--content-links-text-decoration);
          text-decoration: var(--content-links-text-decoration);
  text-transform: var(--content-links-text-transform);
}
.content-formatted a:hover {
  color: var(--content-links-hover-color);
  font-style: var(--content-links-hover-font-style);
  font-weight: var(--content-links-hover-font-weight);
  -webkit-text-decoration: var(--content-links-hover-text-decoration);
          text-decoration: var(--content-links-hover-text-decoration);
  text-transform: var(--content-links-hover-text-transform);
}

.footer {
  color: var(--footer-color);
  font-size: var(--footer-font-size);
  font-style: var(--footer-font-style);
  font-weight: var(--footer-font-weight);
  line-height: var(--footer-line-height);
  -webkit-hyphens: var(--footer-hyphens);
      -ms-hyphens: var(--footer-hyphens);
          hyphens: var(--footer-hyphens);
  -webkit-text-decoration: var(--footer-text-decoration);
          text-decoration: var(--footer-text-decoration);
  text-transform: var(--footer-text-transform);
}
.footer.footer-fixed {
  background-color: var(--color-bg);
  background: -webkit-gradient(linear, left top, left bottom, from(var(--color-bg)), color-stop(15%, var(--color-bg)), to(var(--color-bg)));
  background: -webkit-linear-gradient(top, var(--color-bg) 0%, var(--color-bg) 15%, var(--color-bg) 100%);
  background: -o-linear-gradient(top, var(--color-bg) 0%, var(--color-bg) 15%, var(--color-bg) 100%);
  background: linear-gradient(to bottom, var(--color-bg) 0%, var(--color-bg) 15%, var(--color-bg) 100%);
}
.footer .gradient-overlay {
  background: -webkit-gradient(linear, left top, left bottom, from(rgba(255, 255, 255, 0.001)), color-stop(50%, var(--color-bg)), to(var(--color-bg)));
  background: -webkit-linear-gradient(top, rgba(255, 255, 255, 0.001) 0%, var(--color-bg) 50%, var(--color-bg) 100%);
  background: -o-linear-gradient(top, rgba(255, 255, 255, 0.001) 0%, var(--color-bg) 50%, var(--color-bg) 100%);
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.001) 0%, var(--color-bg) 50%, var(--color-bg) 100%);
}

.voog-reference,
.voog-reference a {
  color: var(--footer-color);
}

.container .horizontal-line {
  background-color: var(--footer-color);
}

.search .search-box.search-box-focus {
  border-top-color: var(--footer-color);
}
.search .search-input::-webkit-input-placeholder, .search .search-input:-moz-placeholder, .search .search-input::-moz-placeholder, .search .search-input-ms-input-placeholder {
  color: var(--color-secondary);
}
.search .search-input:focus::-webkit-input-placeholder, .search .search-input:focus:-moz-placeholder, .search .search-input:focus::-moz-placeholder, .search .search-input:focus-ms-input-placeholder {
  color: var(--color-secondary);
}

.content-formatted h1, .content-formatted h1 a, .content-formatted h1 a:hover {
  font-size: var(--h1-font-size);
  font-style: var(--h1-font-style);
  font-weight: var(--h1-font-weight);
  -webkit-hyphens: var(--h1-hyphens);
      -ms-hyphens: var(--h1-hyphens);
          hyphens: var(--h1-hyphens);
  line-height: var(--h1-line-height);
  text-align: var(--h1-alignment);
  -webkit-text-decoration: var(--h1-text-decoration);
          text-decoration: var(--h1-text-decoration);
  text-transform: var(--h1-text-transform);
}
.content-formatted h1 {
  color: var(--h1-color);
}
.content-formatted h2, .content-formatted h2 a, .content-formatted h2 a:hover {
  font-size: var(--h2-font-size);
  font-style: var(--h2-font-style);
  font-weight: var(--h2-font-weight);
  -webkit-hyphens: var(--h2-hyphens);
      -ms-hyphens: var(--h2-hyphens);
          hyphens: var(--h2-hyphens);
  line-height: var(--h2-line-height);
  text-align: var(--h2-alignment);
  -webkit-text-decoration: var(--h2-text-decoration);
          text-decoration: var(--h2-text-decoration);
  text-transform: var(--h2-text-transform);
}
.content-formatted h2 {
  color: var(--h2-color);
}
.content-formatted h3, .content-formatted h3 a, .content-formatted h3 a:hover {
  font-size: var(--h3-font-size);
  font-style: var(--h3-font-style);
  font-weight: var(--h3-font-weight);
  -webkit-hyphens: var(--h3-hyphens);
      -ms-hyphens: var(--h3-hyphens);
          hyphens: var(--h3-hyphens);
  line-height: var(--h3-line-height);
  text-align: var(--h3-alignment);
  -webkit-text-decoration: var(--h3-text-decoration);
          text-decoration: var(--h3-text-decoration);
  text-transform: var(--h3-text-transform);
}
.content-formatted h3 {
  color: var(--h3-color);
}

.content-formatted .custom-btn,
.content-formatted .custom-btn:hover,
.content-formatted .form_submit input,
.content-formatted .form_submit input:hover,
.comment-form .custom-btn,
.comment-form .custom-btn:hover,
.comment-form .form_submit input,
.comment-form .form_submit input:hover {
  font-size: var(--button-font-size);
  font-style: var(--button-font-style);
  font-weight: var(--button-font-weight);
  -webkit-hyphens: var(--button-hyphens);
      -ms-hyphens: var(--button-hyphens);
          hyphens: var(--button-hyphens);
  line-height: var(--button-line-height);
  -webkit-text-decoration: var(--button-text-decoration);
          text-decoration: var(--button-text-decoration);
  text-transform: var(--button-text-transform);
}
.content-formatted .custom-btn:not(.custom-btn-disabled), .content-formatted .custom-btn:not(.custom-btn-disabled):hover,
.content-formatted .form_submit input,
.content-formatted .form_submit input:hover,
.comment-form .custom-btn:not(.custom-btn-disabled),
.comment-form .custom-btn:not(.custom-btn-disabled):hover,
.comment-form .form_submit input,
.comment-form .form_submit input:hover {
  color: var(--button-color);
  background-color: var(--button-background-color);
}
.content-formatted .custom-btn:not(.custom-btn-disabled):hover,
.content-formatted .form_submit input:hover,
.comment-form .custom-btn:not(.custom-btn-disabled):hover,
.comment-form .form_submit input:hover {
  opacity: .75;
}
.content-formatted table td,
.comment-form table td {
  border-bottom-color: var(--table-border-color);
  border-bottom-style: var(--table-border-style);
  border-top-color: var(--table-border-color);
  border-top-style: var(--table-border-style);
  padding: var(--table-cell-padding);
}
.content-formatted form,
.content-formatted .form,
.comment-form form,
.comment-form .form {
  color: var(--form-field-text-color);
  font-size: var(--form-field-text-font-size);
}
.content-formatted .form_field label,
.content-formatted .form_field_textfield,
.content-formatted .form_field_textarea,
.content-formatted .form_field_select,
.content-formatted .form_field_file,
.content-formatted .form_field .edy-fe-label,
.comment-form .form_field label,
.comment-form .form_field_textfield,
.comment-form .form_field_textarea,
.comment-form .form_field_select,
.comment-form .form_field_file,
.comment-form .form_field .edy-fe-label {
  font-size: var(--form-field-text-font-size);
  font-style: var(--form-field-text-font-style);
  font-weight: var(--form-field-text-font-weight);
  line-height: var(--form-field-text-line-height);
  color: var(--form-field-text-color);
  -webkit-text-decoration: var(--form-field-text-text-decoration);
          text-decoration: var(--form-field-text-text-decoration);
  text-transform: var(--form-field-text-text-transform);
  background-color: var(--color-bg);
}
.content-formatted .form_field_textarea,
.content-formatted .form_field_textfield,
.comment-form .form_field_textarea,
.comment-form .form_field_textfield {
  border-bottom-color: var(--form-field-border-color);
}

.content-formatted form input,
.form_field label,
.content-formatted form {
  color: var(--form-field-text-color);
}
.content-formatted form input ::-webkit-input-placeholder,
.form_field label ::-webkit-input-placeholder,
.content-formatted form ::-webkit-input-placeholder {
  color: var(--form-field-text-color);
  opacity: .5;
}
.content-formatted form input :-moz-placeholder,
.form_field label :-moz-placeholder,
.content-formatted form :-moz-placeholder {
  /* Firefox 18- */
  color: var(--form-field-text-color);
  opacity: .5;
}
.content-formatted form input ::-moz-placeholder,
.form_field label ::-moz-placeholder,
.content-formatted form ::-moz-placeholder {
  /* Firefox 19+ */
  color: var(--form-field-text-color);
  opacity: .5;
}
.content-formatted form input :-ms-input-placeholder,
.form_field label :-ms-input-placeholder,
.content-formatted form :-ms-input-placeholder {
  color: var(--form-field-text-color);
  opacity: .5;
}

.form_submit input {
  font-family: var(--font-one);
}
