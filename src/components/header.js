import * as React from 'react';
import { Link } from 'gatsby';

import EntryForm from './entry-form';
import { phoneList, tabletList } from './device-sizes';


const deviceEntry = (deviceType, device, index) => {
  const dims = device.width + '|' + device.height;
  const size = `${device.width}×${device.height}`;
  return (
    <li className='device clearFix' data-dimensions={dims} key={`${deviceType}-${index}`}>
      <span className='size right'>{size}</span>
      &nbsp;
      <span className='name'>{device.name}</span>
    </li>
  );
};

const Header = ({ pageType }) => {
  return (
    <header className='header'>
      <div className='titleContainer'>
        <h1 className='siteTitle' title='Resize Responsive Websites'>
          <Link to='/'>Resizive</Link>
        </h1>
      </div>
      <div className='dataEntry leftSpace'>
        {(pageType === 'index' || pageType === 'config') &&
          <EntryForm />
        }
        {pageType === 'resizing' &&
          <div>
            <div className='buttonRow leftSpace'>
              <button className='btn btnStart'>
                <span>S</span>tart
              </button>
              <button className='btn btnResume hidden'>
                <span>R</span>esume
              </button>
              <button className='btn btnPause'>
                <span>P</span>ause
              </button>
              <button className='btn btnLeft leftSpace'>
                <span>&larr;</span>
              </button>
              <div className='stacked'>
                <button className='btn btnUp halfHeight'>
                  <span>&uarr;</span>
                </button>
                <button className='btn btnDown halfHeight'>
                  <span>&darr;</span>
                </button>
              </div>
              <button className='btn btnRight leftSpace'>
                <span>&rarr;</span>
              </button>
            </div>
            <input className='showWidth leftSpace' type='text' title='Set A Specific Width (PX)' />
            &nbsp;x&nbsp;
            <input className='showHeight leftSpace' type='text' title='Set A Specific Height (PX)' />
            <button className='btn btnRefresh leftSpace'>
              <div className='text fontLarge'>&#8635;</div>
            </button>

            <button className='btn btnRotate leftSpace'>Rotate</button>
            <button className='btn btnPhones leftSpace' data-dropdown='phones'>Phones</button>
            <button className='btn btnTablets leftSpace' data-dropdown='tablets'>Tablets</button>

            <ul className='deviceList hidden phones'>
              {
                phoneList.map(function (device, index) {
                  return deviceEntry('phone', device, index);
                })
              }
            </ul>

            <ul className='deviceList hidden tablets'>
              {
                tabletList.map(function (device, index) {
                  return deviceEntry('tablet', device, index);
                })
              }
            </ul>
          </div>
        }
      </div>
    </header>
  )
};

export default Header;
