import React from 'react';
import { Link } from 'gatsby';

const Header = ({children}) => {
  return (
    <header className='header'>
      <div className='titleContainer'>
        <h1 className='siteTitle' title='Resize Responsive Websites'>
          <Link to='/'>Resizive</Link>
        </h1>
      </div>
      <div className='dataEntry leftSpace'>
        {children}
      </div>
    </header>
  )
};

export default Header;
