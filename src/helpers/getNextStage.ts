import { ISettings } from '../reducers/timerReducer';

export const getNextStage = (stage: string): keyof ISettings => {
	if (stage === 'pomodoro') {
		return 'pause';
	} else {
		return 'pomodoro'
	}
}