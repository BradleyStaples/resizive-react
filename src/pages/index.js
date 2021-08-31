import * as React from 'react';
import Meta from '../components/meta';
import Header from '../components/header';
import EntryForm from '../components/entry-form';
import Footer from '../components/footer';
import '../styles/resizive.scss';

const IndexPage = () => {
  return (
    <div>
      <Meta title='About | Resizive' path='' />
      <Header>
        <EntryForm />
      </Header>
      <div className='page'>
        <h2 className='center'>About Resizive</h2>
        <p>
          <abbr title='pronounced /rēˈsīzsiv/ (a combo of Resize and Responsive)'>Resizive</abbr> aims to improve finding media query breakpoints for responsively designed fluid websites by making the process sane and easy. No built in presets for device widths exist; there are simply too many devices in too many sizes for breakpoints based upon device widths to make any rational sense. Instead, breakpoints should be developed around the layout and flow of the content of the website.
        </p>
        <p>
          Enter a website URL in the text field, press start, and watch the magic happen. The <code>body</code> tag of Resizive's website animates, constantly changing width and forcing the <code>iframe</code> containing the website indicated by the URL entered to repaint itself. Resizive animates in 50px steps starting from the browser's current width down to 320px wide, and then reverses and animates back to the width of the browser. 320px is an arbitrary low point based the smallest of the common mobile device sizes. Preferably, this arbitary number would not exist, but comparing sites against narrower widths doesn't make any sense. By making the browser's window fullscreen, the best effect will be gained by allowing Resizive to animate to that fullscreen width, displaying the largest range of sizes possible; having said that, Resizive works with browser windows of any size larger than 320px.
        </p>
        <p>
          The width of the <code>body</code> tag at any given time is displayed in px during active use. If you notice a breakpoint in the animation where you think you need to apply a media query change, click the pause button. Plus(+) and minus(-) buttons appear that animate in single 10px steps to allow fine tuning to find the perfect break point.
        </p>
        <p>
          Resizive allows localhost to be used as a URL as well! Simply enter a URL similar to <code>localhost/~mywebsite/</code> and Resizive will treat it no different than a live URL. Also, if a known specific pixel width needs to checked for a breaking point, pause the resizing animation and edit the displayed width directly. This is very helpful for numbers that are not multiples of 10, or if trying to halt the animation as a precise point is difficult.
        </p>
        <p>
          Keyboard controls recognized:
        </p>
        <ul className='controls'>
          <li><code>S</code>: Start Resizing</li>
          <li><code>P</code>: Pause Resizing</li>
          <li><code>R</code>: Resume Resizing</li>
          <li><code>&larr;</code>: Decrement 10 pixels horizontally</li>
          <li><code>&rarr;</code>: Increment 10 pixels horizontally</li>
          <li><code>&uarr;</code>: Decrement 10 pixels vertically</li>
          <li><code>&darr;</code>: Increment 10 pixels vertically</li>
        </ul>
        <p className='center'>
          For best results, set your browser to the widest width you wish to check (or simply fullscreen/maximize it).
        </p>
        <Footer />
      </div>
    </div>
  )
}

export default IndexPage;
