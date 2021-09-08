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

    // localstorage only stores strings, so coerce back default value
    if (localValue) {
      localValue = JSON.parse(localValue);
    }

    // `false` will break the || notation a couple of lines down, so handle it first
    if (localValue === false) {
      initialValues[key] = localValue;
    } else {
      initialValues[key] = localValue || defaultValue;
    }
  });

  return initialValues;
};

export default fetchLocalStorageValues;
