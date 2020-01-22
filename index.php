<?php
function wpse251841_wp_head() {
    ob_start();
    wp_head();
    return ob_get_clean();
}

function wpse251841_wp_foot() {
    ob_start();
    wp_admin_bar_render();
    return ob_get_clean();
}

ob_start();
include("build/index.html"); 
$contents = ob_get_contents();
ob_end_clean();

if ( current_user_can('administrator') ||  current_user_can('editor') ) {
  $adminheader = str_replace('</head>', wpse251841_wp_head().'</head>', $contents);
  $adminpage = str_replace('</body>', wpse251841_wp_foot().'</body>', $adminheader);
  echo $adminpage;
}
else {
  echo $contents;
}
