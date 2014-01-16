;(function(namespace) {
    'use strict';

    namespace.Lines = Backbone.View.extend({

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
            var line;

            // create line
            line = new namespace.Line(options);

            // store
            this._index.push(line);

            // append
            this.$el.append(line.$el);

            // render
            line.render();

            return line;
        }

    });

})(window.PoolPad || (window.PoolPad = {}));