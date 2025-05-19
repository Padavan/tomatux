/***
 * @param {number} n
 * @returns {string} 
 **/
function zeroPad(n) {
  return (n > 9) ? `${n}` : `0${n}`
};

/***
 * @param {number} seconds
 * @returns {string} 
 **/
function convertTime(seconds) {
	return `${zeroPad(Math.floor(seconds / 60))}:${zeroPad(seconds % 60)}`
}


/***
 * @param {number} sec
 * @returns {[string, string]}
 **/
function getParts(sec) {
	const seconds = zeroPad(sec  % 60);
	const minutes = zeroPad(Math.floor(sec / 60));
	return [minutes, seconds];
}


export {convertTime, getParts}