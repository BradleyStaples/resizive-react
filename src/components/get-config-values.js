const localStorageDefaultValues = {
  'animationIncrement': 35,
  'animationDuration': 100,
  'stepIncrement': 10,
  'stepDuration': 100,
  'useScrollbars': true,
  'useRulers': true,
  'useSnap': false
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

    initialValues[key] = localValue || defaultValue;
  });

  return initialValues;
};

module.exports = fetchLocalStorageValues;
