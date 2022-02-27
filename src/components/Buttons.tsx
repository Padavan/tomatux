import * as React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import {
  startLoop,
  resetLoop,
} from '../actions';
import { ITimer } from '../reducers/timerReducer';

export const Buttons = () => {
  const dispatch = useDispatch();
  const timer: ITimer = useSelector((state: RootState) => state.timer);

  return (
    <div className='buttonContainer'>
      <button disabled={!timer.running} onClick={() => resetLoop(dispatch)}> StopLoop </button>
      {timer.stage === 'pause'
          && <button onClick={() => dispatch({ type: 'SKIP_PAUSE' })}> SkipPause </button>
      }
      <button
        className='primary'
        disabled={timer.running}
        onClick={() => startLoop(dispatch)}
        style={{ marginRight: 'auto', alignSelf: 'flex-end' }}
      >
        {(timer.stage === 'pomodoro') ? 'Start' : 'Take a break'
        }
      </button>
    </div>
  );
}