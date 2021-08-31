import React, { useState } from 'react';
import classnames from 'classnames';

import { phoneList, tabletList } from './device-sizes';

const ControlPanel = ({ width, height, updateDimensions, refreshIframe}) => {

  const [widthError, setWidthError] = useState(false);
  const [heightError, setHeightError] = useState(false);
  const [shonePhoneList, setShowPhoneList] = useState(false);
  const [shoneTabletList, setShowTabletList] = useState(false);

  const decrementWidth = (event) => {
    let newWidth = width - 10;
    updateDimensions({
      newWidth,
    }, true);
  };

  const incrementWidth = (event) => {
    let newWidth = width + 10;
    updateDimensions({
      newWidth,
    }, true);
  };

  const decrementHeight = (event) => {
    let newHeight = height - 10;
    updateDimensions({
      newHeight,
    }, true);
  };

  const incrementHeight = (event) => {
    let newHeight = height + 10;
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

  const onRefreshClick = (event) => {
    refreshIframe();
  };

  const onPhonesClick = (event) => {
    setShowTabletList(false);
    setShowPhoneList(!shonePhoneList);
  };

  const onTabletsClick = (event) => {
    setShowPhoneList(false);
    setShowTabletList(!shoneTabletList);
  };

  const deviceEntry = (deviceType, device, index) => {
    const size = `${device.width}×${device.height}`;

    return (
      <li
        className='device clearFix'
        key={`${deviceType}-${index}`}
        onClick={(event) => {
          updateDimensions({
            newWidth: device.width,
            newHeight: device.height,
          }, true);
          setShowPhoneList(false);
          setShowTabletList(false);
        }}
      >
        <span className='size right'>{size}</span>
        &nbsp;
        <span className='name'>{device.name}</span>
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
    phones: true,
    deviceList: true,
    hidden: !shonePhoneList
  });
  const phonesText = shonePhoneList ? 'Hide' : 'Phones';

  const tabletListClasses = classnames({
    tablets: true,
    deviceList: true,
    hidden: !shoneTabletList
  });
  const tabletsText = shoneTabletList ? 'Hide' : 'Tablets';

  return (
    <div>
      <div className='buttonRow leftSpace'>
        <button className='btn btnStart'>
          <span>S</span>tart
        </button>
        <button className='btn btnResume hidden'>
          <span>R</span>esume
        </button>
        <button className='btn btnPause'>
          <span>P</span>ause
        </button>
        <button className='btn btnLeft leftSpace' onClick={decrementWidth}>
          <span>&larr;</span>
        </button>
        <div className='stacked leftSpace'>
          <button className='btn btnUp halfHeight' onClick={decrementHeight}>
            <span>&uarr;</span>
          </button>
          <button className='btn btnDown halfHeight' onClick={incrementHeight}>
            <span>&darr;</span>
          </button>
        </div>
        <button className='btn btnRight leftSpace' onClick={incrementWidth}>
          <span>&rarr;</span>
        </button>
      </div>
      <div className='number-entry'>
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
      <button className='btn btnRefresh leftSpace' title='Click To Refresh Iframe' onClick={onRefreshClick}>
        <div className='text fontLarge'>&#8635;</div>
      </button>

      <button className='btn btnRotate leftSpace' onClick={onRotateClick}>Rotate</button>
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
    </div>
  )
};

export default ControlPanel;
