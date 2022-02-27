const putO = (n: number) => (
  (n > 9) ? `${n}` : `0${n}`
);

export const convertTime = (seconds: number): string => {
	return `${putO(Math.floor(seconds / 60))}:${putO(seconds % 60)}`
}