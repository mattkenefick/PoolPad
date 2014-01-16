<?php

// Handle Post Requests
// -----------------------------------------------------------

$post = is_array($_POST) ? $_POST : false;

// save posted diagram
if ($post) {
    $cue    = json_encode(@$post['cue']   ?: array());
    $lines  = json_encode(@$post['lines'] ?: array());
    $notes  = json_encode(@$post['notes'] ?: array());
    $balls  = json_encode(@$post['balls'] ?: array());
    $marker = json_encode($post['marker']);
    $speed  = json_encode($post['speed']);
    $hash   = sha1($cue . $lines . $notes . $balls . $marker . $speed);
    $csrf   = $post['csrf'];

    if (session_id() == $csrf) {
        $database->assign('hash',   $hash);
        $database->select("diagrams");

        if (!$database->num_rows()) {
            // save
            $database->assign('cue',    $cue);
            $database->assign('balls',  $balls);
            $database->assign('marker', $marker);
            $database->assign('speed',  $speed);
            $database->assign('lines',  $lines);
            $database->assign('notes',  $notes);
            $database->assign('hash',   $hash);

            if ($insert_id = $database->insert('diagrams')) {
                die(json_encode(array(
                    'success' => true,
                    'id'      => $insert_id
                )));
            }
        }
        else {
            die(json_encode(array(
                'error'   => true,
                'message' => 'An identical table setup already exists.'
            )));
        }
    };

    session_regenerate_id();
};
