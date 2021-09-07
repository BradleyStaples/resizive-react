import React, { useState, useEffect, useRef } from 'react';
import classnames from 'classnames';
import { useHotkeys } from 'react-hotkeys-hook';
import { Link } from 'gatsby';

import fetchLocalStorageValues from '../components/get-config-values';
import { phoneList, tabletList } from './device-sizes';

const ControlPanel = ({ width, height, updateDimensions, reloadIframe, animiateIframe }) => {

  const initialValues = useRef();
  initialValues.current = fetchLocalStorageValues();

  useEffect(() => {
    // abuse of a ref to make sure local storage values are gathered on each page render
    initialValues.current = fetchLocalStorageValues();
  });

  const animationTimerRef = useRef();

  const [widthError, setWidthError] = useState(false);
  const [heightError, setHeightError] = useState(false);
  const [shonePhoneList, setShowPhoneList] = useState(false);
  const [shoneTabletList, setShowTabletList] = useState(false);
  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    if (animation && !animationTimerRef.current) {
      animationTimerRef.current = animiateIframe();
    }
  }, [animation, animiateIframe]);

  const onStart = (event) => {
    setAnimation(true);
  };

  const onStop = (event) => {
    setAnimation(false);
    // abuse of a ref to store timer
    clearInterval(animationTimerRef.current);
    animationTimerRef.current = null;
  };

  const decrementWidth = (event) => {
    let widthDelta = initialValues.current['stepIncrement'] * -1;
    updateDimensions({
      widthDelta
    }, true);
  };

  const incrementWidth = (event) => {
    let widthDelta = initialValues.current['stepIncrement'];
    updateDimensions({
      widthDelta
    }, true);
  };

  const decrementHeight = (event) => {
    let heightDelta = initialValues.current['stepIncrement'] * -1;
    updateDimensions({
      heightDelta
    }, true);
  };

  const incrementHeight = (event) => {
    let heightDelta = initialValues.current['stepIncrement'];
    updateDimensions({
      heightDelta
    }, true);
  };

  const onWidthChange = (event) => {
    let value = event.target.value;
    let newWidth = parseInt(value, 10);
    // eslint-disable-next-line eqeqeq
    setWidthError(value != newWidth); // loose comparison because string to nummber
    if (!widthError) {
      let widthDelta = newWidth - width;
      updateDimensions({
        widthDelta
      }, true);
    }
  };

  const onHeightChange = (event) => {
    let value = event.target.value;
    let newHeight = parseInt(value, 10);
    // eslint-disable-next-line eqeqeq
    setHeightError(value != newHeight); // loose comparison because string to nummber
    if (!heightError) {
      let heightDelta = newHeight - height;
      updateDimensions({
        heightDelta
      }, true);
    }
  };

  const onRotateClick = (event) => {
    let widthDelta = height - width;
    let heightDelta = width - height;

    updateDimensions({
      widthDelta,
      heightDelta
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

  // keybinds
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
        <button className='btnInvisible' onClick={(event) => {
          updateDimensions({
            widthDelta: device.width - width,
            heightDelta: device.height - height
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
        <button className='btn' onClick={onStart} disabled={animation}>Start</button>
        <button className='btn leftSpace' onClick={onStop} disabled={!animation}>Pause</button>
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
