export function timeClock(time: number) {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
    2,
    '0'
  )}`;
}
