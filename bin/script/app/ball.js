;(function(namespace) {
    'use strict';

    namespace.Ball = Backbone.View.extend({

        tagName: 'ball',

        events: {
            'click'    : '_onClickBall',
            'mousedown': '_onMouseDown'
        },

        type: null,

        initialize: function(options) {
            options || (options = {});

            Backbone.View.prototype.initialize.call(this, options);

            // save
            this.type = options.type;

            // set ball type
            this.$el.addClass(this.type);

            // add type
            this.$el.attr('type', this.type)

            // draggable
            this.$el.draggable();
        },

        render: function() {
            // rotate for fun
            this.$el.css({
                'rotate': ~~ (Math.random() * 180) + 'deg'
            });

            // position
            this.$el.css({
                left: Math.max(60, namespace.mouse.x - this.$el.parent().offset().left - this.$el.outerWidth() / 2),
                top : Math.max(60, namespace.mouse.y - this.$el.parent().offset().top - this.$el.outerHeight() / 2)
            });

            return this;
        },

        remove: function() {
            // alert('remove me please.');
            this.$el.remove();
        },


        // Event Handlers
        // ---------------------------------------------------------

        _onClickBall: function(e) {
            // alert('ball click');
        },

        _onMouseDown: function(e) {
            namespace.selected = this;

            return false;
        }

    });

})(window.PoolPad || (window.PoolPad = {}));