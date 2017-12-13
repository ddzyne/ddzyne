<?php

//menus
register_nav_menus(array(
	'main-menu'  => 'Main menu',
));

//allow svg
function cc_mime_types($mimes) {
  $mimes['svg'] = 'image/svg+xml';
  return $mimes;
}
add_filter('upload_mimes', 'cc_mime_types');

add_post_type_support( 'page', 'excerpt' );