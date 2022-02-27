import * as React from 'react';
import { useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { convertTime } from '../helpers/convertTime';
import { Buttons } from './Buttons';
import { RootState } from '../store';

export const Timer = () => {
  const timer = useSelector((state: RootState) => state.timer, shallowEqual);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'TIMER_INIT' });
  }, []);

  return (
    <section>
      <h3>
        {convertTime(timer.time)}
      </h3>
      <Buttons />
    </section>
  )
};
