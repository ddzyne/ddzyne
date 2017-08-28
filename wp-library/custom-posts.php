<?php
add_action( 'init', 'work_post' );
function work_post() {
  $labels = array(
    'name'               => _x( 'Work', 'post type general name', 'your-plugin-textdomain' ),
    'singular_name'      => _x( 'Work', 'post type singular name', 'your-plugin-textdomain' ),
    'menu_name'          => _x( 'Work', 'admin menu', 'your-plugin-textdomain' ),
    'name_admin_bar'     => _x( 'Work', 'add new on admin bar', 'your-plugin-textdomain' ),
    'add_new'            => _x( 'Add New', 'book', 'your-plugin-textdomain' ),
    'add_new_item'       => __( 'Add New Work', 'your-plugin-textdomain' ),
    'new_item'           => __( 'New Work', 'your-plugin-textdomain' ),
    'edit_item'          => __( 'Edit Work', 'your-plugin-textdomain' ),
    'view_item'          => __( 'View Work', 'your-plugin-textdomain' ),
    'all_items'          => __( 'All Work', 'your-plugin-textdomain' ),
    'search_items'       => __( 'Search Work', 'your-plugin-textdomain' ),
    'parent_item_colon'  => __( 'Parent Work:', 'your-plugin-textdomain' ),
    'not_found'          => __( 'No Work found.', 'your-plugin-textdomain' ),
    'not_found_in_trash' => __( 'No Work found in Trash.', 'your-plugin-textdomain' )
  );
 
  $args = array(
    'labels'             => $labels,
    'public'             => true,
    'publicly_queryable' => true,
    'show_ui'            => true,
    'show_in_menu'       => true,
    'query_var'          => true,
    'rewrite'            => array( 'slug' => 'work' ),
    'capability_type'    => 'page',
    'has_archive'        => true,
    'hierarchical'       => false,
    'menu_position'      => null,
    'show_in_rest'       => true,
    'rest_base'          => 'work',
    'rest_controller_class' => 'WP_REST_Posts_Controller',
    'supports'           => array( 'title', 'editor', 'thumbnail',  ),
    'taxonomies'         => array( 'post_tag' ),
  );
 
  register_post_type( 'work', $args );
}

//put menu in rest
function ddzyne_get_menu() {
    # 'menu' = menu name in wp.
    return wp_get_nav_menu_items('Main');
}

add_action( 'rest_api_init', function () {
        register_rest_route( 'custom_routes', '/menu', array(
        'methods' => 'GET',
        'callback' => 'ddzyne_get_menu',
    ) );
} );