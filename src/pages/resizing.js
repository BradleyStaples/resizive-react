import React, { useState } from 'react';
import classnames from 'classnames';
import Page from '../components/page';

const ResizingPage = () => {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const resizerOnLoad = (event) => {
    setIframeLoaded(true);
  };

  const loadingClasses = classnames({
    loading: true,
    hidden: iframeLoaded
  });

  const frameClasses = classnames({
    urlEnresizer: true,
    hidden: !iframeLoaded
  });

  const search = window.location.search;
  const params = new URLSearchParams(search);
  const url = params.get('url');
  const title = url ? `Resizive: ${url}` : 'Resizive';

  return (
    <Page title={title} pageType='resizing'>
      <div className='rulers showRulers'>
        <div className='rulersHorizontal'></div>
        <div className='rulerVertical'></div>
        <div className='resizerContainer transitionable'>
          <img className={loadingClasses} src='/images/throbber.svg' width='48' height='48' alt='Loading' />
          <div className='frame'>
            <iframe className={frameClasses} title='Resizing' src={url} height='100%' frameBorder='0' onLoad={resizerOnLoad} />
          </div>
        </div>
      </div>
    </Page>
  )
}

export default ResizingPage;
