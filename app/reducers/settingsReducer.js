// const initialState = {
//   pomodoro: 25,
//   pause: 5,
//   long: 10,
//   loop: 4
// };

const initialState = {
  pomodoro: 25,
  pause: 5,
  long: 10,
  loop: 4
};

const settings = (state = initialState, action) => {
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
