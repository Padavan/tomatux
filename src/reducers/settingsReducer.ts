import { AnyAction } from 'redux';

const initialState = {
  pomodoro: 25,
  pause: 5,
  // long: 10,
  // loop: 4
};

export interface ISettings {
  pomodoro: number;
  pause: number;
}

const settings = (state = initialState, action: AnyAction ) => {
  switch (action.type) {
    case 'SETTINGS_CHANGE':
      return { ...state, ...action.option };
    case 'SETTINGS_RESTORE':
      return initialState;
    default:
      return state;
  }
};

export default settings;
