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
  let resizableInstance;

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
      resizableInstance.updateSize({
        width: newWidth || width, // `width` is from state in case newWidth not passed in
        height: newHeight || height // `height` is from state in case newHeight not passed in
      });
    }
  };

  const refreshIframe = () => {
    // hacky way to force react to reload iframe with same URL
    setIframeKey(iframeKey + 1);
  };

  useEffect(() => {
    updateDimensions({
      newWidth: iframeRef.current.offsetWidth,
      newHeight: iframeRef.current.offsetHeight
    }, false);
  }, [iframeLoaded]);

  const onIframeLoad = (event) => {
    setIframeLoaded(true);
  };

  const onResizeStop = (event, direction, refToElement, delta) => {
    // console.log('resize', event, direction, refToElement, delta);
    // console.log('updateSize', resizableInstance.updateSize);
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
          refreshIframe={refreshIframe}
        />
      </Header>
      <div className='rulers showRulers'>
        <div className='rulersHorizontal'></div>
        <div className='rulerVertical'></div>
        <div className='resizerContainer transitionable'>
          <img className={loadingClasses} src='/images/throbber.svg' width='48' height='48' alt='Loading' />
          <Resizable
            ref={c => { resizableInstance = c; }}
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
