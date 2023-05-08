import React, { useEffect, useState} from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { convertTime, getParts } from '../helpers/convertTime';
import { Buttons } from './Buttons';
import { RootState } from '../store';

export const Timer = () => {
  const timer = useSelector((state: RootState) => state.timer, shallowEqual);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'TIMER_INIT' });
  }, []);

  return (
    <div className="timerContainer">
      <h3>{convertTime(timer.time)}</h3>
      <Buttons />
    </div>
  )
};
