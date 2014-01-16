;(function(namespace) {
    'use strict';

    namespace.Line = Backbone.View.extend({

        tagName: 'line',

        events: {
            'mousedown': '_onMouseDown'
        },

        initialize: function(options) {
            options || (options = {});

            Backbone.View.prototype.initialize.call(this, options);

            // set initial markup
            this.$el.html([
                '<div class="draw rotatable"></div>',
                '<i class="icon-arrow-move left"></i>',
                '<i class="icon-arrow-move right"></i>',
            ].join(''));
        },

        render: function() {
            var $left  = this.$('.left'),
                $right = this.$('.right'),
                $draw  = this.$('.draw'),
                $line  = this.$el;

            // draggable
            this.$el.find('.left, .right').draggable({
                stop: function() {
                    var rightx = $right.offset().left,
                        leftx  = $left.offset().left,
                        righty = $right.offset().top,
                        lefty  = $left.offset().top,
                        linex  = $line.parent().offset().left,
                        liney  = $line.parent().offset().top;

                    // width
                    $line.width( rightx - leftx );
                    $line.css('left',  leftx - linex);
                    $left.css('left',  0);
                    $right.css('left', rightx - leftx - $right.outerWidth());

                    // height
                    $line.height( righty - lefty );
                    $line.css('top', lefty - liney + 1);
                    $left.css('top', 0);
                    $right.css('top', righty - lefty);

                    $draw.css('left', 0);
                    $draw.css('top', 0);
                },
                drag: function() {
                    var p1 = {
                            x: $right.offset().left,
                            y: $right.offset().top
                        };
                    var p2 = {
                            x: $left.offset().left,
                            y: $left.offset().top
                        };
                    var angle = getAngle(p1, p2),
                        dist = lineDistance(p1, p2);

                    $draw.css({
                        width: dist + 'px',
                        left: $left.position().left,
                        top: $left.position().top,
                        '-webkit-transform': 'rotate(' + angle + 'deg)'
                    });
                }
            });

            // position
            this.$el.css({
                left: Math.max(70, namespace.mouse.x - this.$el.parent().offset().left),
                top : Math.max(70, namespace.mouse.y - this.$el.parent().offset().top)
            });

            return this;
        },

        remove: function() {
            // alert('remove me please.');
            this.$el.remove();
        },


        // Event Handlers
        // ---------------------------------------------------------

        _onMouseDown: function(e) {
            namespace.selected = this;

            return false;
        }

    });

    function lineDistance( point1, point2 )
    {
      var xs = 0;
      var ys = 0;

      xs = point2.x - point1.x;
      xs = xs * xs;

      ys = point2.y - point1.y;
      ys = ys * ys;

      return Math.sqrt( xs + ys );
    }

    function getAngle(p1, p2) {
        var dy, dx, theta, deg;
        dy = p2.y - p1.y;
        dx = p2.x - p1.x;
        theta = Math.atan2(dy, dx);
        theta *= 180/Math.PI // rads to degs
        return 180+theta;
    };

})(window.PoolPad || (window.PoolPad = {}));