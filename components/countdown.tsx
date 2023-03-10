import React, { useEffect, useState } from 'react';
import { getNextPayday } from '../scripts/payday';

function Countdown() {
  const [days, setDays] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const now = new Date().getTime();
      const nextPayday = (await getNextPayday()).getTime();
      const distance = nextPayday - now;
      setDays(Math.floor(distance / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
      setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
      setSeconds(Math.floor((distance % (1000 * 60)) / 1000));
      setLoading(false);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const padZero = (value: number) => value < 10 ? `0${value}` : value.toString();

  if (loading) {
    return (
      <div className="bg-gradient-to-b from-black to-gray-900 h-screen flex justify-center items-center">
        <div className="text-white text-5xl font-bold">Lade...</div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-gradient-to-b from-black to-gray-900 h-screen flex flex-col justify-center items-center">
        <div className="text-white text-5xl sm:text-7xl lg:text-8xl font-bold mb-8">
          <div>Wann Gehalt?</div>
        </div>
          <div className="flex flex-col sm:flex-row text-white text-5xl sm:text-7xl lg:text-8xl font-bold">
            <div className="flex flex-col items-center sm:mr-12">
              <div className="text-3xl">Tage</div>
              <div className="text-6xl shadow-xl shadow-slate-900 text-pink-500">{padZero(days)}</div>
            </div>
            <div className="flex flex-col items-center sm:mr-12">
              <div className="text-3xl">Stunden</div>
              <div className="text-6xl shadow-xl shadow-slate-900 text-pink-600">{padZero(hours)}</div>
            </div>
            <div className="flex flex-col items-center sm:mr-12">
              <div className="text-3xl">Minuten</div>
              <div className="text-6xl shadow-xl shadow-slate-900 text-pink-700">{padZero(minutes)}</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl">Sekunden</div>
              <div className="text-6xl shadow-xl shadow-slate-900 text-pink-800">{padZero(seconds)}</div>
            </div>
          </div>
      </div>
</>
  );
}

export default Countdown;
