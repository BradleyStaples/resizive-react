import React, { useEffect, useRef } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

import fetchLocalStorageValues from './get-config-values';

const Dpad = ({ width, height, updateDimensions }) => {

  const initialValues = useRef();
  initialValues.current = fetchLocalStorageValues();

  useEffect(() => {
    // abuse of a ref to make sure local storage values are gathered on each page render
    initialValues.current = fetchLocalStorageValues();
  });

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


  // keybinds
  useHotkeys('up', () => decrementHeight(), {}, [height, width]);
  useHotkeys('down', () => incrementHeight(), {}, [height, width]);
  useHotkeys('left', () => decrementWidth(), {}, [height, width]);
  useHotkeys('right', () => incrementWidth(), {}, [height, width]);

  return (
    <div className='dpad'>
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
  )
};

export default Dpad;
