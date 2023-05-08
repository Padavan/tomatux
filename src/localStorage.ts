import { ISettings } from "./reducers/timerReducer";

type SavedData = {
  settings: ISettings,
  statistic: any,
}

export const loadState = ():SavedData | null => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return null;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return null;
  }
};

export const saveState = (state: Record<string, unknown>):boolean => {
  let status = false;
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
    status = true;
  } catch (err) {
    // Ignore errors
    console.log('localStorage error', err);
    status = false;
  }
  return status;
};
