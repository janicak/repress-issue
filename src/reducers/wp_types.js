import { handler } from '../lib/repress/index.js';

export const SITE_HOME = "https://www.darkenergybiosphere.org";
const API_ROOT = SITE_HOME + '/wp-json/';
//const API_NONCE = window.wpApiSettings.nonce;

export const pages = new handler( {
  //nonce: API_NONCE,
  type:  'page',
  url:   `${ API_ROOT }wp/v2/pages`,
  query: {
    _embed: '1',
  },
} );
