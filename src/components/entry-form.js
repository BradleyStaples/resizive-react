import React, { useState } from 'react';
import { Link } from 'gatsby';
import classnames from 'classnames';
import validUrl from 'valid-url';

const EntryForm = ({ hideConfig }) => {
  const [urlValid, setUrlValid] = useState(true);
  const [inputHasBeenTouched, setInputHasBeenTouched] = useState(false);

  const inputClasses = classnames({
    urlEntry: true,
    error: !urlValid && inputHasBeenTouched
  });

  const entryFormSubmit = (event) => {
    if (!urlValid) {
      event.preventDefault();
      return;
    }
  };

  const urlChange = (event) => {
    event.preventDefault();
    setInputHasBeenTouched(true);
    let suspect = event.target.value;
    let validity = !!validUrl.isWebUri(suspect); // isWebUri returns undefined or the valid URL string
    if (!validity && suspect === '') {
      // user has deleted entire URL from URL field; hide error box but keep button disabled
      setUrlValid(true);
      setInputHasBeenTouched(false);
      return;
    }
    // else user has something typed in the URL field, show error or not as appropriate
    setUrlValid(validity);
  };

  return (
    <form method='get' action='/resizing' onSubmit={entryFormSubmit}>
      <input className={inputClasses} type='url' name='url' placeholder='Enter Website URL' onChange={urlChange} />
      <button className='btn leftSpace' type='submit' disabled={!urlValid || !inputHasBeenTouched}>Resize!</button>
      { !hideConfig &&
        <Link className='btn fontLarge leftSpace' to='/config' title='Set Config Data'>&#9881;</Link>
      }
      <div className='errorText fontSmall'>
        {!urlValid && inputHasBeenTouched &&
          <span>Please enter a valid URL (with http:// or https://)</span>
        }
      </div>
    </form>
  );
};

export default EntryForm;
