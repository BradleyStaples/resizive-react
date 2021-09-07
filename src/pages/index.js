import React, { useEffect, useRef } from 'react';
import { Link } from 'gatsby';

import Meta from '../components/meta';
import Header from '../components/header';
import EntryForm from '../components/entry-form';
import Footer from '../components/footer';

import fetchLocalStorageValues from '../components/get-config-values';
import '../styles/resizive.scss';

const IndexPage = () => {
  const initialValues = useRef();

  useEffect(() => {
    // abuse of a ref to make sure local storage values are gathered on each page render
    initialValues.current = fetchLocalStorageValues();
  });

  initialValues.current = fetchLocalStorageValues();

  return (
    <div>
      <Meta title='About | Resizive' path='' />
      <Header>
        <EntryForm />
      </Header>
      <div className='page'>
        <h2 className='center'>About Resizive</h2>
        <p>
          <abbr title='pronounced /rēˈsīzsiv/ (a portmanteau of Resize and Responsive)'>Resizive</abbr> aims to improve finding media query breakpoints for responsively designed fluid websites by making the process sane and easy.
        </p>
        <p>
          Enter a website URL in the text field, press <code>Resize!</code>, and watch the magic happen. Resizive will animate the width of your website, constantly changing width and forcing the <code>iframe</code> containing the website indicated by the URL entered to repaint itself. Resizive animates in <code>{initialValues.current['animationIncrement']}px</code> steps starting from the browser's current width down to <code>320px</code> wide, and then reverses and animates back to the width of the browser. <code>320px</code> is an arbitrary low point based the smallest of the common mobile device sizes. By making the browser's window fullscreen, the best effect will be gained by allowing Resizive to animate to that fullscreen width, displaying the largest range of sizes possible.
        </p>
        <p>
          The width of the iframe at any given time is displayed in px during active use. If you notice a breakpoint in the animation where you think you need to apply a media query change, click the pause button. Plus(<code>+</code>) and minus(<code>-</code>) buttons are available to update the width in <code>{initialValues.current['stepIncrement']}px</code> increments to allow fine tuning to find the perfect break point.
        </p>
        <p>
          Resizive allows localhost to be used as a URL as well! Simply enter a URL similar to <code>http://localhost:3000/</code> and Resizive will treat it no different than a live URL. Also, if a known specific pixel width needs to checked for a breaking point, pause the resizing animation and edit the displayed width directly. This is very helpful for numbers that are not multiples of <code>{initialValues.current['stepIncrement']}px</code>, or if trying to halt the animation as a precise point is difficult.
        </p>
        <p>
          Keyboard controls recognized:
        </p>
        <ul className='controls'>
          <li><code>&larr;</code>: Decrement <code>{initialValues.current['stepIncrement']}px</code> horizontally</li>
          <li><code>&rarr;</code>: Increment <code>{initialValues.current['stepIncrement']}px</code> horizontally</li>
          <li><code>&uarr;</code>: Decrement <code>{initialValues.current['stepIncrement']}px</code> vertically</li>
          <li><code>&darr;</code>: Increment <code>{initialValues.current['stepIncrement']}px</code> vertically</li>
        </ul>
        <p>
          To change animation speeds, <code>+</code>/<code>-</code> step increment values, and other settings please see the <Link to='/config'>config page</Link> or use the gear icon at the topLeft.
        </p>
        <Footer />
      </div>
    </div>
  )
}

export default IndexPage;
