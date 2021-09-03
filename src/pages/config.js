import React, { useState, useEffect } from 'react';

import Meta from '../components/meta';
import Header from '../components/header';
import EntryForm from '../components/entry-form';
import Footer from '../components/footer';

import fetchLocalStorageValues from '../components/get-config-values';
import '../styles/resizive.scss';

const ConfigPage = () => {
  const initialValues = fetchLocalStorageValues();
  const [animationIncrement, setAnimationIncrement] = useState(initialValues['animationIncrement']);
  const [animationDuration, setAnimationDuration] = useState(initialValues['animationDuration']);
  const [stepIncrement, setStepIncrement] = useState(initialValues['stepIncrement']);
  const [stepDuration, setStepDuration] = useState(initialValues['stepDuration']);
  const [useScrollbars, setUseScrollbars] = useState(initialValues['useScrollbars']);
  const [useRulers, setUseRulers] = useState(initialValues['useRulers']);
  const [useSnap, setUseSnap] = useState(initialValues['useSnap']);

  useEffect(() => {
    localStorage.setItem('animationDuration', animationDuration);
  }, [animationDuration]);

  useEffect(() => {
    localStorage.setItem('animationIncrement', animationIncrement);
  }, [animationIncrement]);

  useEffect(() => {
    localStorage.setItem('stepIncrement', stepIncrement);
  }, [stepIncrement]);

  useEffect(() => {
    localStorage.setItem('stepDuration', stepDuration);
  }, [stepDuration]);

  useEffect(() => {
    localStorage.setItem('useScrollbars', useScrollbars);
  }, [useScrollbars]);

  useEffect(() => {
    localStorage.setItem('useRulers', useRulers);
  }, [useRulers]);

  useEffect(() => {
    localStorage.setItem('useSnap', useSnap);
  }, [useSnap]);

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
        <form method='post' action='#'>
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
              [{ v: 100, t: 'Smaller (100ms)' }, { v: 200, t: 'Normal (200ms)' }, { v: 300, t: 'Larger (300ms)' }]
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
            <span>Transition Duration For Button Press</span>
            {configSelector(
              'stepDuration',
              stepDuration,
              setStepDuration,
              [{ v: 50, t: 'Smaller (50ms)' }, { v: 100, t: 'Normal (100ms)' }, { v: 200, t: 'Larger (200ms)' }]
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
          <label>
            <span>Snap To Increment?</span>
            <input
              className='leftSpace'
              type='checkbox'
              name='useSnap'
              value='useSnap'
              checked={useSnap}
              onChange={(event) => {
                setUseSnap(!useSnap);
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
