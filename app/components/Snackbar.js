import React from 'react';
import { connect } from 'react-redux';

const Snackbar = ({ ui }) => {
  // if (!ui.notification) {
  //   return null;
  // }
  return (
    <div className={`snackbar ${(!ui.notification) && 'snackbar__hidden'}`}>
      <p>
        {ui.notificationMessage}
      </p>
      {/*
        <button onClick={() => console.log('hide')}>
          hide
        </button>
      */}
    </div>
  );
};

const mapStateToProps = state => ({
  ui: state.ui,
  // logic: state.logic
});

export default connect(mapStateToProps)(Snackbar);
