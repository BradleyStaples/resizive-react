import * as React from 'react';
import { Link } from 'gatsby';
import Meta from '../components/meta';
import Header from '../components/header';
import Footer from '../components/footer';
import '../styles/resizive.scss';

const configSelector = (name, values) => {
  return (
    <select className='leftSpace integerOnly' name={name}>
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

const ConfigPage = () => {
  return (
    <div>
      <Meta title='Config | Resizive' path='config' />
      <Header />
      <div className='page config'>
        <Link className='btn right' to='/'>&lArr; Home</Link>
        <h2 className='center'>Resizive Config</h2>
        <form className='configForm' method='post' action='#'>
          <label>
            Increment Size For Animation
            {configSelector('animation_increment', [{ v: 20, t: 'Smaller (20px)' }, { v: 35, t: 'Normal (35px)' }, { v: 50, t: 'Larger (50px)' }])}
          </label>
          <label>
            Transition Duration For Animation
            {configSelector('animation_duration', [{ v: 50, t: 'Smaller (50ms)' }, { v: 75, t: 'Normal (75ms)' }, { v: 100, t: 'Larger (100ms)' }])}
          </label>
          <label>
            Increment Size For Button Press
            {configSelector('step_increment', [{ v: 5, t: 'Smaller (5px)' }, { v: 10, t: 'Normal (10px)' }, { v: 20, t: 'Larger (20px)' }])}
          </label>
          <label>
            Transition Duration For Button Press
            {configSelector('step_duration', [{ v: 50, t: 'Smaller (50ms)' }, { v: 100, t: 'Normal (100ms)' }, { v: 200, t: 'Larger (200ms)' }])}
          </label>
          <label>
            Show Scrollbars?
            <input className='leftSpace scrollbars' type='checkbox' name='scrollbars' />
          </label>
          <label>
            Show Rulers?
            <input className='leftSpace rulers' type='checkbox' name='rulers' />
          </label>
          <label>
            Snap To Increment?
            <input className='leftSpace snap' type='checkbox' name='snap' />
          </label>
          <input className='btn submit' type='submit' />
          <div className='success invisible'>Your config values have been saved.</div>
        </form>
        <Footer />
      </div>
    </div>
  )
}

export default ConfigPage;
