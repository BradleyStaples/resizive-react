import React from 'react';
import { Link } from 'gatsby';

import Dpad from './dpad';
import DimensionInputs from './dimension-inputs';
import DeviceDropdowns from './device-dropdowns';

const ControlPanel = ({
  width,
  height,
  isAnimating,
  updateDimensions,
  reloadIframe,
  startAnimation,
  stopAnimation
}) => {

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

  return (
    <div>
      <Link className='btn fontLarge leftSpace' to='/config' title='Set Config Data'>&#9881;</Link>
      <div className='buttonRow leftSpace'>
        <button className='btn' onClick={startAnimation} disabled={isAnimating}>Start</button>
        <button className='btn leftSpace' onClick={stopAnimation} disabled={!isAnimating}>Stop</button>
        <Dpad
          width={width}
          height={height}
          updateDimensions={updateDimensions}
        />
      </div>
      <DimensionInputs
        width={width}
        height={height}
        updateDimensions={updateDimensions}
      />
      <button className='btn leftSpace' onClick={onReloadClick}>Reload</button>
      <button className='btn leftSpace' onClick={onRotateClick}>Rotate</button>
      <DeviceDropdowns
        width={width}
        height={height}
        updateDimensions={updateDimensions}
      />
    </div>
  )
};

export default ControlPanel;
