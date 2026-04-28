import { useState, useEffect, useRef } from 'react';
// import Spline from '@splinetool/react-spline';
// import Header from '../components/Header';

const StudyTimer = () => {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [editing, setEditing] = useState(false);
  const [inputVal, setInputVal] = useState('00:00:00');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds(s => {
          if (s <= 1) {
            setRunning(false);
            return 0;
          }
          return s - 1;
        });
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

  const parseInput = (val: string) => {
    const parts = val.split(':').map(p => parseInt(p) || 0);
    if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
    if (parts.length === 2) return parts[0] * 60 + parts[1];
    return parts[0];
  };

  const handleDisplayClick = () => {
    if (!running) {
      setInputVal(format(seconds));
      setEditing(true);
    }
  };

  const handleInputBlur = () => {
    const total = parseInput(inputVal);
    setSeconds(total);
    setEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const total = parseInput(inputVal);
      setSeconds(total);
      setEditing(false);
      setRunning(true);
    }
    if (e.key === 'Escape') {
      setEditing(false);
      setInputVal(format(seconds));
    }
  };

  const reset = () => {
    setRunning(false);
    setSeconds(0);
    setEditing(false);
    setInputVal('00:00:00');
  };

  return (
    <div>
      <h1>Study Timer</h1>

      {editing ? (
        <input
          autoFocus
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          placeholder="HH:MM:SS"
          style={{
            fontSize: 'inherit',
            textAlign: 'center',
            width: '160px',
            border: 'none',
            outline: 'none',
            background: 'transparent',
          }}
        />
      ) : (
        <p
          onClick={handleDisplayClick}
          style={{ cursor: running ? 'default' : 'pointer' }}
          title={running ? '' : 'Click to edit'}
        >
          {format(seconds)}
        </p>
      )}

      <div className="nav-styles-outside">
        <div className="nav-styles-small">
          <button className="timer-button" onClick={() => setRunning(r => !r)} disabled={seconds === 0}>
            {running ? 'Pause' : 'Start'}
          </button>
          <button className="timer-button" onClick={reset}>Reset</button>
        </div>
      </div>
      <img src="/cloud_bg.png"></img>
    </div>
  );
};

export default StudyTimer;