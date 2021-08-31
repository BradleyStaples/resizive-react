import * as React from 'react';
import Page from '../components/page';


const NotFoundPage = () => {
  return (
    <Page title='Not Found | Resizive' pageTyle='404'>
      <div className='content-404'>
        <img src='/images/404.jpg' alt='This is not the page you are looking for' title='This is not the page you are looking for' />
      </div>
    </Page>
  )
}

export default NotFoundPage;
