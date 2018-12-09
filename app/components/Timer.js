import React from 'react';
import { connect } from 'react-redux';
import { start, stop } from '../actions';

const Timer = ({ timer, start, stop }) => {
  return (
    <section>
      <h2> Counter </h2>
      <p>
        {timer.time}
      </p>
      <button onClick={() => start()}>
        start
      </button>
      <button onClick={() => stop()}>
        stop
      </button>
    </section>
  );
};

const mapStateToProps = state => ({
  timer: state.timer
});

const mapDispatchToProps = dispatch => ({
  start() {
    dispatch(start());
  },
  stop() {
    dispatch(stop());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
