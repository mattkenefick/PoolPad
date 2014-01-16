;(function(namespace) {
    'use strict';

    namespace.Notes = Backbone.View.extend({

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
            var note;

            // create note
            note = new namespace.Note(options);

            // store
            this._index.push(note);

            // append
            this.$el.append(note.$el);

            // render
            note.render();

            return note;
        }

    });

})(window.PoolPad || (window.PoolPad = {}));