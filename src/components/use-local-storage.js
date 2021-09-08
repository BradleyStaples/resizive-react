import { useState } from 'react';

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error getting value for '${key}' \n ${error}`);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      // allow value to be a function so it mimics useState's API
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting value for '${key}' \n ${error}`);
      return initialValue;
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
