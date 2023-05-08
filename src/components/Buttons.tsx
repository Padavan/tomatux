import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
    <div className='buttons'>
      {(timer.stage === 'pause' || timer.running) &&
        <button
          disabled={!timer.running}
          onClick={() => resetLoop(dispatch)}
          title="Reset clock and begin current phase from begining"
        > Reset </button>
      }
      <button
        className='primary'
        disabled={timer.running}
        onClick={() => startLoop(dispatch)}
      >
        {(timer.stage === 'pomodoro') ? 'Start' : 'Take a break'
        }
      </button>
    </div>
  );
}