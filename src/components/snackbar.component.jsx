import * as React from 'react';

/***
 * @typedef {Object} Props
 * @property {boolean} show
 * @property {string} message
 **/

/** @param {Props} props */
export const Snackbar = (props) => {
  if (!props.show) {
    return null;
  }

  return (
    <div className='snackbar'>
      <p>
        {props.message}
      </p>
    </div>
  );
};
