import React from 'react';
import { connect } from 'react-redux';

import Buttons from './Buttons';

const putO = n => (
  (n > 9) ? `${n}` : `0${n}`
);

const Timer = ({ timer }) => (
  <section>
    <h2> Counter </h2>
    <p>
      {`${putO(Math.floor(timer.time / 60))} : ${putO(timer.time % 60)}`}
    </p>
    <Buttons />
  </section>
);

const mapStateToProps = state => ({
  timer: state.timer
});

export default connect(mapStateToProps)(Timer);
