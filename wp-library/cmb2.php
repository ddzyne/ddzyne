<?php

if ( file_exists( dirname( __FILE__ ) . '/cmb2/init.php' ) ) {
	require_once dirname( __FILE__ ) . '/cmb2/init.php';
} elseif ( file_exists( dirname( __FILE__ ) . '/CMB2/init.php' ) ) {
	require_once dirname( __FILE__ ) . '/CMB2/init.php';
}

add_action( 'cmb2_init', 'register_column' );
function register_column() {
	$prefix = 'column_';
	$cmb = new_cmb2_box( array(
		'id'           => $prefix . 'metabox',
		'title'        => esc_html__( 'Image column', 'cmb2' ),
		'object_types' => array( 'page', 'work' ),
		'context'      => 'normal',
		'priority'     => 'high',
		'show_names'   => true, 
		'show_in_rest' => WP_REST_Server::READABLE, 
	) );

	$cmb->add_field( array(
		'id'   => $prefix . 'content',
		'type' => 'wysiwyg',
	) );
}

add_action( 'cmb2_init', 'klant_box' );
function klant_box() {
	$prefix = 'extra_';
	$cmb = new_cmb2_box( array(
		'id'           => $prefix . 'metabox',
		'title'        => esc_html__( 'Extra info', 'cmb2' ),
		'object_types' => array( 'work' ),
		'context'      => 'normal',
		'priority'     => 'high',
		'show_names'   => true, 
		'show_in_rest' => WP_REST_Server::READABLE,
	) );

	$cmb->add_field( array(
		'id'   => $prefix . 'klant',
		'name' => 'Klant',
		'type' => 'text',
	) );
	$cmb->add_field( array(
		'id'   => $prefix . 'project',
		'name' => 'Project naam',
		'type' => 'text',
	) );
}

add_action( 'cmb2_init', 'title_box' );
function title_box() {
	$prefix = 'titel_';
	$cmb = new_cmb2_box( array(
		'id'           => $prefix . 'metabox',
		'title'        => esc_html__( 'Uitgebreide titel', 'cmb2' ),
		'object_types' => array( 'page' ),
		'context'      => 'normal',
		'priority'     => 'high',
		'show_names'   => true,
		'show_in_rest' => WP_REST_Server::READABLE,
	) );

	$cmb->add_field( array(
		'id'   => $prefix . 'project',
		'name' => 'Titel',
		'type' => 'text',
	) );
}