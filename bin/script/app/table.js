;(function(namespace) {
    'use strict';

    namespace.Table = Backbone.View.extend({

        initialize: function(options) {
            options || (options = {});

            Backbone.View.prototype.initialize.call(this, options);

            // bindings
            _.bindAll(this, 'isWithinTable');

            // build
            this.balls = new namespace.Balls;
            this.lines = new namespace.Lines;
            this.notes = new namespace.Notes;

            // events
            namespace.on('add.ball', this.balls.add);
            namespace.on('add.line', this.lines.add);
            namespace.on('add.note', this.notes.add);
        },

        render: function() {
            // reset
            this.$el.html('');

            // add balls
            this.$el.append(this.balls.render().$el);

            // add lines
            this.$el.append(this.lines.render().$el);

            // add notes
            this.$el.append(this.notes.render().$el);

            return this;
        },

        isWithinTable: function($el) {
            return $el.offset().left + $el.outerWidth() > this.$el.offset().left
                && $el.offset().left < this.$el.offset().left + this.$el.outerWidth()
                && $el.offset().top + $el.outerHeight() > this.$el.offset().top
                && $el.offset().top < this.$el.offset().top + this.$el.outerHeight();
        }

    });

})(window.PoolPad || (window.PoolPad = {}));