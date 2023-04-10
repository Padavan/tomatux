import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const Snackbar = () => {
  const ui = useSelector((state: RootState) => state.ui);
  // const timer = useSelector((state: RootState) => state.timer);

  if (!ui.notification) {
    return null;
  }

  return (
    <div className='snackbar'>
      <p>
        {ui.notificationMessage}
      </p>
    </div>
  );
};
