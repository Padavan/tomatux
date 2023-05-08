import { AnyAction } from 'redux';
import { getNextStage } from '../helpers/getNextStage';

export interface ISettings {
  pomodoro: number;
  pause: number;
}

export interface ITimer {
  time: number;
  running: boolean;
  stage: keyof ISettings;
  completedPomodoros: number;
  settings: ISettings;
}

const initialState: ITimer = {
  time: 0,
  running: false,
  stage: 'pomodoro',
  completedPomodoros: 0,
  settings: {
    pomodoro: 5,
    pause: 3,
    // loop: 4
  }
};

const timer = (state = initialState, action: AnyAction ): ITimer => {
  console.log("timerReducer", action);
  switch (action.type) {
    case 'TIMER_INIT':
      console.log("init", state, action);
      return { ...state, time: state.settings['pomodoro']*60 }
    case 'TIMER_START':
      return { ...state, running: true };
    case 'TICK':
      return { ...state, time: state.time - 1 };
    case 'TIME_OUT':
      return {
        ...state,
        running: false,
        completedPomodoros: state.stage === 'pomodoro' && !state.running ? state.completedPomodoros + 1 : state.completedPomodoros,
        time: state.settings[getNextStage(state.stage)]*60,
        stage: getNextStage(state.stage),
      };
    case 'TIMER_SET':
      return { ...state, time: action.time };
    case 'TIMER_RESET':
      return {
        ...state,
        stage: 'pomodoro',
        time: state.settings[state.stage]*60,
        running: false,
      };
    case 'SKIP_PAUSE':
      return {
        ...state,
        time: state.settings.pomodoro*60,
        stage: 'pomodoro',
        running: false,
      }
    default:
      return state;
  }
};

export default timer;
