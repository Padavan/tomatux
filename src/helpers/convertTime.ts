const zeroPad = (n: number) => (
  (n > 9) ? `${n}` : `0${n}`
);

export const convertTime = (seconds: number): string => {
	return `${zeroPad(Math.floor(seconds / 60))}:${zeroPad(seconds % 60)}`
}

export const getParts = (sec: number): [string, string] => {
	const seconds = zeroPad(sec  % 60);
	const minutes = zeroPad(Math.floor(sec / 60));
	return [minutes, seconds];

}