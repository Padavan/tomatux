const initialState = {
  current: 'pomodoro',
  loop: 0
};

const stats = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIC_UPDATE':
      return { ...state, current: action.current, loop: action.loop };
    case 'START_LOOP':
      return state;
    case 'STOP_LOOP':
      return state;
    case 'SKIP_PAUSE':
      return state;
    case 'TAKE_BREAK':
      return state;
    case 'DONT_COUNT':
      return state;
    // case 'LOGIC_UPDATE'
    default:
      return state;
  }
};

export default stats;
