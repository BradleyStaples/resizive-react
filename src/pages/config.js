import React, { useState, useEffect, useRef } from 'react';

import Meta from '../components/meta';
import Header from '../components/header';
import EntryForm from '../components/entry-form';
import Footer from '../components/footer';
import useLocalStorage from '../components/use-local-storage';

import fetchLocalStorageValues from '../components/get-config-values';
import '../styles/resizive.scss';

const ConfigPage = () => {
  const [loaded, setLoaded] = useState(false);
  const config = useRef();
  config.current = fetchLocalStorageValues();

  const useLocalStorageWithDefault = (key)  => {
    return useLocalStorage(key, config.current[key]);
  };

  const [animationIncrement, setAnimationIncrement] = useLocalStorageWithDefault('animationIncrement');
  const [animationDuration, setAnimationDuration] = useLocalStorageWithDefault('animationDuration');
  const [stepIncrement, setStepIncrement] = useLocalStorageWithDefault('stepIncrement');
  const [useScrollbars, setUseScrollbars] = useLocalStorageWithDefault('useScrollbars');
  const [useRulers, setUseRulers] = useLocalStorageWithDefault('useRulers');

  useEffect(() => {
    // abuse of a ref to make sure local storage values are gathered on each page render
    config.current = fetchLocalStorageValues();

    if (!loaded) {
      setLoaded(true);
      // values from localStorage won't be read on server-side render, so check all values
      // and update checkboxes/selects to correct value once on client-side
      setAnimationIncrement(config.current['animationIncrement']);
      setAnimationDuration(config.current['animationDuration']);
      setStepIncrement(config.current['stepIncrement']);
      setUseScrollbars(config.current['useScrollbars']);
      setUseRulers(config.current['useRulers']);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const configSelector = (name, selectedValue, stateFunc, values) => {
    return (
      <select
        className='leftSpace config-selector'
        name={name}
        value={selectedValue}
        onChange={(event) => {
          let newValue = event.target.value;
          stateFunc(newValue);
        }}
      >
        {
          values.map(function (value, index) {
            return (
              <option key={`${name}-${index}`} value={value.v}>{value.t}</option>
            );
          })
        }
      </select>
    );
  };

  return (
    <div>
      <Meta title='Config | Resizive' path='config' />
      <Header>
        <EntryForm hideConfig={true} />
      </Header>
      <div className='page config'>
        <h2 className='center'>Resizive Config</h2>
        <p className='center'>Config data is saved immediately upon change.</p>
        <hr />
        <form className='configForm' method='post' action='#'>
          <label>
            <span>Increment Size For Animation</span>
            {configSelector(
              'animationIncrement',
              animationIncrement,
              setAnimationIncrement,
              [{ v: 20, t: 'Smaller (20px)' }, { v: 35, t: 'Normal (35px)' }, { v: 50, t: 'Larger (50px)' }]
            )}
          </label>
          <label>
            <span>Transition Duration For Animation</span>
            {configSelector(
              'animationDuration',
              animationDuration,
              setAnimationDuration,
              [{ v: 100, t: 'Quicker (100ms)' }, { v: 200, t: 'Normal (200ms)' }, { v: 300, t: 'Slower (300ms)' }]
            )}
          </label>
          <label>
            <span>Increment Size For Button Press</span>
            {configSelector(
              'stepIncrement',
              stepIncrement,
              setStepIncrement,
              [{ v: 5, t: 'Smaller (5px)' }, { v: 10, t: 'Normal (10px)' }, { v: 20, t: 'Larger (20px)' }]
            )}
          </label>
          <label>
            <span>Show Scrollbars?</span>
            <input
              className='leftSpace'
              type='checkbox'
              name='useScrollbars'
              value='userScrollbars'
              checked={useScrollbars}
              onChange={(event) => {
                setUseScrollbars(!useScrollbars);
              }}
            />
          </label>
          <label>
            <span>Show Rulers?</span>
            <input
              className='leftSpace'
              type='checkbox'
              name='useRulers'
              value='useRulers'
              checked={useRulers}
              onChange={(event) => {
                setUseRulers(!useRulers);
              }}
            />
          </label>
        </form>
        <Footer />
      </div>
    </div>
  )
}

export default ConfigPage;
