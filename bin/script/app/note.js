;(function(namespace) {
    'use strict';

    namespace.Note = Backbone.View.extend({

        tagName: 'note',

        events: {
            'blur textarea': '_onBlurTextarea',
            'mousedown'    : '_onMouseDown'
        },

        initialize: function(options) {
            options || (options = {});

            Backbone.View.prototype.initialize.call(this, options);

            // defaults
            this.text = options.text || 'write you message here';

            // set initial markup
            this.$el.html([
                '<textarea>' + this.text + '</textarea>',
                '<i class="icon-arrow-move move"></i>'
            ].join(''));
        },

        render: function() {
            // draggable
            this.$el.draggable({
                handle: '.move'
            });

            // resizable
            this.$el.find('.rotatable').resizable();
            this.$el.find('.line .ui-resizable-e').html('<i class="icon-arrow-resize resize"></i>');

            this.$el.find('.rotatable').rotatable({
                handle: '.rotate'
            });

            // position
            this.$el.css({
                left: Math.max(50, namespace.mouse.x - this.$el.parent().offset().left),
                top : Math.max(50, namespace.mouse.y - this.$el.parent().offset().top)
            });

            return this;
        },

        remove: function() {
            // alert('remove me please.');
            this.$el.remove();
        },


        // Event Handlers
        // ---------------------------------------------------------

        _onBlurTextarea: function(e) {
            if ($(e.currentTarget).val() == '') {
                this.$el.remove();
                // alert("remove me.");
            }
        },

        _onMouseDown: function(e) {
            namespace.selected = this;
        }

    });

})(window.PoolPad || (window.PoolPad = {}));