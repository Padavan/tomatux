const stats = (state = {}, action) => {
  switch (action.type) {
    case 'STATS_CHANGE':
      return { ...state, ...action.option };
    default:
      return state;
  }
};

export default stats;
