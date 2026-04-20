import { useState, useEffect, useRef } from 'react';
// import Spline from '@splinetool/react-spline';
// import Header from '../components/Header';

const StudyTimer = () => {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  const format = (s: number) => {
    const h = Math.floor(s / 3600).toString().padStart(2, '0');
    const m = Math.floor((s % 3600) / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${h}:${m}:${sec}`;
  };

  const reset = () => {
    setRunning(false);
    setSeconds(0);
  };

  return (
    <div>
      <h1>Study Timer</h1>
      <p>{format(seconds)}</p>
      <div className="nav-styles-outside">
        <div className="nav-styles-small">
          <button className="timer-button" onClick={() => setRunning(r => !r)}>
            {running ? 'Pause' : 'Start'}
          </button>
          <button className="timer-button" onClick={reset}>Reset</button>
        </div>
      </div>
      <img src="/cloud_bg.png"></img>

      {/* <Spline scene="https://prod.spline.design/o2idomsebRoB74Rv/scene.splinecode" /> */}
    </div>
  );
};

export default StudyTimer;