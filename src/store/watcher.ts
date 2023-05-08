import { Store } from 'redux';
import { intervalId } from '../actions';
import { sendNotification, showThenHideSnackbar } from '../helpers/notification';
import { RootState } from '../store';
import finish from '../assets/bell.wav';

const audio = new Audio(finish);

const makeSound = () => {
	audio.play();
}

export const watcher = (store: Store<RootState>) => {
	// console.log('subscribe time: ', store.getState().timer.time);
	const currentState = store.getState();
	if (currentState.timer.time <= 0 && currentState.timer.running) {
		clearInterval(intervalId);
		store.dispatch({ type: 'TIME_OUT'})
		sendNotification('Timer is out');
		console.log('audio.play');
		
		makeSound();
		showThenHideSnackbar('Timer is out', store.dispatch);
	}
}