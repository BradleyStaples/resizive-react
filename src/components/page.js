import React from 'react';
import { Helmet } from 'react-helmet';

import Header from './header';
import '../styles/resizive.scss';

const Page = ({ title, pageType, children }) => {
  return (
    <div>
      <Helmet>
        <meta charSet='utf-8' />
        <title>{title}</title>
        <link rel='canonical' href='https://resizive.bradleystaples.com/' />
        <meta name='description' content='Enables easier detection of content-based breakpoints for media queries in regards to responsively designed fluid-width websites.' />
        <meta name='author' content='Bradley Staples' />
        <link rel='shortcut' href='/images/favicon.ico' />
        <meta name='robots' content='index, follow' />
        <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
      </Helmet>
      <Header pageType={pageType} />
      {children}
    </div>
  )
};

export default Page;
