(function($) {

    var EdicyFormPlaceholders = function(el) {
        this.$el = $(el);
        this.init();
    };

    EdicyFormPlaceholders.prototype = {
        init: function() {
            $('.form_field').each($.proxy(function(idx, field) {
                if ($(field).find('input[type="text"]').length > 0) {
                    $(field).find('input[type="text"]').attr('placeholder', $(field).find('label').text());
                    $(field).find('label').hide();
                    if ($.fn.placeholder) {
                        $(field).find('input[type="text"]').placeholder();
                    }
                }
                if ($(field).find('textarea').length > 0) {
                    $(field).find('textarea').attr('placeholder', $(field).find('label').text());
                    $(field).find('label').hide();
                    if ($.fn.placeholder) {
                        $(field).find('textarea').placeholder();
                    }
                }
            }, this));
        }
    };

    $.fn.edicyFormPlaceholders = function () {
        return this.each(function () {
            var data = $(this).data('edicyFormPlaceholders');
            if (!data) {
                $(this).data('edicyFormPlaceholders', new EdicyFormPlaceholders(this));
            }
        });
    };
})(jQuery);
