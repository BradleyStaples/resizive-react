import React, { useState, useEffect, useRef } from 'react';
import classnames from 'classnames';
import { useHotkeys } from 'react-hotkeys-hook';
import { Link } from 'gatsby';

import useWindowSize from '../components/use-window-size';
import useInterval from '../components/use-interval';
import fetchLocalStorageValues from '../components/get-config-values';
import { phoneList, tabletList } from './device-sizes';

const ControlPanel = ({ width, height, updateDimensions, reloadIframe }) => {

  const initialValues = useRef();
  initialValues.current = fetchLocalStorageValues();

  useEffect(() => {
    // abuse of a ref to make sure local storage values are gathered on each page render
    initialValues.current = fetchLocalStorageValues();
  });

  const animationDirectionRef = useRef();
  animationDirectionRef.current = 1;
  let [windowWidth] = useWindowSize();

  const [widthError, setWidthError] = useState(false);
  const [heightError, setHeightError] = useState(false);
  const [shonePhoneList, setShowPhoneList] = useState(false);
  const [shoneTabletList, setShowTabletList] = useState(false);
  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    let floor = 320;
    let delta = initialValues.current.animationIncrement;
    let duration = initialValues.current.animationDuration;

    useInterval(() => {
      let newWidth = width + (delta * animationDirectionRef.current);

      if (newWidth >= windowWidth && animationDirectionRef.current === 1) {
        animationDirectionRef.current = -1;
        newWidth = width + (delta * animationDirectionRef.current)
      }

      if (newWidth <= floor && animationDirectionRef.current === -1) {
        animationDirectionRef.current = 1;
        newWidth = width + (delta * animationDirectionRef.current)
      }

      console.log('animationDirectionRef.current', animationDirectionRef.current, 'width', width, 'newWidth', newWidth, 'delta', delta, 'duration', duration);
      updateDimensions({
        newWidth,
        height
      }, true);

    }, animation ? duration : null);
  }, [animation, height, width, updateDimensions, windowWidth]);

  const onStart = (event) => {
    setAnimation(true);
  };

  const onStop = (event) => {
    setAnimation(false);
  };

  const decrementWidth = (event) => {
    let newWidth = width - initialValues.current['stepIncrement'];
    updateDimensions({
      newWidth,
    }, true);
  };

  const incrementWidth = (event) => {
    let newWidth = width + initialValues.current['stepIncrement'];
    updateDimensions({
      newWidth,
    }, true);
  };

  const decrementHeight = (event) => {
    let newHeight = height - initialValues.current['stepIncrement'];
    updateDimensions({
      newHeight,
    }, true);
  };

  const incrementHeight = (event) => {
    let newHeight = height + initialValues.current['stepIncrement'];
    updateDimensions({
      newHeight,
    }, true);
  };

  const onWidthChange = (event) => {
    let value = event.target.value;
    let newWidth = parseInt(value, 10);
    // eslint-disable-next-line eqeqeq
    setWidthError(value != newWidth); // loose comparison because string to nummber
    if (!widthError) {
      updateDimensions({
        newWidth,
      }, true);
    }
  };

  const onHeightChange = (event) => {
    let value = event.target.value;
    let newHeight = parseInt(value, 10);
    // eslint-disable-next-line eqeqeq
    setHeightError(value != newHeight); // loose comparison because string to nummber
    if (!heightError) {
      updateDimensions({
        newHeight,
      }, true);
    }
  };

  const onRotateClick = (event) => {
    let newWidth = height;
    let newHeight = width;

    updateDimensions({
      newWidth,
      newHeight,
    }, true);
  };

  const onReloadClick = (event) => {
    reloadIframe();
  };

  const onPhonesClick = (event) => {
    setShowTabletList(false);
    setShowPhoneList(!shonePhoneList);
  };

  const onTabletsClick = (event) => {
    setShowPhoneList(false);
    setShowTabletList(!shoneTabletList);
  };


  // useHotkeys('up', () => decrementHeight());
  useHotkeys('up', () => decrementHeight(), {}, [height, width]);
  useHotkeys('down', () => incrementHeight(), {}, [height, width]);
  useHotkeys('left', () => decrementWidth(), {}, [height, width]);
  useHotkeys('right', () => incrementWidth(), {}, [height, width]);

  const deviceEntry = (deviceType, device, index) => {
    const size = `${device.width}×${device.height}`;

    return (
      <li
        className='device clearFix'
        key={`${deviceType}-${index}`}
      >
        <button className='btn-invisible' onClick={(event) => {
          updateDimensions({
            newWidth: device.width,
            newHeight: device.height,
          }, true);
          setShowPhoneList(false);
          setShowTabletList(false);
        }}>
          <span className='size right'>{size}</span>
          &nbsp;
          <span className='name'>{device.name}</span>
        </button>
      </li>
    );
  };

  const widthInputClasses = classnames({
    showWidth: true,
    leftSpace: true,
    error: widthError
  });

  const heightInputClasses = classnames({
    showHeight: true,
    leftSpace: true,
    error: heightError
  });

  const phoneListClasses = classnames({
    deviceList: true,
    hidden: !shonePhoneList
  });
  const phonesText = shonePhoneList ? 'Hide' : 'Phones';

  const tabletListClasses = classnames({
    deviceList: true,
    hidden: !shoneTabletList
  });
  const tabletsText = shoneTabletList ? 'Hide' : 'Tablets';

  return (
    <div>
      <div className='buttonRow leftSpace'>
        <button className='btn' onClick={onStart}>
          <span>S</span>tart
        </button>
        <button className='btn leftSpace hidden'>
          <span>R</span>esume
        </button>
        <button className='btn leftSpace' onClick={onStop}>
          <span>P</span>ause
        </button>
        <button className='btn leftSpace' onClick={decrementWidth}>
          <span>&larr;</span>
        </button>
        <div className='stacked leftSpace'>
          <button className='btn halfHeight' onClick={decrementHeight}>
            <span>&uarr;</span>
          </button>
          <button className='btn halfHeight' onClick={incrementHeight}>
            <span>&darr;</span>
          </button>
        </div>
        <button className='btn leftSpace' onClick={incrementWidth}>
          <span>&rarr;</span>
        </button>
      </div>
      <div className='numberEntry'>
        <input
          className={widthInputClasses}
          type='text'
          title='Set A Specific Width (PX)'
          pattern='[0-9]+'
          value={width}
          onChange={onWidthChange}
        // listen for enter keypress too
        />
        &nbsp;x
        <input
          className={heightInputClasses}
          type='text'
          title='Set A Specific Height (PX)'
          pattern='[0-9]+'
          value={height}
          onChange={onHeightChange}
        // listen for enter keypress too
        />
        <div className='errorText fontSmall leftSpace'>
          {(widthError || heightError) &&
            <span>Enter numbers only</span>
          }
        </div>
      </div>
      <button className='btn leftSpace' onClick={onReloadClick}>Reload</button>
      <button className='btn leftSpace' onClick={onRotateClick}>Rotate</button>
      <button className='btn btnPhones leftSpace' onClick={onPhonesClick}>{phonesText}</button>
      <button className='btn btnTablets leftSpace' onClick={onTabletsClick}>{tabletsText}</button>

      <ul className={phoneListClasses}>
        {
          phoneList.map(function (device, index) {
            return deviceEntry('phone', device, index);
          })
        }
      </ul>

      <ul className={tabletListClasses}>
        {
          tabletList.map(function (device, index) {
            return deviceEntry('tablet', device, index);
          })
        }
      </ul>

      <Link className='btn fontLarge leftSpace' to='/config' title='Set Config Data'>&#9881;</Link>
    </div>
  )
};

export default ControlPanel;
