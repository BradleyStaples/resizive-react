import React, { useState, useRef, useEffect, useReducer } from 'react';
import classnames from 'classnames';
import { Resizable } from 're-resizable';

import Meta from '../components/meta';
import Header from '../components/header';
import ControlPanel from '../components/control-panel';
import fetchLocalStorageValues from '../components/get-config-values';
import useWindowSize from '../components/use-window-size';
import useInterval from '../components/use-interval';
import '../styles/resizive.scss';

const ResizingPage = () => {
  const iframeRef = useRef();
  const resizableRef = useRef();
  const animationTimerRef = useRef();

  const animationDirectionRef = useRef();
  if (!animationDirectionRef.current) {
    animationDirectionRef.current = 1;
  }

  const initialValues = useRef();
  initialValues.current = fetchLocalStorageValues();

  const [iframeKey, setIframeKey] = useState(0);

  let [windowWidth] = useWindowSize();

  function iframeReducer(state, action) {
    switch (action.type) {
      case 'loaded':
        return Object.assign({}, state, { isLoaded: true });
      case 'updateDimensions':
        return Object.assign({}, state, {
          width: state.width + action.widthDelta,
          height: state.height + action.heightDelta,
          isResizing: action.isResizing
        });
      case 'stopResizing':
        return Object.assign({}, state, { isResizing: false });
      case 'startAnimating':
        return Object.assign({}, state, { isAnimating: true });
      case 'stopAnimating':
        return Object.assign({}, state, { isAnimating: false });
      default:
        throw new Error('invalid iframe reducer action type');
    }
  };
  const iframeInitialState = {
    isLoaded: false,
    width: 0,
    height: 0,
    isResizing: false,
    isAnimating: false
  };
  const [iframeState, iframeDispatch] = useReducer(iframeReducer, iframeInitialState);

  useEffect(() => {
    // abuse of a ref to make sure local storage values are gathered on each page render
    initialValues.current = fetchLocalStorageValues();
  });

  useEffect(() => {
    if (iframeState.isResizing) {
      resizableRef.current.updateSize({
        width: iframeState.width,
        height: iframeState.height
      });
      iframeDispatch({type: 'stopResizing'});
    }
  }, [iframeState.width, iframeState.height, iframeState.isResizing]);

  useEffect(() => {
    updateDimensions({
      widthDelta: iframeRef.current.offsetWidth,
      heightDelta: iframeRef.current.offsetHeight
    }, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [iframeState.isLoaded]);

  useEffect(() => {
    if (!iframeState.isAnimating) {
      clearInterval(animationTimerRef.current);
      animationTimerRef.current = null;
    }
  }, [iframeState.isAnimating]);

  let floor = 320;
  let delta = initialValues.current.animationIncrement;
  let duration = initialValues.current.animationDuration;

  animationTimerRef.current = useInterval(() => {
    let newWidth = iframeState.width + (delta * animationDirectionRef.current);
    let widthDelta;

    if (newWidth >= windowWidth && animationDirectionRef.current === 1) {
      // change direction to be decremental
      animationDirectionRef.current = -1;
      widthDelta = delta * -1;
    } else if (newWidth <= floor && animationDirectionRef.current === -1) {
      // change direction to be incremental
      animationDirectionRef.current = 1;
      widthDelta = delta;
    } else {
      // maintain existing direction
      widthDelta = delta * animationDirectionRef.current;
    };

    updateDimensions({
      widthDelta
    }, true);
  }, iframeState.isAnimating && iframeState.isLoaded ? duration : null);

  const updateDimensions = ({ widthDelta, heightDelta }, isResizing) => {
    // allow for only one delta to be passed in
    widthDelta = widthDelta || 0;
    heightDelta = heightDelta || 0;

    iframeDispatch({
      type: 'updateDimensions',
      widthDelta,
      heightDelta,
      isResizing
    });
  };

  const reloadIframe = () => {
    // hacky way to force react to reload iframe with same URL
    setIframeKey(iframeKey + 1);
  };

  const onIframeLoad = (event) => {
    iframeDispatch({ type: 'loaded' });
  };

  const startAnimation = () => {
    iframeDispatch({ type: 'startAnimating' });
  };

  const stopAnimation = () => {
    iframeDispatch({ type: 'stopAnimating' });
  };

  const onResizeStop = (event, direction, refToElement, delta) => {
    updateDimensions({
      widthDelta: delta.width,
      heightDelta: delta.height
    }, false);
  };

  const loadingClasses = classnames({
    loading: true,
    hidden: iframeState.isLoaded
  });

  const frameClasses = classnames({
    resizer: true,
    hidden: !iframeState.isLoaded
  });

  const wrapperClass = classnames({
    resizing: iframeState.isLoaded
  });

  const rulerClasses = classnames({
    rulers: true,
    showRulers: initialValues.current.useRulers
  });

  const windowGlobal = typeof window !== 'undefined' && window;
  let title;
  let url;
  try {
    const search = windowGlobal.location.search;
    const params = new URLSearchParams(search);
    url = params.get('url');
    title = url ? `Resizive: ${url}` : 'Resizive';
  } catch (e) {
    title = 'Resizive';
    url = '';
    console.log('Error getting url from query param');
  }

  let transitionDuration = initialValues.current.animationDuration / 1000; // animationDuration is an integer of milliseconds
  let resizableStyles = {
    transition: `height ${transitionDuration}s, width ${transitionDuration}s`
  };

  let scrolling = 'no';
  if (initialValues.current.useScrollbars) {
    scrolling = 'yes';
  }

  return (
    <div className={wrapperClass}>
      <Meta title={title} path='resizing' />
      <Header>
        <ControlPanel
          width={iframeState.width}
          height={iframeState.height}
          isAnimating={iframeState.isAnimating}
          updateDimensions={updateDimensions}
          reloadIframe={reloadIframe}
          startAnimation={startAnimation}
          stopAnimation={stopAnimation}
        />
      </Header>
      <div className={rulerClasses}>
        <div className='rulersHorizontal'></div>
        <div className='rulerVertical'></div>
        <div className='resizerContainer'>
          <img className={loadingClasses} src='/images/throbber.svg' width='48' height='48' alt='Loading' />
          <Resizable
            ref={resizableRef}
            className='frame'
            style={resizableStyles}
            bounds='parent'
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
              scrolling={scrolling}
              onLoad={onIframeLoad}
            />
          </Resizable>
        </div>
      </div>
    </div>
  )
}

export default ResizingPage;
