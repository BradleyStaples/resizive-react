import React, { useState, useEffect } from 'react';
import classnames from 'classnames';

const DimensionInputs = ({
  width,
  height,
  updateDimensions
}) => {

  const [widthError, setWidthError] = useState(false);
  const [heightError, setHeightError] = useState(false);

  useEffect(() => {

  }, [width, height, widthError, heightError]);

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

  const errorClasses = classnames({
    errorText: true,
    fontSmall: true,
    leftSpace: true,
    hidden: !(widthError || heightError)
  });

  return (
    <div className='numberEntry'>
      <input
        className={widthInputClasses}
        type='text'
        title='Set A Specific Width (PX)'
        pattern='[0-9]+'
        value={width}
        onChange={onWidthChange}
      />
      &nbsp;x
      <input
        className={heightInputClasses}
        type='text'
        title='Set A Specific Height (PX)'
        pattern='[0-9]+'
        value={height}
        onChange={onHeightChange}
      />
      <div className={errorClasses}>
        {(widthError || heightError) &&
          <span>Enter numbers only</span>
        }
      </div>
    </div>
  )
};

export default DimensionInputs;
