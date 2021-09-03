import React from 'react';
import Meta from '../components/meta';
import Header from '../components/header';
import Footer from '../components/footer';
import '../styles/resizive.scss';


const NotFoundPage = () => {
  return (
    <div>
      <Meta title='Not Found | Resizive' path='404' />
      <Header />
      <div className='page'>
        <h1 className='center errorShrug'>¯\_(ツ)_/¯</h1>
        <p className='center'>The page you are looking for could not be found.</p>
        <Footer />
      </div>
    </div >
  )
}

export default NotFoundPage;
