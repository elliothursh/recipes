export function formatTime(time: number) {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;

  return hours
    ? `${hours}:${minutes.toString().padStart(2, "0")} hr`
    : `${minutes} min`;
}
