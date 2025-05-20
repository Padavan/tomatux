import React, { useState, useContext, useRef, useCallback, useEffect } from 'react';
import { useConfig } from './config.provider';
import { useToast } from './toast.provider';
import bellSound from '../assets/bell.wav';
import { updateStats } from '../helpers/localStorage';

const audio = new Audio(bellSound);

// const makeSound = () => {
//   audio.play();
// }


const TimerContext = React.createContext({
  time: 0,
  running: false,
  stage: 'pomodoro',
  reset: () => {},
  start: () => {},
  stop: () => {},
});

/** @typedef {'pause' | 'pomodoro'} TimerStage */

/** @param {import('react').PropsWithChildren} props */
const TimerProvider = (props) => {
  const { config } = useConfig();
  const toast = useToast();
  const [time, setTime] = useState(config.pomodoro*60);
  const [stage, setStage] = useState('pomodoro')
  const [running, setRunning] = useState(false);

  const currentTime = useRef(config.pomodoro*60);
  const currentRunning = useRef(false);

  useEffect(() => {
    if (running === true) return;

    if (stage === 'pomodoro') {
      setTime(config.pomodoro * 60);
      currentTime.current = config.pomodoro * 60;
    } 

    if (stage === "pause") {
      setTime(config.pause * 60);
      currentTime.current = config.pause * 60;
    }
  }, [config]);

  const start = () => {
    console.log("--START");
    setRunning(true);
    currentRunning.current = true;
    ticking();
  }
  const stop = () => {
    console.log("--STOP");
  }

  const reset = () => {
    console.log("--RESET");
    setStage('pomodoro');
    setRunning(false);
    currentRunning.current = false;
    setTime(config.pomodoro * 60);
    currentTime.current = config.pomodoro * 60;
  }

  /** @returns {boolean} */
  const decrease = () => {
    console.log("decrease", currentTime.current);
    if (currentTime.current > 0) {
      currentTime.current = currentTime.current - 1
      setTime(currentTime.current);
      return true;
    } else {
      return false;
    }
  }

  const ticking = () => {
    if (!currentRunning.current) return;

    if (decrease()) {
      setTimeout(() => ticking(), 1000);
    } else {
      setRunning(false);
      currentRunning.current = false;
      finish()
    }
  }

  const finish = useCallback(() => {
    let message = '';
    if (stage === 'pomodoro') {
      setStage('pause');
      setTime(config.pause * 60);
      currentTime.current = config.pause * 60;
      const today = new Date();
      const todayString = today.toISOString().slice(0, 10);
      updateStats(todayString);
      message = "Pomodoro time has ended"
    } else {
      setStage('pomodoro');
      setTime(config.pomodoro * 60);
      currentTime.current = config.pomodoro * 60;
      message = "Pause is finished"
    }
    toast.show(message, true);
    audio.play();


  }, [stage]);

 return (
   <TimerContext.Provider value={{ time, running, stage, start, stop, reset }}>
     {props.children}
   </TimerContext.Provider>
 );
}

const useTimer = () => useContext(TimerContext);

export { TimerContext, TimerProvider, useTimer };