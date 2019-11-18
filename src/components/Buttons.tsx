import * as React from 'react';
import { connect } from 'react-redux';

import {
  startLoopAction,
  stopLoopAction,
  skipPauseAction,
  dontCountAction
} from '../actions';

const Buttons = ({ timer, logic, startLoop, stopLoop, skipPause, dontCount }) => (
  <section>
    <p>Logic Buttons: </p>
    <button disabled={timer.running} onClick={() => startLoop()}>
      {(logic.current === 'pomodoro') ? 'Start' : 'Take a break'
      }
    </button>
    {(logic.current === 'pause' || logic.current === 'long')
      || <button disabled={!timer.running} onClick={() => stopLoop()}> StopLoop </button>

    }
    {(logic.current === 'pause' || logic.current === 'long')
        && <button onClick={() => skipPause()}> SkipPause </button>
    }
    {(logic.current === 'pause' || logic.current === 'long')
        && <button onClick={() => dontCount()}> DontCount </button>
    }
  </section>
);

const mapStateToProps = state => ({
  timer: state.timer,
  logic: state.logic
});

const mapDispatchToProps = dispatch => ({
  startLoop() {
    dispatch(startLoopAction());
  },
  stopLoop() {
    dispatch(stopLoopAction());
  },
  skipPause() {
    dispatch(skipPauseAction());
  },
  dontCount() {
    dispatch(dontCountAction());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Buttons);
