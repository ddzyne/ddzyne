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


add_action( 'cmb2_init', 'about_page_social' );
function about_page_social() {
	$prefix = 'about_social_';
	$cmb = new_cmb2_box( array(
		'id'           => $prefix . 'metabox',
		'title'        => esc_html__( 'Social links', 'cmb2' ),
		'object_types' => array( 'page' ),
		'show_on'      => array( 'key' => 'page-template', 'value' => 'wp-library/over-template.php' ),
		'context'      => 'normal',
		'priority'     => 'high',
		'show_names'   => true,
		'show_in_rest' => WP_REST_Server::READABLE,
	) );

	$group_field_id = $cmb->add_field( array(
		'id'          => $prefix . 'group',
		'type'        => 'group',
		'options'     => array(
			'group_title'   => esc_html__( 'Veld {#}', 'cmb2' ),
			'add_button'    => esc_html__( 'Voeg nog een veld toe', 'cmb2' ),
			'remove_button' => esc_html__( 'Verwijder veld', 'cmb2' ),
			'sortable'      => true,
			'closed'        => false,
		),
	) );
	$cmb->add_group_field( $group_field_id, array(
		'name'       => esc_html__( 'Titel', 'cmb2' ),
		'id'         => 'title',
		'type'       => 'text',
	) );
	$cmb->add_group_field( $group_field_id, array(
		'name'       => esc_html__( 'Icoon font awesome', 'cmb2' ),
		'id'         => 'icon',
		'type'       => 'text',
	) );
	$cmb->add_group_field( $group_field_id, array(
		'name'       => esc_html__( 'Link', 'cmb2' ),
		'id'         => 'url',
		'type'       => 'text_url',
	) );
}

add_action( 'cmb2_init', 'about_page_clients' );
function about_page_clients() {
	$prefix = 'about_clients_';
	$cmb = new_cmb2_box( array(
		'id'           => $prefix . 'metabox',
		'title'        => esc_html__( 'Klanten', 'cmb2' ),
		'object_types' => array( 'page' ),
		'show_on'      => array( 'key' => 'page-template', 'value' => 'wp-library/over-template.php' ),
		'context'      => 'normal',
		'priority'     => 'high',
		'show_names'   => true,
		'show_in_rest' => WP_REST_Server::READABLE,
	) );

	$group_field_id = $cmb->add_field( array(
		'id'          => $prefix . 'group',
		'type'        => 'group',
		'options'     => array(
			'group_title'   => esc_html__( 'Veld {#}', 'cmb2' ),
			'add_button'    => esc_html__( 'Voeg nog een veld toe', 'cmb2' ),
			'remove_button' => esc_html__( 'Verwijder veld', 'cmb2' ),
			'sortable'      => true,
			'closed'        => false,
		),
	) );
	$cmb->add_group_field( $group_field_id, array(
		'name'       => esc_html__( 'Titel', 'cmb2' ),
		'id'         => 'title',
		'type'       => 'text',
	) );
	$cmb->add_group_field( $group_field_id, array(
		'name'       => esc_html__( 'Logo', 'cmb2' ),
		'id'         => 'logo',
		'type'       => 'file',
	) );
}