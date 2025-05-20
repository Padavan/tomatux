import * as React from 'react';
import { useTimer } from '../providers/timer.provider';

export const TimerControls = () => {
  const timer = useTimer();

  return (
    <div className='buttons'>
      {(timer.stage === 'pause' || timer.running) &&
        <button
          disabled={!timer.running}
          onClick={() => timer.reset()}
          title="Reset clock and begin current phase from begining"
        > Reset </button>
      }
      <button
        className='primary'
        disabled={timer.running}
        onClick={() => timer.start()}
      >
        {(timer.stage === 'pomodoro') ? 'Start' : 'Take a break'
        }
      </button>
    </div>
  );
}