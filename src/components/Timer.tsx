import * as React from 'react';
import { connect } from 'react-redux';

import Buttons from './Buttons';
// import styles from './Timer.css';

const putO = n => (
  (n > 9) ? `${n}` : `0${n}`
);

const Timer = ({ timer }) => (
  <section>
    <h2> Counter </h2>
    <h3>
      {`${putO(Math.floor(timer.time / 60))} : ${putO(timer.time % 60)}`}
    </h3>
    <Buttons />
  </section>
);

const mapStateToProps = state => ({
  timer: state.timer,
});

export default connect(mapStateToProps)(Timer);
