const localStorageDefaultValues = {
  'animationIncrement': 35,
  'animationDuration': 200,
  'stepIncrement': 10,
  'useScrollbars': true,
  'useRulers': true
};

const fetchLocalStorageValues = () => {
  let initialValues = {};

  Object.keys(localStorageDefaultValues).forEach((key) => {
    let defaultValue = localStorageDefaultValues[key];
    let localValue = localStorage.getItem(key);
    // localstorage only stores strings, so coerce back to integers or booleans
    if (localValue) {
      if (localValue === 'true') {
        localValue = true;
      } else if (localValue === 'false') {
        localValue = false;
      } else {
        // all values are currently used as booleans or integers; if not a boolean, convert to int
        localValue = parseInt(localValue, 10);
      }
    }
    if (localValue === false) {
      initialValues[key] = localValue;
    } else {
      initialValues[key] = localValue || defaultValue;
    }
  });

  return initialValues;
};

module.exports = fetchLocalStorageValues;
