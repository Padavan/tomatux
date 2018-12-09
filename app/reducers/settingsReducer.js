const initialState = {
  pomodoroDuration: 25,
  pauseDuration: 5,
  longPauseDuration: 10,
  loopCount: 4
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
