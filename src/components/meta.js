import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title, path }) => {
  return (
    <Helmet>
      <meta charSet='utf-8' />
      <title>{title}</title>
      <link rel='canonical' href={`https://resizive.bradleystaples.com/${path}`} />
      <meta name='description' content='Enables easier detection of content-based breakpoints for media queries in regards to responsively designed fluid-width websites.' />
      <meta name='author' content='Bradley Staples' />
      <link rel='shortcut icon' href='/images/favicon.ico' />
      <meta name='robots' content='index, follow' />
      <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
    </Helmet>
  )
};

export default Meta;
