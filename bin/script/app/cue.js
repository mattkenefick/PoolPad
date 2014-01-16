;(function(namespace) {
    'use strict';

    namespace.Cue = Backbone.View.extend({

        initialize: function(options) {
            options || (options = {});

            Backbone.View.prototype.initialize.call(this, options);

            // make draggable
            this.$el.draggable();

            // add rotate icon
            this.$el.html([
                '<div class="draw">',
                    '<i class="icon-refresh rotate"></i>',
                '</div>'
            ].join(''));

            // let it rotate
            this.$('.draw').rotatable({
                handle: '.rotate'
            });
        }

    });

})(window.PoolPad || (window.PoolPad = {}));