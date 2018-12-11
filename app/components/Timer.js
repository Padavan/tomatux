import React from 'react';
import { connect } from 'react-redux';

import Buttons from './Buttons';

const Timer = ({ timer }) => {
  return (
    <section>
      <h2> Counter </h2>
      <p>
        {timer.time}
      </p>
      <Buttons />
    </section>
  );
};

const mapStateToProps = state => ({
  timer: state.timer
});

export default connect(mapStateToProps)(Timer);
