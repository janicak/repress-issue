import React from 'react';

import { pages, SITE_HOME } from '../reducers/wp_types';
import { withArchive } from '@humanmade/repress';

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
  let siteHome = (SITE_HOME.replace('http://', '').replace('https://', ''));
  const page = posts.find( post => post.link === SITE_HOME + path + '/' );
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
              if ( href.match(siteHome)){
                const to = href.replace('http://' + siteHome, '').replace('https://' + siteHome, '');
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
