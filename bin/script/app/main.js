;(function(namespace) {
    'use strict';

    _.extend(namespace, Backbone.Events, {
        $window  : $(window),
        $document: $(document),
        $html    : $('html'),
        $body    : $('body'),
        $main    : $('main'),
        func     : {},
        selected : null,
        mouse    : {
            x: 0,
            y: 0
        },
        $help          : $('.help'),
        $error         : $('.error'),
        $speed         : $('.speed'),
        $speed_meter   : $('.speed .meter'),
        $english       : $('.english'),
        $english_marker: $('.english .marker')
    });

    // quick add-s
    namespace.$english_marker.draggable({ containment: 'parent' });
    namespace.$speed_meter.draggable({ axis: 'y' });

    // keyboard
    $(document).on('keydown', function(e) {
        if (e.target.tagName.toLowerCase() === 'textarea')
            return;

        switch (e.keyCode) {
            case 8:  namespace.selected.remove(); break;
            case 37: namespace.selected.$el.css('left', '-=1px'); break;
            case 38: namespace.selected.$el.css('top',  '-=1px'); break;
            case 39: namespace.selected.$el.css('left', '+=1px'); break;
            case 40: namespace.selected.$el.css('top',  '+=1px'); break;
        }

        if (e.keyCode === 8) return false;
        if (e.keyCode > 36 && e.keyCode < 41) return false;
    });

    $(document).on('keypress', function(e) {
        if (e.target.tagName.toLowerCase() === 'textarea')
            return;

        console.log (e.target);

        switch (e.which) {
            case 48:  namespace.trigger('add.ball', { type: 'ten' }); return false; // 0
            case 49:  namespace.trigger('add.ball', { type: 'one' }); return false; // 0
            case 50:  namespace.trigger('add.ball', { type: 'two' }); return false; // 0
            case 51:  namespace.trigger('add.ball', { type: 'three' }); return false; // 0
            case 52:  namespace.trigger('add.ball', { type: 'four' }); return false; // 0
            case 53:  namespace.trigger('add.ball', { type: 'five' }); return false; // 0
            case 54:  namespace.trigger('add.ball', { type: 'six' }); return false; // 0
            case 55:  namespace.trigger('add.ball', { type: 'seven' }); return false; // 0
            case 56:  namespace.trigger('add.ball', { type: 'eight' }); return false; // 0
            case 57:  namespace.trigger('add.ball', { type: 'nine' }); return false; // 0
            case 33:  namespace.trigger('add.ball', { type: 'eleven' }); return false; // 0
            case 64:  namespace.trigger('add.ball', { type: 'twelve' }); return false; // 0
            case 35:  namespace.trigger('add.ball', { type: 'thirteen' }); return false; // 0
            case 36:  namespace.trigger('add.ball', { type: 'fourteen' }); return false; // 0
            case 37:  namespace.trigger('add.ball', { type: 'fifteen' }); return false; // 0

            case 103: namespace.trigger('add.ball', { type: 'ghost' }); return false; // g
            case 98:  namespace.trigger('add.ball', { type: 'object' }); return false; // b
            case 99:  namespace.trigger('add.ball', { type: 'cue' }); return false; // c
            case 108: namespace.trigger('add.line'); return false; // l
            case 110: namespace.trigger('add.note'); return false; // n
        };
    });

    $(document).mousemove(function(e) {
        namespace.mouse.x = e.pageX;
        namespace.mouse.y = e.pageY;
    });

})(window.PoolPad || (window.PoolPad = {}));