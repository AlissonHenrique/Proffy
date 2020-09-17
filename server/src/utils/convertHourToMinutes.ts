// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function convertHourToMinutes(time: string) {
  const [hour, minutes] = time.split(':').map(Number);
  const timeInMinutes = (hour * 60) + minutes;

  return timeInMinutes;
}
