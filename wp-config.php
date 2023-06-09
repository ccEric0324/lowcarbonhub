<?php

/**

 * The base configuration for WordPress

 *

 * The wp-config.php creation script uses this file during the installation.

 * You don't have to use the web site, you can copy this file to "wp-config.php"

 * and fill in the values.

 *

 * This file contains the following configurations:

 *

 * * Database settings

 * * Secret keys

 * * Database table prefix

 * * ABSPATH

 *

 * @link https://wordpress.org/support/article/editing-wp-config-php/

 *

 * @package WordPress

 */


// ** Database settings - You can get this info from your web host ** //

/** The name of the database for WordPress */

define( 'DB_NAME', 'bitnami_wordpress' );


/** Database username */

define( 'DB_USER', 'bn_wordpress' );


/** Database password */

define( 'DB_PASSWORD', 'eee6aed4a459bc586b1571d8727895f56bc61deb690e3a98620f6962eed48ee9' );


/** Database hostname */

define( 'DB_HOST', '127.0.0.1:3306' );


/** Database charset to use in creating database tables. */

define( 'DB_CHARSET', 'utf8' );


/** The database collate type. Don't change this if in doubt. */

define( 'DB_COLLATE', '' );


/**#@+

 * Authentication unique keys and salts.

 *

 * Change these to different unique phrases! You can generate these using

 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.

 *

 * You can change these at any point in time to invalidate all existing cookies.

 * This will force all users to have to log in again.

 *

 * @since 2.6.0

 */

define( 'AUTH_KEY',         '| %%bQn[sX};EpS[37BP9UNs&+?>Akq0@BY$*pRwg{>#l+I*l9|x#|RWnhJY{qXW' );

define( 'SECURE_AUTH_KEY',  'pU0_d!i7?lmk76Low[|*mTZ$kGjP=!FW5TcE`F~FZMRV9vrXJUn~:c%[o&|qm!lL' );

define( 'LOGGED_IN_KEY',    'STTLg,>u-9H;*s(B53enJV9W(}pJ^g%[F.}.o8!_eI!:UO*#5M|UZEJl;M@Sk1;(' );

define( 'NONCE_KEY',        '!zc>0 ,+DbFZGGq;0J8*~:3 [7^cT;fK>_^g~)@mJ_Y<0r}^&H~<NrDD)$ _]nhR' );

define( 'AUTH_SALT',        '3IB/?;Y><Rw-O0DhgP6UYx*9*E?|)FA@pDTA#9M9UDeXeDlWwy>9N)a1lq`(q2/U' );

define( 'SECURE_AUTH_SALT', 'mWB>VD(@L.XZ|@`Ze[B=PIc2g5K):7jH;6EEk4W@1w1,goLjpm,- 5dle|+A8H^D' );

define( 'LOGGED_IN_SALT',   '1t_ ao*64NJ)NkJkCORREKwU:P?]=cNKx+7]#h}F|HIxv[69K8||R4mMwpi,rqYF' );

define( 'NONCE_SALT',       '_3u,x;rO(f5j}g~}g]xB&;)u& 6EDDt#1abUq&dgY5$Jl>.~K=o87x{gT7-aH4 m' );


/**#@-*/


/**

 * WordPress database table prefix.

 *

 * You can have multiple installations in one database if you give each

 * a unique prefix. Only numbers, letters, and underscores please!

 */

$table_prefix = 'wp_';


/**

 * For developers: WordPress debugging mode.

 *

 * Change this to true to enable the display of notices during development.

 * It is strongly recommended that plugin and theme developers use WP_DEBUG

 * in their development environments.

 *

 * For information on other constants that can be used for debugging,

 * visit the documentation.

 *

 * @link https://wordpress.org/support/article/debugging-in-wordpress/

 */

define( 'WP_DEBUG', false );


/* Add any custom values between this line and the "stop editing" line. */




define( 'FS_METHOD', 'direct' );
/**
 * The WP_SITEURL and WP_HOME options are configured to access from any hostname or IP address.
 * If you want to access only from an specific domain, you can modify them. For example:
 *  define('WP_HOME','http://example.com');
 *  define('WP_SITEURL','http://example.com');
 *
 */
if ( defined( 'WP_CLI' ) ) {
	$_SERVER['HTTP_HOST'] = '127.0.0.1';
}

define( 'WP_HOME', 'http://' . $_SERVER['HTTP_HOST'] . '/' );
define( 'WP_SITEURL', 'http://' . $_SERVER['HTTP_HOST'] . '/' );
define( 'WP_AUTO_UPDATE_CORE', 'minor' );
/* That's all, stop editing! Happy publishing. */


/** Absolute path to the WordPress directory. */

if ( ! defined( 'ABSPATH' ) ) {

	define( 'ABSPATH', __DIR__ . '/' );

}


/** Sets up WordPress vars and included files. */

require_once ABSPATH . 'wp-settings.php';

/**
 * Disable pingback.ping xmlrpc method to prevent WordPress from participating in DDoS attacks
 * More info at: https://docs.bitnami.com/general/apps/wordpress/troubleshooting/xmlrpc-and-pingback/
 */
if ( !defined( 'WP_CLI' ) ) {
	// remove x-pingback HTTP header
	add_filter("wp_headers", function($headers) {
		unset($headers["X-Pingback"]);
		return $headers;
	});
	// disable pingbacks
	add_filter( "xmlrpc_methods", function( $methods ) {
		unset( $methods["pingback.ping"] );
		return $methods;
	});
}
