const localStorageDefaultValues = {
  'animationIncrement': 35,
  'animationDuration': 200,
  'stepIncrement': 10,
  'useScrollbars': true,
  'useRulers': true
};

const fetchLocalStorageValues = () => {
  let initialValues = {};
  const windowGlobal = typeof window !== 'undefined' && window;
  Object.keys(localStorageDefaultValues).forEach((key) => {
    let defaultValue = localStorageDefaultValues[key];
    try {
      let localValue = windowGlobal.localStorage.getItem(key);
      if (localValue) {
        // localstorage only stores strings, so coerce back default value
        localValue = JSON.parse(localValue);
      }
      // `false` will break the || notation a couple of lines down, so handle it first
      if (localValue === false) {
        initialValues[key] = localValue;
      } else {
        initialValues[key] = localValue || defaultValue;
      }
    } catch (error) {
      console.log(`Error getting value for '${key}' \n ${error}`);
      initialValues[key] = defaultValue;
    }
  });

  return initialValues;
};

export default fetchLocalStorageValues;
