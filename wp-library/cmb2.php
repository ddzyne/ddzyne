<?php

if ( file_exists( dirname( __FILE__ ) . '/cmb2/init.php' ) ) {
	require_once dirname( __FILE__ ) . '/cmb2/init.php';
} elseif ( file_exists( dirname( __FILE__ ) . '/CMB2/init.php' ) ) {
	require_once dirname( __FILE__ ) . '/CMB2/init.php';
}

add_action( 'cmb2_init', 'register_column' );
/**
 * Hook in and add a metabox that only appears on the 'About' page
 */
function register_column() {
	$prefix = 'column_';

	/**
	 * Metabox to be displayed on a single page ID
	 */
	$cmb = new_cmb2_box( array(
		'id'           => $prefix . 'metabox',
		'title'        => esc_html__( 'Image column', 'cmb2' ),
		'object_types' => array( 'page', 'work' ), // Post type
		'context'      => 'normal',
		'priority'     => 'high',
		'show_names'   => true, // Show field names on the left
		'show_in_rest' => WP_REST_Server::READABLE, // or WP_REST_Server::ALLMETHODS/WP_REST_Server::EDITABLE,
	) );

	$cmb->add_field( array(
		'id'   => $prefix . 'content',
		'type' => 'wysiwyg',
	) );

}

add_action( 'cmb2_init', 'klant_box' );
/**
 * Hook in and add a metabox that only appears on the 'About' page
 */
function klant_box() {
	$prefix = 'extra_';

	/**
	 * Metabox to be displayed on a single page ID
	 */
	$cmb = new_cmb2_box( array(
		'id'           => $prefix . 'metabox',
		'title'        => esc_html__( 'Extra info', 'cmb2' ),
		'object_types' => array( 'work' ), // Post type
		'context'      => 'normal',
		'priority'     => 'high',
		'show_names'   => true, // Show field names on the left
		'show_in_rest' => WP_REST_Server::READABLE, // or WP_REST_Server::ALLMETHODS/WP_REST_Server::EDITABLE,
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
/**
 * Hook in and add a metabox that only appears on the 'About' page
 */
function title_box() {
	$prefix = 'titel_';

	/**
	 * Metabox to be displayed on a single page ID
	 */
	$cmb = new_cmb2_box( array(
		'id'           => $prefix . 'metabox',
		'title'        => esc_html__( 'Uitgebreide titel', 'cmb2' ),
		'object_types' => array( 'page' ), // Post type
		'context'      => 'normal',
		'priority'     => 'high',
		'show_names'   => true, // Show field names on the left
		'show_in_rest' => WP_REST_Server::READABLE, // or WP_REST_Server::ALLMETHODS/WP_REST_Server::EDITABLE,
	) );

	$cmb->add_field( array(
		'id'   => $prefix . 'project',
		'name' => 'Titel',
		'type' => 'text',
	) );
}