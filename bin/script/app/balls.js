;(function(namespace) {
    'use strict';

    namespace.Balls = Backbone.View.extend({

        _index: null,

        initialize: function(options) {
            options || (options = {});

            Backbone.View.prototype.initialize.call(this, options);

            // bindings
            _.bindAll(this, 'add');

            // set our view collection
            this._index = [];
        },

        add: function(options) {
            var ball;

            // create ball
            ball = new namespace.Ball(options);

            // store
            this._index.push(ball);

            // append
            this.$el.append(ball.$el);

            // render
            ball.render();

            return ball;
        }

    });

})(window.PoolPad || (window.PoolPad = {}));