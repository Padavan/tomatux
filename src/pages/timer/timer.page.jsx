import React from 'react';
import { getParts } from '../../helpers/convertTime';
import { TimerControls } from '../../features//timer-controls.component';
import { useTimer } from '../../providers/timer.provider';

export const TimerPage = () => {
  const timer = useTimer();

  const [minutes, seconds] = getParts(timer.time);

  return (
    <div className="timerContainer">
      <h3>
        <span className="tGray">{minutes}</span>
        <span className='tGray'>:</span>
        <span className='tPrimary'>{seconds}</span>
      </h3>
      <TimerControls />
    </div>
  )
};
