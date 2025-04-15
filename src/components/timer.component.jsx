import React, { useEffect, useState} from 'react';
import { convertTime } from '../helpers/convertTime';
import { TimerControls } from './timer-controls.component';
import { useTimer } from 'src/providers/timer.provider';

export const Timer = () => {
  const timer = useTimer();

  return (
    <div className="timerContainer">
      <h3>{convertTime(timer.time)}</h3>
      <TimerControls />
    </div>
  )
};
