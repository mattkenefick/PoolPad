;(function(namespace) {
    'use strict';

    namespace.Menu = Backbone.View.extend({

        events: {
            'click [value=add-ball]'     : '_onClickAddBall',
            'click [value=add-line]'     : '_onClickAddLine',
            'click [value=add-note]'     : '_onClickAddNote',
            'click [value=reset-table]'  : '_onClickResetTable',
            'click [value=reset-english]': '_onClickResetEnglish',
            'click [value=help]'         : '_onClickHelp',
            'click [value=save]'         : '_onClickSave'
        },

        initialize: function(options) {
            options || (options = {});

            Backbone.View.prototype.initialize.call(this, options);
        },


        // Event Handlers
        // ------------------------------------------------------------

        _onClickAddBall: function(e) {
            namespace.trigger('add.ball', { type: 'cue' });

            return false;
        },

        _onClickAddLine: function(e) {
            namespace.trigger('add.line', { type: 'dashed' });

            return false;
        },

        _onClickAddNote: function(e) {
            namespace.trigger('add.note');

            return false;
        },

        _onClickHelp: function(e) {
            namespace.$help
                .fadeIn()
                .one('click', function() {
                    $(this).fadeOut();

                    return false;
                });
        },

        _onClickResetEnglish: function(e) {
            namespace.trigger('reset.english');

            namespace.$english_marker.css({
                left: namespace.$english.width() / 2,
                top: namespace.$english.height() / 2
            });
        },

        _onClickResetTable: function(e) {
            namespace.trigger('reset.table');

            $('ball, line, note').remove();
        },

        _onClickSave: function(e) {
            var balls = [], lines = [],
                notes = [], marker = {},
                speed = {}, data = {},
                cue   = {};

            $('ball').each(function() {
                var $el = $(this), obj = {};

                obj.type = $el.attr('type');
                obj.x    = parseFloat($el.css('left'));
                obj.y    = parseFloat($el.css('top'));

                balls.push(obj);
            });

            $('line').each(function() {
                var $el = $(this), $rot = $el.find('.rotatable'), obj = {};

                obj.x         = parseFloat($el.css('left'));
                obj.y         = parseFloat($el.css('top'));
                obj.transform = $rot.css('transform') || $rot.css('-webkit-transform');
                obj.width     = parseFloat($rot.css('width'));

                lines.push(obj);
            });

            $('note').each(function() {
                var $el = $(this), $ta = $el.find('textarea'), obj = {};

                obj.text   = $ta.val();
                obj.x      = parseFloat($el.css('left'));
                obj.y      = parseFloat($el.css('top'));
                obj.width  = parseFloat($el.css('width'));
                obj.height = parseFloat($el.css('height'));

                notes.push(obj);
            });

            $('cue').each(function() {
                var $el = $(this);

                cue.x         = parseFloat($el.css('left'));
                cue.y         = parseFloat($el.css('top'));
                cue.transform = $el.find('.draw').css('transform') || $el.find('.draw').css('-webkit-transform');
            });

            marker.x = parseFloat(namespace.$english_marker.css('left'));
            marker.y = parseFloat(namespace.$english_marker.css('top'));

            speed.y = parseFloat(namespace.$speed_meter.position().top);

            data.cue    = cue;
            data.lines  = lines;
            data.notes  = notes;
            data.balls  = balls;
            data.marker = marker;
            data.speed  = speed;
            data.csrf   = CSRF;

            $.post('./', data, function(response) {
                var json = $.parseJSON(response),
                    url  = BASE_URL.substr(-1) == '/' ? BASE_URL : BASE_URL + '/';

                if (json.success) {
                    window.location = url + json.id;
                }
                else if (json.error) {
                    $error.html(json.message)
                        .fadeIn()
                        .delay(2000)
                        .fadeOut();
                }
            });
        }

    });

})(window.PoolPad || (window.PoolPad = {}));