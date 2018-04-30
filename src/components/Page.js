import React from 'react';

import { pages, SITE_HOME } from '../reducers/wp_types';
//import { withArchive } from '@humanmade/repress';
import { withArchive } from '../lib/repress/index.js';

import { normalizePath } from '../util';

import Parser from 'html-react-parser';
import domToReact from 'html-react-parser/lib/dom-to-react';
import { Link } from 'react-router-dom';


const Page = props => {
  const { loading, posts, archiveId } = props;
  const path = archiveId.replace('_page', '');
  if ( loading ) {
    return <p>Loading</p>;
  }
  if ( ! posts ) {
    return <p>404</p>;
  }
  const page = posts.find( post => post.link.match(path) );
  if ( ! page ) {
    return <p>Also 404</p>;
  }
  return (
    <div className="Page">
      <h1 dangerouslySetInnerHTML={ { __html: page.title.rendered } }/>
      <div className="PageContent">
        { Parser(page.content. rendered, {
          replace: (domNode) => {
            if (domNode.name === 'a' && domNode.attribs.hasOwnProperty('href')) {
              const { href } = domNode.attribs;
              if (
                href.match(SITE_HOME)
                || href.match(SITE_HOME.replace('https://', 'http://'))
                || href.match(SITE_HOME.replace('http://', 'https://'))
              ) {
                const to = href.replace(SITE_HOME, '')
                  .replace(SITE_HOME.replace('https://', 'http://'), '')
                  .replace(SITE_HOME.replace('htts://', 'https://'), '');
                return <Link to={to}>{domToReact(domNode.children.filter(node => node.name !== 'u'))}</Link>;
              }
            }
          }
        })}
      </div>
    </div>
  );
};

export default withArchive(
  pages,
  state => state.pages,
  props => {
    let path = normalizePath(props.location.pathname);
    if (props.history.action === 'PUSH'){
      path = normalizePath(props.history.location.pathname);
    }
    const id = `_page/${ path }`;
    const slug = path.split( '/' ).slice( -1 )[0];
    pages.registerArchive( id, {
      type: 'page',
      slug
    } );
    return id;
  }
)(Page);
