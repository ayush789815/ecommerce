import { useEffect, useState } from 'react';

export default function Timer({ initialTime = { hours: 24, minutes: 0, seconds: 0 } }) {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTime(prevTime => {
        const { hours, minutes, seconds } = prevTime;

        if (hours === 0 && minutes === 0 && seconds === 0) {
          return initialTime;
        }

        let newSeconds = seconds - 1;
        let newMinutes = minutes;
        let newHours = hours;

        if (newSeconds < 0) {
          newSeconds = 59;
          newMinutes -= 1;
        }

        if (newMinutes < 0) {
          newMinutes = 59;
          newHours -= 1;
        }

        return { hours: newHours, minutes: newMinutes, seconds: newSeconds };
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [initialTime]);

  return (
    <div className="flex gap-4">
      {Object.entries(time).map(([unit, value]) => (
        <div key={unit} className="text-center">
          <span className="block text-2xl font-bold">{value}</span>
          <label className="text-sm capitalize">{unit}</label>
        </div>
      ))}
    </div>
  );
}