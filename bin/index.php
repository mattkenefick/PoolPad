<?php

session_start();

include 'lib/mysql.php';
include 'config.php';
include 'request.php';


// ---------------------------------------------------------

// get diagram to load if we have an id
$diagram = false;

if (is_numeric(intval($diagram_id))) {
    $database->query("SELECT * FROM diagrams WHERE id = $diagram_id");

    $diagram = $database->fetch_row_object();

    if (!is_object($diagram)) {
        $diagram = false;
    }
    else {
        $diagram->cue    = json_decode($diagram->cue);
        $diagram->lines  = json_decode($diagram->lines);
        $diagram->notes  = json_decode($diagram->notes);
        $diagram->balls  = json_decode($diagram->balls);
        $diagram->marker = json_decode($diagram->marker);
        $diagram->speed  = json_decode($diagram->speed);
    }
}

?><!DOCTYPE html>

<html>
    <head>
        <title>Pool Pad</title>

        <link href="<?= $site_url; ?>style/main.css" rel="stylesheet">
        <link href="<?= $site_url; ?>style/fonts.css" rel="stylesheet">
        <link href="<?= $site_url; ?>style/cue.css" rel="stylesheet">
        <link href="<?= $site_url; ?>style/table.css" rel="stylesheet">
        <link href="<?= $site_url; ?>style/balls.css" rel="stylesheet">
        <link href="<?= $site_url; ?>style/lines.css" rel="stylesheet">
        <link href="<?= $site_url; ?>style/notes.css" rel="stylesheet">
        <link href="<?= $site_url; ?>style/ionicons.css" rel="stylesheet">

        <script>
            document.createElement('cue');
            document.createElement('ball');
            document.createElement('line');
            document.createElement('note');
            document.createElement('table');
        </script>
    </head>
    <body>
        <div class="options">
            <button value="save"><span class="icon-heart"></span> Save</button>
            <button value="add-ball"><span class="icon-ios7-circle-outline"></span> Add Ball</button>
            <button value="add-line"><span class="icon-arrow-right-c"></span> Add Line</button>
            <button value="add-note"><span class="icon-compose"></span> Add Note</button>
            <button value="reset-table"><span class="icon-close"></span> Reset Table</button>
            <button value="reset-english"><span class="icon-ionic"></span> Reset English</button>
            <button value="help"><span class="icon-ios7-help-outline"></span> Help</button>
        </div>

        <div class="help chalk">
            <a class="close" href="#close"><i class="icon-close"></i></a>

            <h3>Keyboard commands</h3>
            <p>Use your keyboard arrow keys to fine adjust ball placement.</p>
            <p><strong>C</strong> adds a cue ball to the table.</p>
            <p><strong>B</strong> adds an object ball to the table.</p>
            <p><strong>G</strong> adds a ghost ball to the table.</p>
            <p><strong>L</strong> adds a line to the table.</p>
            <p><strong>N</strong> adds a note to the table.</p>
            <p><strong>0-9</strong> adds the respective ball to the table (use shift for 11-15).</p>

            <h3>Removing items</h3>
            <p>Click an object and press DELETE to remove it.</p>
        </div>

        <h3 class="error"></h3>

        <cue></cue>

        <table></table>

        <div class="speed">
            <div class="meter"></div>
        </div>

        <div class="english">
            <div class="marker"></div>
        </div>

        <script src="<?= $site_url; ?>script/lib/jquery-2.0.3.js"></script>
        <script src="<?= $site_url; ?>script/lib/jquery-ui.min.js"></script>
        <script src="<?= $site_url; ?>script/lib/jquery.transit.js"></script>
        <script src="<?= $site_url; ?>script/lib/underscore.js"></script>
        <script src="<?= $site_url; ?>script/lib/backbone.js"></script>

        <script src="<?= $site_url; ?>script/app/main.js"></script>
        <script src="<?= $site_url; ?>script/app/menu.js"></script>
        <script src="<?= $site_url; ?>script/app/cue.js"></script>
        <script src="<?= $site_url; ?>script/app/table.js"></script>
        <script src="<?= $site_url; ?>script/app/balls.js"></script>
        <script src="<?= $site_url; ?>script/app/ball.js"></script>
        <script src="<?= $site_url; ?>script/app/lines.js"></script>
        <script src="<?= $site_url; ?>script/app/line.js"></script>
        <script src="<?= $site_url; ?>script/app/notes.js"></script>
        <script src="<?= $site_url; ?>script/app/note.js"></script>

        <script>
            var BASE_URL = "<?= $script_url; ?>",
                CSRF     = "<?= session_id(); ?>",
                KEY_SHIFT;

            window.menu = new window.PoolPad.Menu({
                el: $('.options')
            });

            window.cue = new window.PoolPad.Cue({
                el: $('cue')
            });

            window.table = new window.PoolPad.Table({
                el: $('table')
            });

            window.table.render();


<?php if ($diagram): ?>

            // Running a Diagram
            // ----------------------------------------
            var namespace    = window.PoolPad;
            var diagram_json = <?= json_encode($diagram); ?>;

            $(diagram_json.balls).each(function(i, json) {
                var ball = window.table.balls.add(json);

                ball.$el.css({
                    left: json.x + 'px',
                    top:  json.y + 'px'
                });
            });

            $(diagram_json.notes).each(function(i, json) {
                var note = window.table.notes.add(json);

                note.$el.css({
                    left  : json.x + 'px',
                    top   : json.y + 'px'
                });

                note.$el.find('textarea').css({
                    width : json.width + 'px',
                    height: json.height + 'px'
                });
            });

            $(diagram_json.lines).each(function(i, json) {
                var line = window.table.lines.add(json);

                line.$el.css({
                    left: json.x + 'px',
                    top :  json.y + 'px'
                });
                line.$el.find('.rotatable').css({
                    transform          : json.transform,
                    '-webkit-transform': json.transform,
                    width              : json.width
                });
            });

            $(diagram_json.cue).each(function(i, json) {
                window.cue.$el.css({
                    left: json.x + 'px',
                    top : json.y + 'px'
                });
                window.cue.$el.find('.draw').css({
                    transform          : json.transform,
                    '-webkit-transform': json.transform,
                });
            });

            namespace.$english_marker.css({
                left: diagram_json.marker.x + 'px',
                top:  diagram_json.marker.y + 'px'
            });

            namespace.$speed_meter.css({
                top: diagram_json.speed.y + 'px'
            });
<?php endif; ?>
        </script>

        <script>
            // Analytics
            var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
            document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
        </script>
        <script type="text/javascript">
            try{
            var pageTracker = _gat._getTracker("UA-5728922-1");
            pageTracker._trackPageview();
            } catch(err) {}
        </script>
    </body>
</html>