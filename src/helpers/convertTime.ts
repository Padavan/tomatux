function zeroPad(n: number): string {
  return n > 9 ? `${n}` : `0${n}`;
}

function convertTime(seconds: number): string {
  return `${zeroPad(Math.floor(seconds / 60))}:${zeroPad(seconds % 60)}`;
}

function getParts(sec: number): [string, string] {
  const seconds = zeroPad(sec % 60);
  const minutes = zeroPad(Math.floor(sec / 60));
  return [minutes, seconds];
}

export { convertTime, getParts };
