import { AnyAction } from 'redux';

const stats = (state = {}, action: AnyAction) => {
  switch (action.type) {
    case 'STATS_CHANGE':
      return { ...state, ...action.option };
    default:
      return state;
  }
};

export default stats;
