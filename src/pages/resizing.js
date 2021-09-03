import React, { useState, useRef, useEffect } from 'react';
import classnames from 'classnames';
import { Resizable } from 're-resizable';
// import debounce from 'lodash.debounce';

import Meta from '../components/meta';
import Header from '../components/header';
import ControlPanel from '../components/control-panel';
import '../styles/resizive.scss';

const ResizingPage = () => {
  const iframeRef = useRef();
  const resizableRef = useRef();

  const [iframeLoaded, setIframeLoaded] = useState(false);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [iframeKey, setIframeKey] = useState(0);

  const updateDimensions = ({ newWidth, newHeight}, resizeIframe) => {
    if (newWidth) {
      setWidth(newWidth);
    }
    if (newHeight) {
      setHeight(newHeight);
    }
    if (resizeIframe) {
      resizableRef.current.updateSize({
        width: newWidth || width, // `width` is from state in case newWidth not passed in
        height: newHeight || height // `height` is from state in case newHeight not passed in
      });
    }
  };

  useEffect(() => {
    updateDimensions({
      newWidth: iframeRef.current.offsetWidth,
      newHeight: iframeRef.current.offsetHeight
    }, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [iframeLoaded]);

  const reloadIframe = () => {
    // hacky way to force react to reload iframe with same URL
    setIframeKey(iframeKey + 1);
  };

  const onIframeLoad = (event) => {
    setIframeLoaded(true);
  };

  const onResizeStop = (event, direction, refToElement, delta) => {
    updateDimensions({
      newWidth: iframeRef.current.offsetWidth,
      newHeight: iframeRef.current.offsetHeight
    }, false);
  };

  const loadingClasses = classnames({
    loading: true,
    hidden: iframeLoaded
  });

  const frameClasses = classnames({
    resizer: true,
    hidden: !iframeLoaded
  });

  const wrapperClass = classnames({
    resizing: iframeLoaded
  });

  const search = window.location.search;
  const params = new URLSearchParams(search);
  const url = params.get('url');
  const title = url ? `Resizive: ${url}` : 'Resizive';

  return (
    <div className={wrapperClass}>
      <Meta title={title} path='resizing' />
      <Header>
        <ControlPanel
          width={width}
          height={height}
          updateDimensions={updateDimensions}
          reloadIframe={reloadIframe}
        />
      </Header>
      <div className='rulers showRulers'>
        <div className='rulersHorizontal'></div>
        <div className='rulerVertical'></div>
        <div className='resizerContainer'>
          <img className={loadingClasses} src='/images/throbber.svg' width='48' height='48' alt='Loading' />
          <Resizable
            ref={resizableRef}
            className='frame'
            bounds='window'
            defaultSize={{
              height: '75vh',
              width: '75vw'
            }}
            enable={{
              top: false,
              right: true,
              bottom: true,
              left: false,
              topRight: false,
              bottomRight: true,
              bottomLeft: false,
              topLeft: false
            }}
            onResizeStop={onResizeStop}
          >
            <iframe
              key={iframeKey}
              ref={iframeRef}
              className={frameClasses}
              title='Resizing'
              src={url}
              height='100%'
              frameBorder='0'
              onLoad={onIframeLoad}
            />
          </Resizable>
        </div>
      </div>
    </div>
  )
}

export default ResizingPage;
