<?php


// Define Baseurl
// ---------------------------------------------------------------

$script_url  = str_replace('index.php', '', $_SERVER['PHP_SELF']);
$request_uri = substr($_SERVER['REQUEST_URI'], strlen($script_url), 300);
$site_url    = 'http://' . $_SERVER['SERVER_NAME'] . $script_url;

$request_uri    = str_replace('/', '', $request_uri);
$request_params = explode('?', $request_uri, 2);
$request_ary    = explode('/', current($request_params), 3);

@list($diagram_id) = $request_ary;


// Setup MySQL
// ----------------------------------------------------------------

$database = new DB;
$database->init('localhost', 'root', 'password', 'poolpad');