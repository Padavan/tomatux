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

export {convertTime}