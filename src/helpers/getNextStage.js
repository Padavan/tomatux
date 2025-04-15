/***
 * @param {"pomodoro" | "pause"} stage
 * @returns {"pomodoro" | "pause"}
 **/
function getNextStage(stage) {
	if (stage === 'pomodoro') {
		return 'pause';
	} else {
		return 'pomodoro'
	}
}

export { getNextStage };