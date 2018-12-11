const initialState = {
  time: 3,
  running: false,
};

const timer = (state = initialState, action) => {
  switch (action.type) {
    case 'TIMER_START':
      return { ...state, running: true };
    case 'TIMER_TICK':
      return { ...state, time: state.time - 1 };
    case 'TIMER_STOP':
      return { ...state, running: false };
    case 'TIMER_SET':
      return { ...state, time: action.time };
    default:
      return state;
  }
};

export default timer;
