import React, { useState } from 'react';
import classnames from 'classnames';

import { phoneList, tabletList } from './device-sizes';

const DeviceDropdowns = ({ width, height, updateDimensions }) => {

  const [showPhoneList, setShowPhoneList] = useState(false);
  const [showTabletList, setShowTabletList] = useState(false);

  const onPhonesClick = (event) => {
    setShowTabletList(false);
    setShowPhoneList(!showPhoneList);
  };

  const onTabletsClick = (event) => {
    setShowPhoneList(false);
    setShowTabletList(!showTabletList);
  };

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

  const phoneListClasses = classnames({
    deviceList: true,
    hidden: !showPhoneList
  });
  const phonesText = showPhoneList ? 'Hide' : 'Phones';

  const tabletListClasses = classnames({
    deviceList: true,
    hidden: !showTabletList
  });
  const tabletsText = showTabletList ? 'Hide' : 'Tablets';

  return (
    <div className='deviceLists'>
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

export default DeviceDropdowns;
